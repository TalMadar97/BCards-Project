import { useNavigate } from "react-router-dom";
import cacheUtils from "../utils/cache";
import DarkModeButton from "./DarkModeButton";

function Navbar() {
  const navigate = useNavigate();

  const user = cacheUtils.getUser();
  const isBusiness = user?.isBusiness;

  const logout = () => {
    cacheUtils.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container">
        <a
          className="nav-link navbar-brand fw-bold text-white fs-1 me-5"
          href="/"
        >
          B-Cards
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white fs-3 me-5" href="/aboutme">
                About
              </a>
            </li>
            {user && (
              <li className="nav-item">
                <a className="nav-link text-white fs-3" href="/favourites">
                  Favorites
                </a>
              </li>
            )}
            {isBusiness && (
              <li className="nav-item">
                <a className="nav-link text-white fs-3 mx-3" href="/my-cards">
                  My Cards
                </a>
              </li>
            )}
          </ul>

          <form className="d-flex">
            <input
              className="form-control me-2 fs-5"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light fs-5" type="submit">
              Search
            </button>
          </form>
          <div className="mx-5">
            <DarkModeButton />
          </div>
          {!user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-white me-3 fs-5" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fs-5" href="/register">
                  Register
                </a>
              </li>
            </ul>
          )}
          {user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link text-white me-3 fs-5"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
