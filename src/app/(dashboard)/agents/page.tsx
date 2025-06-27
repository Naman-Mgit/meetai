import { getQueryClient,trpc } from '@/trpc/server'
import { ErrorBoundary } from 'react-error-boundary';
import AgentsView, { AgentsViewError, AgentsViewLoading } from '@/modules/agents/ui/views/agents-view'
import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import AgentsListHeader from '@/modules/agents/ui/components/agent-ListHeader';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { loadSearchParams } from '@/modules/agents/params';
import type { SearchParams } from 'nuqs';

interface Props {
    searchParams:Promise<SearchParams>
}
const Page = async ({searchParams}: Props) => {

  const session = await auth.api.getSession({
        headers: await headers(),
  })
  if(!session){
    redirect("/signin");
  }
  const filters= await loadSearchParams(searchParams)
  const queryClient= getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
     ...filters
  }));
   

  return (
    <>
      <AgentsListHeader/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoading/>}>
          <ErrorBoundary fallback={<AgentsViewError/>}>
            <AgentsView/>
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default Page