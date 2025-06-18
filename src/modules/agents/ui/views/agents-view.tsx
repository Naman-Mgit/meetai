"use client"
import React from 'react'
import {useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import LoadingState from '@/components/loading-state'
import ErrorState from '@/components/Error-state'

import { Button } from '@/components/ui/button'
const AgentsView = () => {
  const trpc=useTRPC();
  const { data} = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  
  
  return (
    <div>
        
        {JSON.stringify(data,null,2)}
    </div>
  )
}
export const AgentsViewLoading=()=>{
    return(
       <LoadingState title="Loading Agents" description="This may take a few seconds"/>
    )
}
export const AgentsViewError=()=>{
    return(
        <ErrorState title="Error Loading Agents" description="Please try again later" />
    )
}

export default AgentsView