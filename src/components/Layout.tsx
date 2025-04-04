
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  PenSquare,
  Image,
  Speaker,
  BarChart,
  Settings,
  LogOut
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-sidebar p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand-purple text-white flex items-center justify-center mr-3">
            <PenSquare size={18} />
          </div>
          <h1 className="text-xl font-bold text-foreground">ContentCreato</h1>
        </div>
        
        <nav className="space-y-1 flex-1">
          <NavLink to="/" className={({isActive}) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          
          <NavLink to="/create" className={({isActive}) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
            <PenSquare className="w-5 h-5 mr-3" />
            Create Content
          </NavLink>
          
          <NavLink to="/media" className={({isActive}) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
            <Image className="w-5 h-5 mr-3" />
            Media Library
          </NavLink>
          
          <NavLink to="/voiceovers" className={({isActive}) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
            <Speaker className="w-5 h-5 mr-3" />
            Voice & Audio
          </NavLink>
          
          <NavLink to="/analytics" className={({isActive}) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
            <BarChart className="w-5 h-5 mr-3" />
            Analytics
          </NavLink>
        </nav>
        
        <div className="pt-6 mt-6 border-t border-sidebar-border">
          <NavLink to="/settings" className={({isActive}) => `flex items-center p-2 rounded-md ${isActive ? 'bg-primary/10 text-primary' : 'text-sidebar-foreground hover:bg-sidebar-accent'}`}>
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </NavLink>
          
          <Button variant="ghost" className="w-full justify-start text-muted-foreground p-2 mt-2">
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
