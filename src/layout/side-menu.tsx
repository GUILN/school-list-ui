import routes from "@/routes";
import { icons } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const SideMenuItem = (props: {
  name: string;
  path: string;
  elementIconName: string;
}) => {
  const { elementIconName, name, path } = props;
  const LucideIcon = icons[elementIconName] ?? icons.House;
  return (
    <li className="flex h-max grow items-center py-2 text-center">
      <div className="ml-2 flex-none text-right text-muted-foreground">
        <LucideIcon />
      </div>
      <Link
        className={cn(
          "my-8 mt-4 flex-1 rounded-sm bg-accent px-16 text-center text-accent-foreground transition-colors",
          "hover:cursor-pointer hover:bg-background hover:text-primary",
        )}
        to={path}
      >
        {name}
      </Link>
    </li>
  );
};

const SideMenu = () => {
  return (
    <div className="pt-20">
      <ul className="flex grow flex-col divide-y-2 divide-border">
        {routes.map((route, i) => (
          <SideMenuItem
            name={route.name}
            key={i}
            path={route.path}
            elementIconName={route.iconName}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
