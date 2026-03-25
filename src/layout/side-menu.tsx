import { NavigationMenu } from "./navigation-menu";

/**
 * Renders the persistent desktop sidebar navigation for authenticated routes.
 */
const SideMenu = () => {
  return (
    <div className="h-full overflow-y-auto py-4">
      <NavigationMenu className="pt-2" />
    </div>
  );
};

export default SideMenu;
