
import { PenTool } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t mt-12 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <div className="flex items-center gap-2 font-semibold">
          <PenTool className="h-5 w-5 text-primary" />
          <span>ContentCreatorMatic</span>
        </div>
        
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} ContentCreatorMatic. All rights reserved.
        </p>
        
        <div className="flex gap-4">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
