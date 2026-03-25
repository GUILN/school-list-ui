import routes from "@/routes";
import { Route, Routes, useLocation } from "react-router-dom";
import SideMenu from "./side-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const routesDict: Record<string, string> = {};
routes.forEach((route) => (routesDict[route.path] = route.name));

const MainLayout = () => {
  const location = useLocation();
  const headerTitle = routesDict[location.pathname] ?? "";

  return (
    <div className="flex h-svh max-h-svh w-full bg-background text-foreground">
      <div className="h-full flex-1">
        <div className="flex h-full flex-col justify-between overflow-y-scroll">
          <div className="sticky top-0 z-10 w-full">
            <div className="relative bg-primary px-4 py-5">
              <h1
                className="text-center text-xl text-primary-foreground"
                data-testid="main-header-title"
              >
                {headerTitle}
              </h1>
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <ThemeToggle className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" />
              </div>
            </div>
          </div>
          <div className="flex flex-1">
            <div className="hidden h-full flex-[0.2] border-r bg-secondary md:block">
              <SideMenu />
            </div>
            <div className="h-full flex-1">
              <Routes>
                {routes.map((route, i) => (
                  <Route
                    path={route.path}
                    key={i}
                    Component={route.component}
                  />
                ))}
              </Routes>
            </div>
          </div>
          <div className="sticky top-0 block border-t bg-secondary py-5 text-secondary-foreground md:hidden">
            <h1 className="text-center text-xl">Bottom Navigation</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
