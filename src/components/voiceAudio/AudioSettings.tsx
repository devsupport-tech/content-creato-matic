
import { Music, Mic, ListMusic, Download, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const AudioSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="form-control">
          <Label className="mb-2">Music Volume</Label>
          <div className="flex items-center gap-4">
            <Music className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[70]}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm w-8 text-right">70%</span>
          </div>
        </div>
        
        <div className="form-control">
          <Label className="mb-2">Voice Volume</Label>
          <div className="flex items-center gap-4">
            <Mic className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[100]}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm w-8 text-right">100%</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="form-control">
          <Label htmlFor="fade-in">Fade In</Label>
          <Select defaultValue="2">
            <SelectTrigger id="fade-in">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">None</SelectItem>
              <SelectItem value="1">1 second</SelectItem>
              <SelectItem value="2">2 seconds</SelectItem>
              <SelectItem value="3">3 seconds</SelectItem>
              <SelectItem value="5">5 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="form-control">
          <Label htmlFor="fade-out">Fade Out</Label>
          <Select defaultValue="3">
            <SelectTrigger id="fade-out">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">None</SelectItem>
              <SelectItem value="1">1 second</SelectItem>
              <SelectItem value="2">2 seconds</SelectItem>
              <SelectItem value="3">3 seconds</SelectItem>
              <SelectItem value="5">5 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button variant="default" className="w-full">
        <Sliders className="mr-2 h-4 w-4" />
        Apply Settings
      </Button>
      
      <Separator />
      
      <div className="space-y-2">
        <Label>Quick Actions</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Download Mix</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ListMusic className="h-4 w-4" />
            <span>My Mixes</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioSettings;
