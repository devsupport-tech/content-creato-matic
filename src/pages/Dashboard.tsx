
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  BarChart3,
  ArrowUpRight,
  Plus,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState("7d");
  
  const handleCreateNew = () => {
    navigate("/create");
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, User!</h1>
          <p className="text-muted-foreground">Manage and create your social media content</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search content..." className="pl-8" />
          </div>
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" /> Create New
          </Button>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Total Posts</p>
                <p className="text-3xl font-bold">24</p>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 12%
              </span>
              <span className="text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Engagements</p>
                <p className="text-3xl font-bold">1.2k</p>
              </div>
              <div className="bg-accent/10 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-accent" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 18%
              </span>
              <span className="text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Impressions</p>
                <p className="text-3xl font-bold">8.4k</p>
              </div>
              <div className="bg-purple-500/10 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" /> 24%
              </span>
              <span className="text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm">Click-through</p>
                <p className="text-3xl font-bold">3.9%</p>
              </div>
              <div className="bg-blue-500/10 p-2 rounded-full">
                <BarChart3 className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-xs">
              <span className="text-red-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1 transform rotate-90" /> 2%
              </span>
              <span className="text-muted-foreground ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Content */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recent Content</h2>
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="platform-card">
            <div className="flex justify-between items-start mb-4">
              <div className="platform-icon network-facebook">
                <Facebook size={20} />
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="text-sm mb-4">Our latest product update brings exciting new features! Check out our blog for more details.</p>
            <div className="mt-auto pt-4 flex justify-between items-center text-xs text-muted-foreground border-t">
              <span>12 Likes</span>
              <span>3 Comments</span>
              <span>2 Shares</span>
            </div>
          </div>
          
          <div className="platform-card">
            <div className="flex justify-between items-start mb-4">
              <div className="platform-icon network-instagram">
                <Instagram size={20} />
              </div>
              <span className="text-xs text-muted-foreground">3 days ago</span>
            </div>
            <p className="text-sm mb-4">Behind the scenes at our company retreat! 📸 #TeamBuilding #CompanyCulture</p>
            <div className="mt-auto pt-4 flex justify-between items-center text-xs text-muted-foreground border-t">
              <span>45 Likes</span>
              <span>6 Comments</span>
              <span>1 Save</span>
            </div>
          </div>
          
          <div className="platform-card">
            <div className="flex justify-between items-start mb-4">
              <div className="platform-icon network-twitter">
                <Twitter size={20} />
              </div>
              <span className="text-xs text-muted-foreground">4 days ago</span>
            </div>
            <p className="text-sm mb-4">Excited to announce that we've hit 10k followers! Thanks for your support! 🎉</p>
            <div className="mt-auto pt-4 flex justify-between items-center text-xs text-muted-foreground border-t">
              <span>32 Likes</span>
              <span>8 Comments</span>
              <span>15 Retweets</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Start Templates */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Start Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-center text-center gap-3 hover:border-primary/30" 
            onClick={() => navigate("/create?template=promotion")}
          >
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
              <Facebook className="h-6 w-6 text-brand-purple" />
            </div>
            <span className="font-semibold">Promotional Post</span>
            <span className="text-xs text-muted-foreground">Create a product or service promotion</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-center text-center gap-3 hover:border-primary/30" 
            onClick={() => navigate("/create?template=announcement")}
          >
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
              <Instagram className="h-6 w-6 text-brand-blue" />
            </div>
            <span className="font-semibold">Announcement</span>
            <span className="text-xs text-muted-foreground">Share news or updates</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-center text-center gap-3 hover:border-primary/30" 
            onClick={() => navigate("/create?template=engagement")}
          >
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Twitter className="h-6 w-6 text-purple-500" />
            </div>
            <span className="font-semibold">Engagement Post</span>
            <span className="text-xs text-muted-foreground">Questions to boost interaction</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-center text-center gap-3 hover:border-primary/30" 
            onClick={() => navigate("/create?template=ad")}
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Linkedin className="h-6 w-6 text-blue-500" />
            </div>
            <span className="font-semibold">Ad Campaign</span>
            <span className="text-xs text-muted-foreground">Create targeted advertisements</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
