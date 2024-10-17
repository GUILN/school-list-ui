import routes from "@/routes";
import { icons } from "lucide-react";
import { Link } from "react-router-dom";

const SideMenuItem = (props: {
  name: string;
  path: string;
  elementIconName: string;
}) => {
  const { elementIconName, name, path } = props;
  // @ts-expect-error it should follow lucide icon names
  const LucideIcon = icons[elementIconName] ?? icons.House;
  return (
    <li className="text-center grow h-max py-2 flex">
      <div className="text-right ml-2 flex-none">
        <LucideIcon />
      </div>
      <Link
        className="bg-accent
             text-lg text-center
              hover:text-blue-400 hover:cursor-pointer rounded-sm mt-4 px-16 my-8 flex-1"
        to={path}
      >
        {name}
      </Link>
    </li>
  );
};

const SideMenu = () => {
  return (
    <div className="pt-40">
      <ul className="flex flex-col grow divide-y-2 hover:divide-y-8">
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
