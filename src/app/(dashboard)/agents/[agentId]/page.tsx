import { ErrorBoundary } from 'react-error-boundary';
import { getQueryClient,trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import {  AgentIdView, AgentIdViewError, AgentIdViewLoading } from '@/modules/agents/ui/views/agent-id-view';
interface Props{
   params : Promise<{agentId : string}>
}

const Page = async ({params}:Props) => {
  const {agentId} = await params;

  const queryCleint=getQueryClient();
  void queryCleint.prefetchQuery(trpc.agents.getOne.queryOptions({id:agentId}));
  return (
    <HydrationBoundary state={dehydrate(queryCleint)}>
          <Suspense fallback={<AgentIdViewLoading/>}>
              <ErrorBoundary fallback={<AgentIdViewError/>}>
                 <AgentIdView agentId={agentId}/>
              </ErrorBoundary>
          </Suspense>
    </HydrationBoundary>
  )
}
export default Page;