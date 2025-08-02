import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import Pastes from "./components/Pastes";
import ViewPastes from "./components/ViewPastes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <HomePage />
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <NavBar />
        <Pastes />
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <NavBar />
        <ViewPastes />
      </div>
    ),
  },
]);

const App = () => {
  return (
    <div className="w-full">
      <div className="container mx-auto w-10/12 md:w-8/12 xl:w-1/2">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
