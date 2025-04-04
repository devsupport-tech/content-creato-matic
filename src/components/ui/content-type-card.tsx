
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContentTypeCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  selected?: boolean;
}

const ContentTypeCard = ({
  icon,
  title,
  description,
  onClick,
  selected = false,
}: ContentTypeCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all hover:border-primary/50 hover:shadow-md", 
        selected && "border-primary bg-primary/5"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="text-primary text-2xl">{icon}</div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <Button 
          variant={selected ? "default" : "outline"} 
          size="sm" 
          className="w-full"
        >
          {selected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentTypeCard;
