import { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import cacheUtils from "../../utils/cache";
import DarkModeButton from "../DarkModeButton";
import IconLink from "../icons/IconLink";
import styles from "./navbar.module.css";
import LogoutModal from "../Modals/LogoutModal";

function Navbar() {
  const { searchText, setSearchText } = useContext(GlobalContext);
  const navigate = useNavigate();

  const user = cacheUtils.getUser();
  const isBusiness = user?.isBusiness;

  const [showLinks, setShowLinks] = useState(false);
  const navbarRef = useRef(null);
  const pathname = location.pathname;

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowLinks(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowLinks(false);
  }, [pathname]);

  return (
    <nav ref={navbarRef} className={styles.navbar}>
      <div
        className={`${styles.links} ${showLinks ? styles["show-links"] : ""}`}
      >
        <Link className={pathname === "/" ? styles.active : ""} to="/">
          B-Cards
        </Link>

        <Link
          className={pathname === "/aboutme" ? styles.active : ""}
          to="/aboutme"
        >
          About
        </Link>
        {user && (
          <Link
            className={pathname === "/favourites" ? styles.active : ""}
            to="/favourites"
          >
            Favorites
          </Link>
        )}
        {isBusiness && (
          <Link
            className={pathname === "/my-cards" ? styles.active : ""}
            to="/my-cards"
          >
            My Cards
          </Link>
        )}

        <input
          className="form-control me-2 fs-5"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div>
          <DarkModeButton />
        </div>

        {user && (
          <IconLink
            iconClass="fa-regular fa-id-card"
            href="/profile"
            color={"var(--color-text)"}
            size={"1.8rem"}
            justifyContentProp={"flex-start"}
          />
        )}

        {!user && (
          <>
            <Link
              className={pathname === "/login" ? styles.active : ""}
              to="/login"
            >
              Login
            </Link>
            <Link
              className={pathname === "/register" ? styles.active : ""}
              to="/register"
            >
              Register
            </Link>
          </>
        )}

        {user && <LogoutModal />}
      </div>
      <div
        className={`${styles.hamburger} ${showLinks ? styles.open : ""}`}
        onClick={toggleLinks}
      >
        &#9776;
      </div>
    </nav>
  );
}

export default Navbar;
