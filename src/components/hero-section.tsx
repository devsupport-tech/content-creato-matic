
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="py-12 md:py-16 lg:py-20 text-center">
      <div className="space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm bg-accent/30 mb-4">
          <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
          <span>AI-powered content creation made simple</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient">
          Create Amazing Content in Seconds
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your ideas into engaging content with our AI-powered tool. 
          Perfect for blog posts, social media, emails, and more.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Button size="lg" className="gap-2">
            Start Creating Now
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
