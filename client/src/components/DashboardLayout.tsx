import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import mountainImage from '@assets/generated_images/Mountain_footer_background_landscape_2499735f.png';

interface DashboardLayoutProps {
  children?: React.ReactNode;
  statusContent?: React.ReactNode;
  roadmapContent?: React.ReactNode;
}

export default function DashboardLayout({ statusContent, roadmapContent }: DashboardLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-background sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">DS</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Digital Services Roadmap</h1>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <Tabs defaultValue="roadmap" className="h-full flex flex-col">
          <div className="border-b px-6">
            <TabsList className="h-12 bg-transparent" data-testid="tabs-navigation">
              <TabsTrigger value="status" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none" data-testid="tab-status">
                Status Dashboard
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none" data-testid="tab-roadmap">
                Roadmap
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="status" className="flex-1 overflow-auto m-0">
            {statusContent}
          </TabsContent>

          <TabsContent value="roadmap" className="flex-1 overflow-hidden m-0">
            {roadmapContent}
          </TabsContent>
        </Tabs>
      </main>

      <footer className="relative h-32 overflow-hidden">
        <img
          src={mountainImage}
          alt="Mountain landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative h-full flex items-center justify-center text-white">
          <p className="text-sm">© 2025 Digital Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
