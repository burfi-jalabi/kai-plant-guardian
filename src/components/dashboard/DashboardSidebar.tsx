import { 
  LayoutDashboard, 
  Activity, 
  Droplets, 
  Bug, 
  Settings, 
  Sprout,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeft
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
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
  const { state, toggleSidebar, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      className={cn(
        "border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-out",
        "flex flex-col h-screen sticky top-0"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center justify-between gap-2">
          <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sprout className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <h1 className="font-display text-lg font-bold text-sidebar-foreground whitespace-nowrap">
                    GrowSense AI
                  </h1>
                  <p className="text-xs text-sidebar-foreground/70 whitespace-nowrap">Dashboard</p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </SidebarHeader>

      {/* Toggle button - always visible */}
      <div className={cn(
        "absolute z-50 transition-all duration-300",
        isCollapsed ? "top-4 -right-3" : "top-4 right-3"
      )}>
        <Button 
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            "h-6 w-6 rounded-full shadow-soft bg-background border-border hover:bg-muted",
            "transition-transform duration-200 hover:scale-110"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </Button>
      </div>

      <SidebarContent className="p-2 flex-1 overflow-y-auto overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "transition-opacity duration-200",
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/dashboard"}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl",
                        "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "transition-all duration-200 group"
                      )}
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium shadow-sm"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                      </motion.div>
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className={cn(
            "transition-opacity duration-200",
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={isCollapsed ? item.title : undefined}>
                    <NavLink 
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl",
                        "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "transition-all duration-200"
                      )}
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                          >
                            {item.title}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border flex-shrink-0">
        <Link 
          to="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl",
            "text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive",
            "transition-all duration-200"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
