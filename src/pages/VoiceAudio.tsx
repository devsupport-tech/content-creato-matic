
import { useState } from "react";
import { Mic, Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import TextToSpeechForm from "@/components/voiceAudio/TextToSpeechForm";
import AudioPreview from "@/components/voiceAudio/AudioPreview";
import MusicLibrary from "@/components/voiceAudio/MusicLibrary";
import AudioSettings from "@/components/voiceAudio/AudioSettings";
import { Voice } from "@/types/voice";
import { Track } from "@/types/track";

const voices: Voice[] = [
  { id: "female1", name: "Sarah", gender: "Female", accent: "American" },
  { id: "male1", name: "David", gender: "Male", accent: "American" },
  { id: "female2", name: "Emma", gender: "Female", accent: "British" },
  { id: "male2", name: "James", gender: "Male", accent: "British" },
  { id: "female3", name: "Maria", gender: "Female", accent: "Spanish" },
  { id: "male3", name: "Chen", gender: "Male", accent: "Chinese" }
];

const musicTracks: Track[] = [
  { id: "track1", name: "Upbeat Corporate", duration: "1:45", category: "Corporate" },
  { id: "track2", name: "Inspiring Technology", duration: "2:30", category: "Technology" },
  { id: "track3", name: "Energetic Intro", duration: "0:45", category: "Intro" },
  { id: "track4", name: "Emotional Piano", duration: "3:15", category: "Emotional" },
  { id: "track5", name: "Positive Background", duration: "2:05", category: "Background" }
];

const VoiceAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("female1");
  const [currentTab, setCurrentTab] = useState("tts");
  const [selectedMusic, setSelectedMusic] = useState("");
  const { toast } = useToast();
  
  const handleGenerateVoice = () => {
    toast({
      title: "Voice generated",
      description: "Your text has been converted to speech.",
    });
    
    setIsPlaying(true);
    
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleMusicSelect = (id: string) => {
    setSelectedMusic(id);
    
    toast({
      title: "Music selected",
      description: `You've selected "${musicTracks.find(track => track.id === id)?.name}"`,
    });
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Voice & Audio</h1>
          <p className="text-muted-foreground">Create voiceovers and add background music</p>
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="tts" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            <span>Text to Speech</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center gap-2">
            <Music className="h-4 w-4" />
            <span>Background Music</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tts">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Text to Speech</CardTitle>
                  <CardDescription>Convert your text to natural-sounding speech</CardDescription>
                </CardHeader>
                <CardContent>
                  <TextToSpeechForm 
                    voices={voices}
                    onGenerateVoice={handleGenerateVoice}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>Listen to your generated audio</CardDescription>
              </CardHeader>
              <CardContent>
                <AudioPreview 
                  isPlaying={isPlaying}
                  selectedVoice={selectedVoice}
                  voices={voices}
                  togglePlayback={togglePlayback}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="music">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Music Library</CardTitle>
                    <CardDescription>Choose background music for your content</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <MusicLibrary 
                    musicTracks={musicTracks}
                    selectedMusic={selectedMusic}
                    onMusicSelect={handleMusicSelect}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Audio Settings</CardTitle>
                <CardDescription>Adjust your audio preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <AudioSettings />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VoiceAudio;
