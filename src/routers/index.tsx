import { createBrowserRouter } from "react-router-dom";
import { tutorPath } from "@/routers/tutor.routes";
import { routesGenerator } from "@/utils/routesGenerator";
import { userRole } from "@/utils/role";
import MainLayout from "@/components/layout/shell/MainLayout";
import DashboardLayout from "@/components/layout/shell/DashboardLayout";
import Login from "@/pages/Auth/Login";
import SignUp from "@/pages/Auth/SignUp";
import Home from "@/pages/Home";
import NotFound from "@/pages/Errors/NotFound";
import Tuitions from "@/pages/tuition_jobs/Tuitions";
import PrivetRoute from "@/routers/PrivateRoute";
import BookDemoClass from "@/pages/book_demo_class/BookDemoClass";
import TuitionDetailsPage from "@/pages/tuition_jobs/TuitionDetails";
import TutorHub from "@/pages/tutor_hub/TutorHub";
import TutorHubDetails from "@/pages/tutor_hub/TutorHubDetails";

const router = createBrowserRouter([
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
    // TODO: NEED TO GIVE A BETTER NAME OF THE ROUTE.
    path: "/tutor",
    element: (
      <PrivetRoute role={userRole.TUTOR}>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: routesGenerator(tutorPath),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
