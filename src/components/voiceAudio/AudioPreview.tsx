
import { Play, Pause, SkipBack, SkipForward, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Voice } from "@/types/voice";

interface AudioPreviewProps {
  isPlaying: boolean;
  selectedVoice: string;
  voices: Voice[];
  togglePlayback: () => void;
}

const AudioPreview = ({ isPlaying, selectedVoice, voices, togglePlayback }: AudioPreviewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-center p-4">
        <div className="w-32 h-32 rounded-full bg-brand-purple/10 flex items-center justify-center">
          {selectedVoice && (
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-purple">
                {voices.find(v => v.id === selectedVoice)?.name.charAt(0) || "S"}
              </div>
              <div className="text-sm text-brand-purple/70">
                {voices.find(v => v.id === selectedVoice)?.name || "Sarah"}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-muted h-12 rounded-md flex items-center justify-center">
        <div className="w-3/4 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-brand-purple to-brand-blue-light rounded-full"
            style={{ width: isPlaying ? "45%" : "0%" }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <SkipBack className="h-4 w-4" />
        </Button>
        
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={togglePlayback}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </Button>
        
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="add-background">Add background music</Label>
          <Switch id="add-background" />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="download-audio">Download audio</Label>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>MP3</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioPreview;
