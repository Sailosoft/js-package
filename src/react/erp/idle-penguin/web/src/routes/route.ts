import AboutPage from "../pages/AboutPage.tsx";
import WelcomePage from "../pages/WelcomePage.tsx";
import { AppRoute } from "./route.interface.ts";

export const APP_ROUTES: AppRoute[] = [
  {
    path: "/",
    component: WelcomePage,
    exact: true,
    label: "Home",
  },
  {
    path: "/about",
    component: AboutPage,
    exact: true,
    label: "About Us",
  },
  // Catch-all route for 404s can easily be added at the end
];