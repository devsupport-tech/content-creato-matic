
import { PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2 font-bold">
          <PenTool className="h-6 w-6 text-primary" />
          <span className="text-xl">ContentCreatorMatic</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Button variant="ghost" size="sm">Features</Button>
            <Button variant="ghost" size="sm">Pricing</Button>
            <Button variant="ghost" size="sm">Help</Button>
            <Button variant="default" size="sm">Get Started</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
