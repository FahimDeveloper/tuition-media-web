import { createBrowserRouter } from "react-router-dom";
import { tutorPath } from "@/routers/tutor.routes";
import { routesGenerator } from "@/utils/routes.utils";
import { userRole } from "@/utils/role";
import MainLayout from "@/components/layout/shell/MainLayout";
import DashboardLayout from "@/components/layout/shell/DashboardLayout";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signup/SignUp";
import Home from "@/pages/home/Home";
import NotFound from "@/pages/errors/NotFound";
import Tuitions from "@/pages/tuition-jobs/TuitionsJobs";
import PrivateRoute from "@/routers/PrivateRoute";
import BookDemoClass from "@/pages/book-demo-class/BookDemoClass";
import TuitionDetailsPage from "@/pages/tuition-jobs/TuitionJobDetails";
import TutorHub from "@/pages/tutor-hub/TutorHub";
import TutorHubDetails from "@/pages/tutor-hub/TutorHubDetails";
import RootLayout from "@/components/layout/shell/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "demo-class", element: <BookDemoClass /> },
          { path: "tuitions", element: <Tuitions /> },
          { path: "tuitions/:id", element: <TuitionDetailsPage /> },
          { path: "hub", element: <TutorHub /> },
          { path: "hub/:id", element: <TutorHubDetails /> },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/tutor",
        element: (
          <PrivateRoute role={userRole.TUTOR}>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: routesGenerator(tutorPath),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
