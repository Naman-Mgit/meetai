"use client"

import { Button } from '@/components/ui/button';
import { Calculator, GraduationCap, Stethoscope, Languages, Plus} from 'lucide-react';
import { useRouter } from 'next/navigation';

const FeaturedAgents = () => {
  const router=useRouter()
  const agents = [
    {
      id: 1,
      name: 'Math Consultant',
      description: 'Expert in mathematics, calculus, algebra, and problem-solving. Schedule a meeting for tutoring.',
      icon: Calculator,
      tag: 'Education',
      color: 'from-blue-500/10 to-blue-600/10',
    },
    {
      id: 2,
      name: 'Study Buddy',
      description: 'Personalized learning assistant for any subject. Book a study session today.',
      icon: GraduationCap,
      tag: 'Learning',
      color: 'from-green-500/10 to-green-600/10',
    },
    {
      id: 3,
      name: 'Health Advisor',
      description: 'Wellness consultant for health tips and guidance. Meet for personalized advice.',
      icon: Stethoscope,
      tag: 'Wellness',
      color: 'from-purple-500/10 to-purple-600/10',
    },
    {
      id: 4,
      name: 'Language Tutor',
      description: 'Practice conversations and learn new languages. Schedule your language meeting.',
      icon: Languages,
      tag: 'Languages',
      color: 'from-orange-500/10 to-orange-600/10',
    },
  ];

  return (
    <section id="agents" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Create Your{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text ">
              AI Agents
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build custom AI agents for any purpose and schedule meetings to get personalized assistance.
          </p>
        </div>

        {/* Agents grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {agents.map((agent) => {
            const IconComponent = agent.icon;
            return (
              <div key={agent.id} className="agent-card group cursor-pointer">
                {/* Agent image */}
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-primary" />
                  </div>
                  {/* Tag */}
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                    {agent.tag}
                  </span>
                </div>

                {/* Agent info */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <IconComponent className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">{agent.name}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {agent.description}
                  </p>
               
                </div>
              </div>
            );
          })}
        </div>
        {/* CTA section */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Need a different specialist? Create your own custom AI agent in minutes.
          </p>
          <Button className="hero-button" onClick={()=>router.push("/agents")}>
            <Plus className="mr-2 h-5 w-5" />
            Create Custom Agent
          </Button>
        </div>
       
      </div>
    </section>
  );
};

export default FeaturedAgents;
