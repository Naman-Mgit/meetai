"use client"
import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'

import { DEFAULT_PAGE } from '@/constant'
import { NewMeetingDialog } from './new-meetingDialog'
import { MeetingsSearchFilter } from './meeting-search-filter'
import { StatusFilter } from './status-filter'
import { AgentIdFilter } from './agent-id-filter'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const MeetingsListHeader = () => {
  const [filter ,setFilters]=useMeetingsFilters();
  const [isDialogOpen,setIsDialogOpen]=useState(false);

  const  isAnyFilterModified=!!filter.status || !!filter.search || !!filter.agentId

  const onClearFilters= ()=>{
      setFilters({
         status:null,
         agentId:"",
         search:"",
         page:DEFAULT_PAGE
      })
  }
  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className='py-4 px-4 md:px-8 flex flex-col gap-y-4'>
          <div className='flex items-center justify-between'>
            <h5 className='font-medium text-xl'>My Meetings</h5>
            <Button onClick={()=> setIsDialogOpen(true)}>
                <PlusIcon/>
                New Meeting
            </Button>
          </div>
          <ScrollArea>
            <div className='flex items-center gap-x-2 p-1'>
                <MeetingsSearchFilter/>
                <StatusFilter/>
                <AgentIdFilter/>
                {
                  isAnyFilterModified && (
                    <Button variant="outline" onClick={onClearFilters}>
                      <XCircleIcon className='size-4'/>
                      Clear
                    </Button>
                  )
                }
            </div>
           <ScrollBar orientation='horizontal'/>
          </ScrollArea>
      </div>
   </>
  )
}

export default MeetingsListHeader