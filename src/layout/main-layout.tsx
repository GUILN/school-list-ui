import routes from "@/routes";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { NavigationMenu } from "./navigation-menu";
import SideMenu from "./side-menu";

interface MobileNavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigationDrawer: React.FC<MobileNavigationDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-40 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      <button
        aria-label="Close navigation menu"
        className={cn(
          "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
        type="button"
      />
      <aside
        aria-label="Navigation menu"
        aria-modal="true"
        className={cn(
          "absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r bg-background shadow-xl transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        id="mobile-navigation-drawer"
        role="dialog"
      >
        <div className="border-b bg-secondary/60 px-4 py-4">
          <p className="text-sm font-medium text-muted-foreground">Navegação</p>
        </div>
        <NavigationMenu className="pt-2" onNavigate={onClose} />
      </aside>
    </div>
  );
};

/**
 * Provides the authenticated application shell with responsive navigation.
 */
const MainLayout = () => {
  const location = useLocation();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const headerTitle =
    routes.find((route) => route.path === location.pathname)?.name ?? "";

  useEffect(() => {
    setIsMobileNavigationOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileNavigationOpen) {
      return undefined;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavigationOpen(false);
      }
    };

    const previousBodyOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMobileNavigationOpen]);

  return (
    <div className="flex min-h-svh w-full bg-background text-foreground">
      <div className="flex min-h-svh flex-1 flex-col">
        <div className="sticky top-0 z-30 w-full border-b bg-primary">
          <div className="relative flex min-h-16 items-center px-4 py-3">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 md:hidden">
              <Button
                aria-controls="mobile-navigation-drawer"
                aria-expanded={isMobileNavigationOpen}
                aria-label="Open navigation menu"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                onClick={() => setIsMobileNavigationOpen(true)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            <h1
              className="mx-auto px-12 text-center text-lg font-semibold text-primary-foreground sm:text-xl"
              data-testid="main-header-title"
            >
              {headerTitle}
            </h1>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <ThemeToggle className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
            </div>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <aside className="hidden h-full w-72 shrink-0 border-r bg-secondary/60 md:block">
            <SideMenu />
          </aside>
          <main className="min-w-0 flex-1 overflow-y-auto">
            <Routes>
              {routes.map((route) => (
                <Route
                  Component={route.component}
                  key={route.path}
                  path={route.path}
                />
              ))}
            </Routes>
          </main>
        </div>
      </div>
      <MobileNavigationDrawer
        isOpen={isMobileNavigationOpen}
        onClose={() => setIsMobileNavigationOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
