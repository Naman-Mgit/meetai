"use client"
import { Play, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const MainSection = () => {
  const router=useRouter()
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/30 overflow-hidden">
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
         
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
           
            <span className="text-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text ">
              Talk to AI.
            </span>
          </h1>

          
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of meetings with AI-powered agents that understand, assist, and enhance your conversations.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button className="hero-button group"  onClick={()=>router.push("/meetings")}>
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Meeting
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="hero-button-outline" onClick={()=>router.push("/agents")}>
              Your AI Agents
            </Button>
          </div>

        
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Trusted by 50,000+ teams</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>24/7 AI availability</span>
            </div>
          </div>
        </div>
      </div>

   
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
