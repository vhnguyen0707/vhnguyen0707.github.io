import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./common/MainLayout";
import Homepage from "./pages/Homepage";
import Resume from "./pages/Resume";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/resume",
      element: <MainLayout showNavBar={true}/>,
      children: [
          {
              index: true,
              element: <Resume />,
          },
      ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}