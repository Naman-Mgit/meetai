export const runtime = "nodejs";
import {and,eq,not} from "drizzle-orm";
import { NextRequest,NextResponse } from "next/server";

import { 
    CallEndedEvent,CallTranscriptionReadyEvent,
      CallSessionParticipantLeftEvent,
      CallRecordingReadyEvent,
      CallSessionStartedEvent
 } from "@stream-io/node-sdk";

import { db } from "@/db";
import { agents,meetings } from "@/db/schema";

import {streamVideo} from "@/lib/stream-video";
import { error } from "console";
import { inngest } from "@/inngest/client";


function verifySignatureWithSDK(body:string ,signature:string):boolean {
     return streamVideo.verifyWebhook(body,signature)
};

export async function POST(req : NextRequest){
    

   
    const signature = req.headers.get("x-signature");
    const apiKey= req.headers.get("x-api-key");

    if(!signature || !apiKey){
        return NextResponse.json(
            {error:"Missing signature or API key"},
            {status: 400}
        )
    }

    const body= await req.text();
    
    if(!verifySignatureWithSDK(body,signature)){
        
        return NextResponse.json({error:"Invalid Signature"},{status:401});
    }

    let payload: unknown;
    try {
        payload=JSON.parse(body) as Record<string,unknown>;
    } catch {
         
         return NextResponse.json({error : "Invalid JSON"},{status:400})
    }
    const eventType= (payload as Record<string,unknown>)?.type;
    console.log("🧩 Event Type:", eventType);
    if(eventType === "call.session_started"){
        const event= payload as CallSessionStartedEvent;
        const meetingId= event.call.custom?.meetingId;
        console.log("🔍 Meeting ID from webhook:", meetingId);
        if(!meetingId){
            return NextResponse.json({error:"Missing meetingId"},{status:400})
        }

        const [existingMeeting] = await db
             .select()
             .from(meetings)
             .where(and(
                eq(meetings.id,meetingId),
                not(eq(meetings.status,"completed")),
                not(eq(meetings.status,"active")),
                not(eq(meetings.status,"cancelled")),
                not(eq(meetings.status,"processing"))
             ));

        if(!existingMeeting){
            return NextResponse.json({error:"Meeting not found"},{status:404});
        }
        console.log("🔍 Existing Meeting ID from webhook:", existingMeeting.id);
        await db
          .update(meetings)
          .set({
              status:"active",
              startedAt: new Date()
          })
          .where(eq(meetings.id,existingMeeting.id))

        const [existingAgent]= await db
           .select()
           .from(agents)
           .where(eq(agents.id,existingMeeting.agentId));

        if(!existingAgent){
            return NextResponse.json({error:"Agent not found"},{status:404})
        }
        console.log("🔍 Existing Agent ID from webhook:", existingAgent.id);
        
        
        const call=streamVideo.video.call("default",meetingId);
        //TODO  ADD A AI WHICH IS FREE TO USE SO AGENT CAN RESPOND
        const realtimeClient=await streamVideo.video.connectOpenAi({
            call,
            openAiApiKey:process.env.OPENAI_API_KEY!,
            agentUserId:existingAgent.id
        })
        console.log("🤖 Connected to OpenAI agent:", existingAgent.id);
        console.log("📋 Agent Instructions:", existingAgent.instructions);
        realtimeClient.updateSession({
            instructions:existingAgent.instructions
        })
    }else if(eventType === "call.session_participant_left"){
        const event = payload as CallSessionParticipantLeftEvent;
        const meetingId=event.call_cid.split(":")[1];
        console.log("🔍 Participant left, meeting ID:", meetingId);
        if(!meetingId){
            return NextResponse.json({error:"Missing meetingId"},{status:400})
        }
        const call=streamVideo.video.call("default",meetingId); 
        await call.end();
    }else if(eventType === "call.session_ended"){
        const event= payload as CallEndedEvent;
        const meetingId=event.call.custom?.meetingId;

        if(!meetingId){
            return NextResponse.json({error:"Missing meetingId"},{status:400})
        }

        await db
          .update(meetings)
          .set({
             status:"processing",
             endedAt: new Date()
          })
          .where(and(eq(meetings.id,meetingId),eq(meetings.status,"active")));

    }else if(eventType === "call.transcription_ready"){
         const event = payload as CallTranscriptionReadyEvent
         const meetingId=event.call_cid.split(":")[1];

         const [updatedMeeting]=await db
             .update(meetings)
             .set({
                transcriptUrl:event.call_transcription.url
             })
             .where(eq(meetings.id,meetingId))
             .returning()
        
        if(!updatedMeeting){
            return NextResponse.json({error:"Meeting not found"},{status:404})
        }
        await inngest.send({
            name:"meetings/processing",
            data:{
                meetingId:updatedMeeting.id,
                transcriptUrl:updatedMeeting.transcriptUrl
            }
        })

    }else if(eventType === "call.recording_ready"){
         const event = payload as CallRecordingReadyEvent

         const meetingId=event.call_cid.split(":")[1];

         await db
             .update(meetings)
             .set({
                recordingUrl:event.call_recording.url
             })
             .where(eq(meetings.id,meetingId))
           
    }

    return NextResponse.json({status:"ok"})
}