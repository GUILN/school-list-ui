import routes from "@/routes";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavigationMenuProps {
  className?: string;
  onNavigate?: () => void;
}

interface NavigationMenuItemProps {
  iconName: string;
  name: string;
  onNavigate?: () => void;
  path: string;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({
  iconName,
  name,
  onNavigate,
  path,
}) => {
  const LucideIcon = icons[iconName as keyof typeof icons] ?? icons.House;

  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          cn(
            "group flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-secondary-foreground transition-colors",
            "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isActive && "bg-background text-foreground shadow-sm",
          )
        }
        end={path === "/"}
        onClick={onNavigate}
        to={path}
      >
        <LucideIcon
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-current"
        />
        <span>{name}</span>
      </NavLink>
    </li>
  );
};

/**
 * Renders the shared application navigation menu used by the desktop sidebar
 * and the mobile drawer.
 */
export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  className,
  onNavigate,
}) => {
  return (
    <nav aria-label="Main navigation" className={className}>
      <ul className="flex flex-col gap-1 px-3 py-4">
        {routes.map((route) => (
          <NavigationMenuItem
            iconName={route.iconName}
            key={route.path}
            name={route.name}
            onNavigate={onNavigate}
            path={route.path}
          />
        ))}
      </ul>
    </nav>
  );
};
