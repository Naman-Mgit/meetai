import { ScrollArea,ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent,TabsList,TabsTrigger} from "@/components/ui/tabs"
import { MeetingGetOne } from "../../types"
import { BookOpenTextIcon, FileTextIcon, FileVideoIcon, SparklesIcon } from "lucide-react"
interface Props{
     data:MeetingGetOne
}
export const CompletedState=({data}:Props)=>{
      return (
         <div className="flex flex-col gap-y-4">
             <Tabs defaultValue="summary">
                  <div className="bg-white rounded-lg border px-3">
                      <ScrollArea>

                           <TabsList className="p-0 bg-background justify-start rounded-none h-12">
                                <TabsTrigger value="summary"
                                 className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                                >
                                    <BookOpenTextIcon/>
                                     Summary
                                </TabsTrigger>
                                <TabsTrigger value="transcript"
                                 className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                                >
                                    <FileTextIcon/>
                                     Transcript
                                </TabsTrigger>
                                <TabsTrigger value="recording"
                                 className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                                >
                                    <FileVideoIcon/>
                                     Recording
                                </TabsTrigger>
                                <TabsTrigger value="chat"
                                 className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                                >
                                    <SparklesIcon/>
                                     Ask AI
                                </TabsTrigger>
                           </TabsList>
                          <ScrollBar orientation="horizontal"/>
                              
                     </ScrollArea>
                  </div>
                  
                  <TabsContent value="recording">
                        <div className="bg-white rounded-lg borde px-4 py-5">
                           <video
                             src={data.recordingUrl!}
                             className="w-full rounded-lg"
                             controls
                           />
                        </div>
                  </TabsContent>
                 
             </Tabs>
            
         </div>
      )
}
//Todo add Summary transcript and integrate chat bot