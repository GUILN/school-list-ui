import routes from "@/routes";
import { Route, Routes, useLocation } from "react-router-dom";
import SideMenu from "./side-menu";
import { useEffect, useState } from "react";

const routesDict: Record<string, string> = {};
routes.forEach((route) => (routesDict[route.path] = route.name));
const MainLayout = () => {
  const [headerTitle, setHeaderTitle] = useState("Title");
  const location = useLocation();
  useEffect(() => setHeaderTitle(routesDict[location["pathname"]]), [location]);
  return (
    <>
      <div className="w-full h-svh max-h-svh flex">
        <div className="h-full flex-1">
          {/* main content area */}
          <div className="flex flex-col justify-between overflow-y-scroll h-full">
            <div className="sticky top-0 w-full">
              {/* header */}
              <div className="bg-primary py-5">
                <h1
                  className="text-center text-xl text-secondary"
                  data-testid="main-header-title"
                >
                  {headerTitle}
                </h1>
              </div>
            </div>
            <div className="flex flex-1">
              <div className="hidden h-full flex-[0.2] bg-secondary md:block">
                {/* left side menu */}
                <SideMenu />
              </div>
              <div className="h-full flex-1">
                {/* content */}
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
          </div>
          <div className="sticky top-0 block bg-pink-500 py-5 md:hidden">
            {/* Botton Navigation for Small Screens */}
            <h1 className="text-center text-xl">Bottom Navigation</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLayout;
