import { NavLink } from "react-router-dom";

interface navProps {
  username: string | undefined;
}

const NavBar = ({ username }: navProps) => {
  const links = ["profile", "create-space", "spaces"];

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <NavLink to="/">
          <a className="btn btn-ghost normal-case text-xl">Spaces Finder</a>
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 space-x-5">
          {links.map((link) => (
            <li>
              <NavLink to={`/${link}`}>{link}</NavLink>
            </li>
          ))}
          <li className="bg-gray-950 rounded-lg">
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
