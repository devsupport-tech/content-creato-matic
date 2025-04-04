
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import ContentTypeCard from "@/components/ui/content-type-card";
import { FileText, MessageSquare, ScrollText, PenTool } from "lucide-react";

type ContentType = "blog" | "social" | "email" | "custom";

interface ContentGeneratorFormProps {
  onGenerate: (content: string) => void;
}

const ContentGeneratorForm = ({ onGenerate }: ContentGeneratorFormProps) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [contentType, setContentType] = useState<ContentType>("blog");
  const [customInstructions, setCustomInstructions] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic) {
      toast({
        title: "Missing information",
        description: "Please enter a topic for your content",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // In a real app, this would be an API call to an AI service
    setTimeout(() => {
      // Simulate content generation
      let generatedContent = "";
      
      switch (contentType) {
        case "blog":
          generatedContent = `# ${topic}\n\n## Introduction\nWelcome to this comprehensive guide about ${topic}. This blog post will explore everything you need to know about this fascinating subject.\n\n## Key Points\n- ${topic} is an important area of interest in today's world\n- Understanding ${topic} can help you improve your skills\n- Many experts consider ${topic} to be revolutionary\n\n## Conclusion\nAs we've seen, ${topic} offers numerous benefits and opportunities. Keep exploring this subject to deepen your knowledge.`;
          break;
        case "social":
          generatedContent = `📣 Check out our latest insights on ${topic}! \n\nDid you know that understanding ${topic} can transform your approach? \n\n${keywords ? `#${keywords.split(",").join(" #")}` : `#content #social #trending`}`;
          break;
        case "email":
          generatedContent = `Subject: Important Information About ${topic}\n\nDear Valued Customer,\n\nI hope this email finds you well. I wanted to share some exciting news about ${topic} that I believe will be of interest to you.\n\n${topic} has been showing remarkable growth recently, and many of our clients have benefited from incorporating it into their strategies.\n\nWould you be interested in learning more? I'm available for a call this week to discuss how ${topic} could benefit you specifically.\n\nBest regards,\nYour Name`;
          break;
        case "custom":
          generatedContent = `Custom content for "${topic}" following these instructions: ${customInstructions}\n\nThis is where your personalized content would appear, tailored exactly to your specifications and requirements.`;
          break;
      }
      
      setLoading(false);
      onGenerate(generatedContent);
      
      toast({
        title: "Content generated!",
        description: "Your content has been successfully created.",
      });
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ContentTypeCard
          icon={<FileText />}
          title="Blog Post"
          description="Create comprehensive long-form content"
          onClick={() => setContentType("blog")}
          selected={contentType === "blog"}
        />
        <ContentTypeCard
          icon={<MessageSquare />}
          title="Social Media"
          description="Short, engaging posts with hashtags"
          onClick={() => setContentType("social")}
          selected={contentType === "social"}
        />
        <ContentTypeCard
          icon={<ScrollText />}
          title="Email"
          description="Professional email templates"
          onClick={() => setContentType("email")}
          selected={contentType === "email"}
        />
        <ContentTypeCard
          icon={<PenTool />}
          title="Custom"
          description="Specify your exact requirements"
          onClick={() => setContentType("custom")}
          selected={contentType === "custom"}
        />
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="topic">Topic or Title</Label>
            <Input
              id="topic"
              placeholder="Enter the main topic or title"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="keywords">Keywords (comma separated)</Label>
            <Input
              id="keywords"
              placeholder="productivity, business, technology"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {contentType === "custom" && (
            <div>
              <Label htmlFor="instructions">Custom Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Describe exactly what kind of content you want..."
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                rows={4}
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate Content"}
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default ContentGeneratorForm;
