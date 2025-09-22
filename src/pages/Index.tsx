import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Users, Shield, Zap, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Video,
      title: "HD Video Quality",
      description: "Crystal clear video calls with adaptive quality"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Connect with unlimited participants seamlessly"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption for all your meetings"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Join meetings instantly with one click"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-[hsl(250_84%_60%)] rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">MeetFlow</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-hero">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Simple & Secure
              <br />
              <span className="bg-gradient-to-r from-primary to-[hsl(250_84%_60%)] bg-clip-text text-transparent">
                Video Conferencing
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Connect with your team from anywhere. HD video, crystal clear audio, 
              and enterprise-grade security in one beautiful platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button className="btn-hero text-lg px-8 py-6 animate-glow">
                  <Play className="w-5 h-5 mr-2" />
                  Start Meeting
                </Button>
              </Link>
              
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Join Meeting
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed for modern teams and seamless collaboration
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-[hsl(250_84%_60%)] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <Card className="glass-card p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of teams already using MeetFlow for their daily meetings
            </p>
            <Link to="/signup">
              <Button className="btn-hero text-lg px-8 py-6">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;