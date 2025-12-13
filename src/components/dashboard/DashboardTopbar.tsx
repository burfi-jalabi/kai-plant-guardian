import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/components/ui/sidebar";
import { PlantToggle } from "@/components/PlantToggle";

interface DashboardTopbarProps {
  title: string;
}

export function DashboardTopbar({ title }: DashboardTopbarProps) {
  const { toggleSidebar, isMobile } = useSidebar();

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <h1 className="font-display text-xl lg:text-2xl font-bold text-foreground">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Search - hidden on mobile */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-10 w-64 bg-muted/50 border-border/50"
            />
          </div>

          {/* Plant Theme Toggle */}
          <PlantToggle />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full sensor-pulse" />
          </Button>

          {/* User avatar */}
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="w-8 h-8 rounded-full bg-gradient-glow flex items-center justify-center shadow-glow">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
