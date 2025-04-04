
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import ContentGeneratorForm from "@/components/content-generator-form";
import ContentDisplay from "@/components/content-display";

const Index = () => {
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = (content: string) => {
    setGeneratedContent(content);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="container mx-auto px-4 py-8">
          <div className="content-area">
            <h2 className="text-2xl font-bold mb-6">Generate Your Content</h2>
            <ContentGeneratorForm onGenerate={handleGenerate} />
            
            {generatedContent && (
              <ContentDisplay content={generatedContent} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
