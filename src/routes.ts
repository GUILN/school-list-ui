import HomePage from "./pages/home";
import UserProfilePage from "./pages/user-profile";

interface Route {
  path: string;
  name: string;
  component: React.ComponentType<unknown>;
}

const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    component: UserProfilePage,
  },
];

export default routes;
