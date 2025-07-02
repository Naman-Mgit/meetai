import { auth } from '@/lib/auth';
import { MeetingIdView, MeetingsIdViewError, MeetingsIdViewLoading } from '@/modules/meetings/ui/views/meeitng-id-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary';
interface Props{
   params:Promise<{meetingId:string}>;
}
const Page = async ({params} : Props) => {
  const {meetingId} = await params;

  const session = await auth.api.getSession({
     headers: await headers()
  })

  if(!session){
      redirect('/signin')
  }
  const queryCleint=getQueryClient();
  void queryCleint.prefetchQuery(
     trpc.meetings.getOne.queryOptions({id:meetingId})
  )
  return (
    <HydrationBoundary state={dehydrate(queryCleint)}>
        <Suspense fallback={<MeetingsIdViewLoading/>}>
            <ErrorBoundary fallback={<MeetingsIdViewError/>}>
                <MeetingIdView meetingId={meetingId}/>
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default Page