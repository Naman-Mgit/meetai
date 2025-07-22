"use client"
import EmptyState from "@/components/empty-state"
import { Button } from "@/components/ui/button"

import { VideoIcon} from "lucide-react"
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation"

interface Props {
    meetingId: string;
   
    
}

export const UpcomingState= ({
      meetingId,
}:Props)=>{
    const router=useRouter();
    const  [RemoveConfirmation,confirmRemove]=useConfirm("Our AI agent is currently on a long vacation --aka our openAI key is expired (because we're broke 💸). So the agent won't respond,and this meeting will forever be stuck in processing state","Wanna join anyway and vibe in silence ? 😅")
    const handleStartMeeting= async () => {
         const ok = await confirmRemove();
         if(!ok) return;
          
         router.push(`/call/${meetingId}`);
    }
    return(
        <>
            <RemoveConfirmation/>
            <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
                <EmptyState
                    image="/upcoming.svg"
                    title="Not started yet"
                    description="Once you start this meeting , a summary will appear here"
                />
                <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">

                    
                    <Button  asChild className="w-full lg:w-auto" onClick={handleStartMeeting}>
                
                         <span className="flex items-center gap-2">
                                <VideoIcon />
                                Start meeting
                         </span>     
                        
                    </Button>
                    
                </div>
            </div>
        
        </>
    )
}