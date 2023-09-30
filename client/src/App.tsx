import { useState } from "react";
import NavBar from "./components/NavBar";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import { AuthService } from "./services/AuthService";

function App() {
  const [userName, setUsername] = useState<string | undefined>();

  const authService = new AuthService();

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
        {
          path: "/login",
          element: (
            <div className="mx-6">
              <LoginComponent
                authService={authService}
                setUserNameCallback={setUsername}
              />
            </div>
          ),
        },
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
    <div className="flex flex-col gap-10 items-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
