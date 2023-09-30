import { NavLink } from "react-router-dom";

interface navProps {
  username: string | undefined;
}

const NavBar = ({ username }: navProps) => {
  const links = ["profile", "create-space", "spaces"];

  return (
    <div className="navbar bg-gray-950">
      <div className="flex-1">
        <NavLink className="btn btn-ghost normal-case text-xl" to="/">
          Spaces Finder
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-5">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={`/${link}`}>{link}</NavLink>
            </li>
          ))}
          <li>
            <NavLink to={username ? "/logout" : "/login"}>
              {username ? username : "login"}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
