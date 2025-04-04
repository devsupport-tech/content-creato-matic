import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Check,
  ChevronRight,
  Image as ImageIcon,
  Video,
  Mic,
  Music,
  AlignLeft,
  Pencil,
  Palette,
  ChevronDown,
  Download,
  Sparkles,
  BrainCircuit,
  Upload,
  FileAudio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const platforms = [
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-blue-400" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-red-600" },
  { id: "tiktok", name: "TikTok", icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ), color: "bg-black" },
  { id: "pinterest", name: "Pinterest", icon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="17" y2="22" />
      <path d="M19 9c0 4.97-4.03 9-9 9-2.02 0-3.88-.67-5.38-1.8" />
      <path d="M5.5 7.1C7 5.5 9.3 4.5 12 4.5c4.97 0 9 4.03 9 9 0 .52-.06 1.02-.14 1.5" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  ), color: "bg-red-500" }
];

const templates = {
  promotion: {
    title: "Promotional Post",
    content: "Exciting news! 🎉 We're offering a special discount on our products for a limited time. Don't miss out on this opportunity to save big! #SpecialOffer #LimitedTimeOffer",
    platform: "facebook"
  },
  announcement: {
    title: "Announcement",
    content: "We have some exciting news to share! Stay tuned for our upcoming announcement. #BigNews #ComingSoon",
    platform: "instagram"
  },
  engagement: {
    title: "Engagement Post",
    content: "We'd love to hear from you! What features would you like to see in our next update? Share your thoughts in the comments below. #Feedback #CustomerFirst",
    platform: "twitter"
  },
  ad: {
    title: "Ad Campaign",
    content: "Transform your workflow with our innovative solutions. Designed for professionals who demand performance and reliability. Learn more and start your free trial today!",
    platform: "linkedin"
  }
};

const CreateContent = () => {
  const [searchParams] = useSearchParams();
  const templateType = searchParams.get("template");
  
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [contentTitle, setContentTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const [currentTab, setCurrentTab] = useState("write");
  const [previewPlatform, setPreviewPlatform] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [generatingContent, setGeneratingContent] = useState(false);
  const [autoSubtitles, setAutoSubtitles] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (templateType && templates[templateType as keyof typeof templates]) {
      const template = templates[templateType as keyof typeof templates];
      setContentTitle(template.title);
      setContentText(template.content);
      setSelectedPlatforms([template.platform]);
      setPreviewPlatform(template.platform);
    }
  }, [templateType]);
  
  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        const newPlatforms = prev.filter(p => p !== platformId);
        
        // If removing the currently previewed platform, change the preview
        if (platformId === previewPlatform && newPlatforms.length > 0) {
          setPreviewPlatform(newPlatforms[0]);
        } else if (newPlatforms.length === 0) {
          setPreviewPlatform("");
        }
        
        return newPlatforms;
      } else {
        // If this is the first platform, set it as preview
        if (prev.length === 0) {
          setPreviewPlatform(platformId);
        }
        return [...prev, platformId];
      }
    });
  };
  
  const saveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your content has been saved as a draft.",
    });
  };
  
  const publishContent = () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platform selected",
        description: "Please select at least one platform to publish to.",
        variant: "destructive"
      });
      return;
    }
    
    if (!contentText.trim()) {
      toast({
        title: "Empty content",
        description: "Please add some content before publishing.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Content published!",
      description: `Your content has been scheduled for publishing on ${selectedPlatforms.length} platform(s).`,
    });
  };
  
  const generateContentWithAI = async (prompt: string, type: "text" | "image" | "audio") => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key to use this feature",
        variant: "destructive"
      });
      return;
    }

    setGeneratingContent(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      switch (type) {
        case "text":
          setContentText("This is AI generated content based on your prompt: \"" + prompt + 
            "\". In a real implementation, this would use an actual AI service API.");
          break;
        case "image":
          toast({
            title: "Image Generated",
            description: "AI image generation would display results here"
          });
          setSelectedImages(["ai-generated-image-placeholder"]);
          break;
        case "audio":
          toast({
            title: "Audio Generated",
            description: "AI audio generation would play results here"
          });
          break;
      }
      
      toast({
        title: "Content Generated",
        description: `AI has generated ${type} content based on your prompt`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingContent(false);
    }
  };

  const handleAddHashtags = () => {
    setContentText(prev => prev + " #ContentCreator #SocialMedia #DigitalMarketing");
  };

  const handleAddAttentionGrabber = () => {
    setContentText("🔥 EXCITING NEWS! " + contentText);
  };

  const handleAddCallToAction = () => {
    setContentText(prev => prev + "\n\nLink in bio! 👆");
  };

  const handleAddFollowRequest = () => {
    setContentText(prev => prev + "\n\n📱 Follow us for more updates!");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...fileArray]);
      
      // Create object URLs for preview
      const newImageUrls = fileArray.map(file => URL.createObjectURL(file));
      setSelectedImages(prev => [...prev, ...newImageUrls]);
      
      toast({
        title: "Files uploaded",
        description: `${fileArray.length} file(s) have been uploaded.`
      });
      
      // Reset the input
      e.target.value = '';
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...fileArray]);
      
      toast({
        title: "Video uploaded",
        description: `${fileArray.length} video file(s) have been uploaded.`
      });
      
      // Reset the input
      e.target.value = '';
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...fileArray]);
      
      toast({
        title: "Audio uploaded",
        description: `${fileArray.length} audio file(s) have been uploaded.`
      });
      
      // Reset the input
      e.target.value = '';
    }
  };

  const handleSchedulePost = () => {
    toast({
      title: "Post Scheduled",
      description: "Your content has been scheduled for publication."
    });
  };

  const handleConnectWorkflow = () => {
    toast({
      title: "Workflow Connected",
      description: "Your workflow integration has been configured."
    });
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Template Saved",
      description: "Your content has been saved as a template."
    });
  };

  const handleToggleSubtitles = (checked: boolean) => {
    setAutoSubtitles(checked);
    toast({
      title: checked ? "Subtitles Enabled" : "Subtitles Disabled",
      description: checked ? "Automatic subtitles will be generated." : "Automatic subtitles have been turned off."
    });
  };

  const handleSelectStockMedia = (itemId: number) => {
    toast({
      title: "Media Selected",
      description: `Stock media item ${itemId} has been added to your content.`
    });
    setSelectedImages(prev => [...prev, `stock-media-${itemId}`]);
  };
  
  const PlatformSelector = () => (
    <div className="flex flex-wrap gap-2 mb-6">
      {platforms.map((platform) => {
        const PlatformIcon = platform.icon;
        const isSelected = selectedPlatforms.includes(platform.id);
        
        return (
          <TooltipProvider key={platform.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  className={`flex items-center gap-2 ${isSelected ? "bg-brand-purple text-white" : ""}`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  <PlatformIcon className="h-4 w-4" />
                  <span>{platform.name}</span>
                  {isSelected && <Check className="h-4 w-4 ml-1" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isSelected 
                  ? `Remove ${platform.name} from selection` 
                  : `Add ${platform.name} to your post`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
  
  const ContentPreview = () => {
    if (!previewPlatform) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground text-center">
            Select a platform to preview your content
          </p>
        </div>
      );
    }
    
    const platform = platforms.find(p => p.id === previewPlatform);
    const PlatformIcon = platform?.icon || Facebook;
    
    switch (previewPlatform) {
      case "facebook":
        return (
          <div className="max-w-md mx-auto border rounded-lg overflow-hidden bg-white">
            <div className="p-3 flex items-center border-b">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="font-semibold">Your Page</p>
                <p className="text-xs text-gray-500">Just now · <PlatformIcon className="inline h-3 w-3" /></p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm mb-3">{contentText || "Your content will appear here..."}</p>
              <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                <span>0 Likes</span>
                <span>0 Comments</span>
                <span>0 Shares</span>
              </div>
            </div>
          </div>
        );
        
      case "instagram":
        return (
          <div className="max-w-md mx-auto">
            <div className="border rounded-lg overflow-hidden bg-white">
              <div className="p-3 flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2 ring-2 ring-pink-500"></div>
                <p className="font-semibold text-sm">your_username</p>
                <div className="ml-auto">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-gray-400" />
              </div>
              
              <div className="p-3">
                <div className="flex gap-3 mb-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0 ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  </Button>
                </div>
                
                <p className="text-sm">
                  <span className="font-semibold">your_username</span> {contentText || "Your caption will appear here..."}
                </p>
              </div>
            </div>
          </div>
        );
        
      case "twitter":
        return (
          <div className="max-w-md mx-auto border rounded-lg overflow-hidden bg-white p-4">
            <div className="flex">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <div className="flex items-center">
                  <p className="font-semibold">Your Name</p>
                  <p className="text-gray-500 text-sm ml-2">@your_handle · Just now</p>
                </div>
                <p className="text-sm mt-1">{contentText || "Your tweet will appear here..."}</p>
                
                <div className="mt-3 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
                
                <div className="flex justify-between mt-3 text-gray-500">
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    0
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m3 12 7-7 7 7"></path><path d="m3 12 7 7 7-7"></path></svg>
                    0
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                    0
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "linkedin":
        return (
          <div className="max-w-md mx-auto border rounded-lg overflow-hidden bg-white">
            <div className="p-3 flex items-start">
              <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="font-semibold">Your Name</p>
                <p className="text-xs text-gray-500">Your Title</p>
                <p className="text-xs text-gray-500">Just now · <PlatformIcon className="inline h-3 w-3" /></p>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm mb-3">{contentText || "Your post will appear here..."}</p>
              
              <div className="aspect-video bg-gray-100 rounded flex items-center justify-center mb-3">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path></svg>
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m3 3 18 18"></path><path d="M10.5 8.5a2.5 2.5 0 0 1 5 0c0 2.5-5 2.5-5 5a2.5 2.5 0 0 1 5 0"></path></svg>
                  Share
                </Button>
              </div>
            </div>
          </div>
        );
        
      case "youtube":
        return (
          <div className="max-w-md mx-auto border rounded-lg overflow-hidden bg-white">
            <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-white ml-1"><polygon points="6 3 20 12 6 21"></polygon></svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold">{contentTitle || "Your video title"}</h3>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p className="font-semibold">Your Channel</p>
                  <p className="text-xs text-gray-500">Just now · 0 views</p>
                </div>
              </div>
              <p className="text-sm mt-3">{contentText || "Your video description will appear here..."}</p>
            </div>
          </div>
        );
        
      case "tiktok":
        return (
          <div className="max-w-md mx-auto border rounded-lg overflow-hidden bg-white">
            <div className="aspect-[9/16] bg-gray-900 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-xl font-bold mb-2">{contentTitle || "Your TikTok Title"}</p>
                  <p className="text-sm">{contentText || "Your TikTok caption will appear here..."}</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2
