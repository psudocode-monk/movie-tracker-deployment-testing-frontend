import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movies from "./pages/Movies.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import CreateMovie from "./pages/CreateMovie.tsx";
import ShowMovies from "./pages/ShowMovies.tsx";
import EditMovie from "./pages/EditMovie.tsx";
import Error from "./components/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/create-movies",
    element: <CreateMovie />,
  },
  {
    path: "/get-movies",
    element: <ShowMovies />,
  },
  {
    path: "update-movie/:id",
    element: <EditMovie />,
  }, 
  {
    path: "*",
    element: <Error />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
