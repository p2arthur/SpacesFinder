import { useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const [userName, setUsername] = useState<string | undefined>();

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar username={userName} />
          <Outlet />
        </>
      ),
      children: [
        { path: "/", element: <div className="mx-6">hello world</div> },
        { path: "/login", element: <div className="mx-6">login</div> },
        { path: "/profile", element: <div className="mx-6">user profile</div> },
        {
          path: "/create-space",
          element: <div className="mx-6">create space</div>,
        },
        { path: "/spaces", element: <div className="mx-6">Spaces list</div> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
