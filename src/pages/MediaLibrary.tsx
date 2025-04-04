import { useState } from "react";
import { 
  Image as ImageIcon, 
  Video, 
  FileAudio, 
  FolderPlus, 
  Upload, 
  Filter, 
  Search,
  Grid3X3,
  List,
  MoreHorizontal,
  Check,
  Trash2,
  Download,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Mock media items
const mediaItems = [
  { id: 1, type: "image", name: "product-photo.jpg", size: "1.2 MB", date: "2023-09-15", thumbnail: "https://placehold.co/400x400/e9d5ff/4c1d95" },
  { id: 2, type: "image", name: "team-photo.jpg", size: "2.5 MB", date: "2023-09-10", thumbnail: "https://placehold.co/400x400/dbeafe/1e40af" },
  { id: 3, type: "video", name: "product-demo.mp4", size: "12.5 MB", date: "2023-09-08", thumbnail: "https://placehold.co/400x225/fef3c7/92400e" },
  { id: 4, type: "image", name: "banner.png", size: "0.8 MB", date: "2023-09-05", thumbnail: "https://placehold.co/400x150/dcfce7/166534" },
  { id: 5, type: "audio", name: "podcast-intro.mp3", size: "5.3 MB", date: "2023-09-01", thumbnail: null },
  { id: 6, type: "image", name: "logo.png", size: "0.3 MB", date: "2023-08-25", thumbnail: "https://placehold.co/400x400/ede9fe/5b21b6" },
  { id: 7, type: "video", name: "testimonial.mp4", size: "18.2 MB", date: "2023-08-20", thumbnail: "https://placehold.co/400x225/fee2e2/9f1239" },
  { id: 8, type: "image", name: "social-post.jpg", size: "1.7 MB", date: "2023-08-15", thumbnail: "https://placehold.co/400x400/fae8ff/86198f" }
];

const MediaLibrary = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentTab, setCurrentTab] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Filter media by type based on current tab
  const filteredMedia = mediaItems.filter(item => {
    if (currentTab === "all") return true;
    return item.type === currentTab;
  });
  
  // Toggle item selection
  const toggleSelect = (id: number) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(itemId => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  // Select all items
  const selectAll = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredMedia.map(item => item.id));
    }
  };
  
  // Delete selected items
  const deleteSelected = () => {
    toast({
      title: "Media deleted",
      description: `${selectedItems.length} item(s) have been deleted.`,
    });
    setSelectedItems([]);
  };
  
  // Handle upload
  const handleUpload = () => {
    setUploadDialogOpen(false);
    toast({
      title: "Upload successful",
      description: "Your files have been uploaded to the media library.",
    });
  };
  
  // Media item component (grid view)
  const MediaGridItem = ({ item }: { item: typeof mediaItems[0] }) => {
    const isSelected = selectedItems.includes(item.id);
    let thumbnail;
    
    // Determine thumbnail based on media type
    if (item.type === "image" && item.thumbnail) {
      thumbnail = (
        <div 
          className="aspect-square rounded-lg overflow-hidden bg-cover bg-center" 
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        />
      );
    } else if (item.type === "video" && item.thumbnail) {
      thumbnail = (
        <div 
          className="aspect-video rounded-lg overflow-hidden bg-cover bg-center" 
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        >
          <div className="w-full h-full flex items-center justify-center bg-black/30">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      );
    } else if (item.type === "audio") {
      thumbnail = (
        <div className="aspect-square rounded-lg overflow-hidden bg-muted flex items-center justify-center">
          <FileAudio className="h-10 w-10 text-muted-foreground" />
        </div>
      );
    }
    
    return (
      <div className={`group relative rounded-lg overflow-hidden border ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/30'}`}>
        {/* Selection indicator */}
        <div 
          className={`absolute top-2 left-2 w-5 h-5 rounded-full z-10 flex items-center justify-center ${isSelected ? 'bg-primary text-white' : 'bg-white/80 border'}`}
          onClick={() => toggleSelect(item.id)}
        >
          {isSelected && <Check className="h-3 w-3" />}
        </div>
        
        {/* Thumbnail */}
        <div className="cursor-pointer" onClick={() => toggleSelect(item.id)}>
          {thumbnail}
        </div>
        
        {/* Item info */}
        <div className="p-2">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{item.size}</span>
            <span>{new Date(item.date).toLocaleDateString()}</span>
          </div>
        </div>
        
        {/* Actions overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };
  
  // Media item component (list view)
  const MediaListItem = ({ item }: { item: typeof mediaItems[0] }) => {
    const isSelected = selectedItems.includes(item.id);
    let icon;
    
    switch (item.type) {
      case "image":
        icon = <ImageIcon className="h-4 w-4 text-blue-500" />;
        break;
      case "video":
        icon = <Video className="h-4 w-4 text-red-500" />;
        break;
      case "audio":
        icon = <FileAudio className="h-4 w-4 text-orange-500" />;
        break;
    }
    
    return (
      <div 
        className={`flex items-center px-3 py-2 hover:bg-muted/50 rounded ${isSelected ? 'bg-primary/10' : ''}`}
        onClick={() => toggleSelect(item.id)}
      >
        <div 
          className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${isSelected ? 'bg-primary text-white' : 'border'}`}
        >
          {isSelected && <Check className="h-3 w-3" />}
        </div>
        <div className="w-6 flex justify-center mr-3">
          {icon}
        </div>
        <span className="flex-1 font-medium">{item.name}</span>
        <span className="w-20 text-muted-foreground text-sm">{item.size}</span>
        <span className="w-32 text-muted-foreground text-sm">{new Date(item.date).toLocaleDateString()}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <Trash2 className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Manage your images, videos, and audio files</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setUploadDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button>
            <FolderPlus className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>
      
      <div className="bg-background border rounded-lg p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search media..." className="pl-8 w-full" />
            </div>
            
            <Select defaultValue="date">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date Added</SelectItem>
                <SelectItem value="name">File Name</SelectItem>
                <SelectItem value="size">File Size</SelectItem>
                <SelectItem value="type">File Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
            </Button>
            
            <div className="border rounded-md flex">
              <Button 
                variant={viewMode === "grid" ? "secondary" : "ghost"} 
                size="icon" 
                className="h-9 w-9 rounded-none rounded-l-md"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" />
              <Button 
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon" 
                className="h-9 w-9 rounded-none rounded-r-md"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <span>All Media</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-1">
              <ImageIcon className="h-4 w-4" />
              <span>Images</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>Videos</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <FileAudio className="h-4 w-4" />
              <span>Audio</span>
            </TabsTrigger>
          </TabsList>
          
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{selectedItems.length} selected</span>
              <Button variant="outline" size="sm" onClick={selectAll}>
                {selectedItems.length === filteredMedia.length ? "Deselect All" : "Select All"}
              </Button>
              <Button variant="destructive" size="sm" onClick={deleteSelected}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
        
        <TabsContent value="all" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(item => (
                <MediaGridItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-2 flex items-center text-sm font-medium">
                <div className="w-5 h-5 mr-3" />
                <div className="w-6 mr-3" />
                <span className="flex-1">Name</span>
                <span className="w-20">Size</span>
                <span className="w-32">Date Added</span>
                <span className="w-8" />
              </div>
              <div className="divide-y">
                {filteredMedia.map(item => (
                  <MediaListItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        {/* Other tabs (image, video, audio) have the same structure */}
        <TabsContent value="image" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(item => (
                item.type === "image" && <MediaGridItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-2 flex items-center text-sm font-medium">
                <div className="w-5 h-5 mr-3" />
                <div className="w-6 mr-3" />
                <span className="flex-1">Name</span>
                <span className="w-20">Size</span>
                <span className="w-32">Date Added</span>
                <span className="w-8" />
              </div>
              <div className="divide-y">
                {filteredMedia.map(item => (
                  item.type === "image" && <MediaListItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="video" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(item => (
                item.type === "video" && <MediaGridItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-2 flex items-center text-sm font-medium">
                <div className="w-5 h-5 mr-3" />
                <div className="w-6 mr-3" />
                <span className="flex-1">Name</span>
                <span className="w-20">Size</span>
                <span className="w-32">Date Added</span>
                <span className="w-8" />
              </div>
              <div className="divide-y">
                {filteredMedia.map(item => (
                  item.type === "video" && <MediaListItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="audio" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map(item => (
                item.type === "audio" && <MediaGridItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-3 py-2 flex items-center text-sm font-medium">
                <div className="w-5 h-5 mr-3" />
                <div className="w-6 mr-3" />
                <span className="flex-1">Name</span>
                <span className="w-20">Size</span>
                <span className="w-32">Date Added</span>
                <span className="w-8" />
              </div>
              <div className="divide-y">
                {filteredMedia.map(item => (
                  item.type === "audio" && <MediaListItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
              Upload images, videos or audio files to your media library
            </DialogDescription>
          </DialogHeader>
          
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm text-center mb-1">
              Drag and drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Supports JPG, PNG, GIF, MP4, MOV, MP3, WAV
            </p>
            <Button variant="secondary" className="mt-4">
              Select Files
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <Label>File 1.jpg</Label>
              <span className="text-muted-foreground">1.2 MB</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "70%" }}></div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center sm:justify-between">
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload}>
              Upload Files
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MediaLibrary;
