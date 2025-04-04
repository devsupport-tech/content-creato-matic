
import { useState, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy, Download, ThumbsUp, ThumbsDown } from "lucide-react";

interface ContentDisplayProps {
  content: string;
}

const ContentDisplay = ({ content }: ContentDisplayProps) => {
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const [feedback, setFeedback] = useState<"liked" | "disliked" | null>(null);

  if (!content) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Content successfully copied to your clipboard",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-content.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Content saved as a text file",
    });
  };

  const handleFeedback = (type: "liked" | "disliked") => {
    setFeedback(type);
    toast({
      title: "Thank you for your feedback!",
      description: type === "liked" 
        ? "We're glad you liked the content." 
        : "We'll use your feedback to improve our generation.",
    });
  };

  return (
    <Card className="mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle>Generated Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={contentRef}
          className="whitespace-pre-wrap bg-muted/50 p-4 rounded-md max-h-[500px] overflow-y-auto"
        >
          {content}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFeedback("liked")}
            disabled={feedback === "liked"}
            className={feedback === "liked" ? "bg-green-50 text-green-600" : ""}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Like
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleFeedback("disliked")}
            disabled={feedback === "disliked"}
            className={feedback === "disliked" ? "bg-red-50 text-red-600" : ""}
          >
            <ThumbsDown className="mr-2 h-4 w-4" />
            Dislike
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentDisplay;
