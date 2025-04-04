
import { useState } from "react";
import { Mic, Volume2, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Voice } from "@/types/voice";

interface TextToSpeechFormProps {
  voices: Voice[];
  onGenerateVoice: () => void;
}

const TextToSpeechForm = ({ voices, onGenerateVoice }: TextToSpeechFormProps) => {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("female1");
  const [volume, setVolume] = useState([80]);
  const [speed, setSpeed] = useState([100]);
  const { toast } = useToast();
  
  const handleGenerateVoice = () => {
    if (!text.trim()) {
      toast({
        title: "Empty text",
        description: "Please enter some text to generate speech.",
        variant: "destructive"
      });
      return;
    }
    
    onGenerateVoice();
  };
  
  return (
    <div className="space-y-4">
      <div className="form-control">
        <Label htmlFor="voice-text">Text</Label>
        <Textarea 
          id="voice-text" 
          placeholder="Enter the text you want to convert to speech..." 
          className="min-h-32"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      
      <div className="form-control">
        <Label htmlFor="voice-select">Voice</Label>
        <Select value={selectedVoice} onValueChange={setSelectedVoice}>
          <SelectTrigger id="voice-select">
            <SelectValue placeholder="Select a voice" />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice.id} value={voice.id}>
                {voice.name} ({voice.gender}, {voice.accent})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="form-control">
        <Label htmlFor="volume-slider" className="mb-2">Volume</Label>
        <div className="flex items-center gap-4">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            id="volume-slider"
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-sm w-8 text-right">{volume}%</span>
        </div>
      </div>
      
      <div className="form-control">
        <Label htmlFor="speed-slider" className="mb-2">Speed</Label>
        <div className="flex items-center gap-4">
          <Waves className="h-4 w-4 text-muted-foreground" />
          <Slider
            id="speed-slider"
            value={speed}
            onValueChange={setSpeed}
            min={50}
            max={200}
            step={5}
            className="flex-1"
          />
          <span className="text-sm w-8 text-right">{speed}%</span>
        </div>
      </div>
      
      <Button 
        onClick={handleGenerateVoice} 
        className="w-full"
        disabled={!text.trim()}
      >
        <Mic className="mr-2 h-4 w-4" />
        Generate Voice
      </Button>
    </div>
  );
};

export default TextToSpeechForm;
