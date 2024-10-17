import HomePage from "./pages/home";
import PrintSchoolListPage from "./pages/print-school-list";
import UserAddressPage from "./pages/user-address";
import UserProfilePage from "./pages/user-profile";
import CreateSchoolListPage from "./pages/create-school-list";

interface Route {
  path: string;
  name: string;
  component: React.ComponentType<unknown>;
  iconName: string;
}

const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    iconName: "House",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    component: UserProfilePage,
    iconName: "User",
  },
  {
    path: "/user-address",
    name: "User Address",
    component: UserAddressPage,
    iconName: "Building",
  },
  {
    path: "/create-school-list",
    name: "Create School List",
    component: CreateSchoolListPage,
    iconName: "School",
  },
  {
    path: "/print-school-list",
    name: "Print School List",
    component: PrintSchoolListPage,
    iconName: "Printer",
  },
];

export default routes;
