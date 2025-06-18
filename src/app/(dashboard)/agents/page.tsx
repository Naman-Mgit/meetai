import { getQueryClient,trpc } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary';
import AgentsView, { AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const Page = () => {
  const queryClient= getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading/>}>
        <ErrorBoundary fallback={<AgentsViewError/>}>
           <AgentsView/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page