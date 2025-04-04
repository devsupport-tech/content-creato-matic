
import { useState } from "react";
import { FileAudio, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Track } from "@/types/track";

interface MusicLibraryProps {
  musicTracks: Track[];
  onMusicSelect: (id: string) => void;
  selectedMusic: string;
}

const MusicLibrary = ({ musicTracks, onMusicSelect, selectedMusic }: MusicLibraryProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Search tracks..." 
            className="w-56"
          />
          <Button variant="outline" size="icon">
            <FileAudio className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center px-2 py-1 bg-muted rounded text-sm font-medium">
        <span className="w-12 text-center">#</span>
        <span className="flex-1">Name</span>
        <span className="w-24">Duration</span>
        <span className="w-24">Category</span>
        <span className="w-16"></span>
      </div>
      
      {musicTracks.map((track, index) => (
        <div 
          key={track.id} 
          className={`flex items-center px-2 py-2 hover:bg-muted/50 rounded cursor-pointer ${selectedMusic === track.id ? 'bg-primary/10' : ''}`}
          onClick={() => onMusicSelect(track.id)}
        >
          <span className="w-12 text-center text-muted-foreground">{index + 1}</span>
          <span className="flex-1 font-medium">{track.name}</span>
          <span className="w-24 text-muted-foreground">{track.duration}</span>
          <span className="w-24">
            <div className="px-2 py-0.5 bg-muted rounded-full text-xs inline-block">{track.category}</div>
          </span>
          <span className="w-16 flex justify-end">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Play className="h-4 w-4" />
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default MusicLibrary;
