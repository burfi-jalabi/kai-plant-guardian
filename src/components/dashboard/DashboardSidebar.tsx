import { 
  LayoutDashboard, 
  Activity, 
  Droplets, 
  Bug, 
  Settings, 
  Sprout,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Sensor Data", url: "/dashboard/sensors", icon: Activity },
  { title: "Water Prediction", url: "/dashboard/water", icon: Droplets },
  { title: "Disease Detection", url: "/dashboard/disease", icon: Bug },
];

const settingsItems = [
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="border-r border-border bg-card leaf-pattern">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-glow flex items-center justify-center shadow-emerald glow-pulse">
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  GrowSense AI
                </h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            )}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={`${isCollapsed ? "sr-only" : ""} text-muted-foreground/70 uppercase text-xs tracking-wider`}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      activeClassName="bg-primary/15 text-primary font-medium shadow-glow"
                    >
                      <div className="relative">
                        <item.icon className="w-5 h-5 shrink-0" />
                        {/* Pulsing dot for active sensors */}
                        {item.title === "Sensor Data" && (
                          <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full sensor-pulse-delay-${index}`} />
                        )}
                      </div>
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className={`${isCollapsed ? "sr-only" : ""} text-muted-foreground/70 uppercase text-xs tracking-wider`}>
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                      activeClassName="bg-primary/15 text-primary font-medium"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <Link 
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
