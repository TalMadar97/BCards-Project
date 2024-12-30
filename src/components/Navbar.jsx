function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand me-4" href="#" style={{ color: "black" }}>
        B-Cards
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" style={{ color: "black" }} href="#">
              About <span className="sr-only"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" style={{ color: "black" }} href="#">
              Favorites
            </a>
          </li>
          <li className="nav-item mx-5 ">
            <input type="search" placeholder="Search" aria-label="Search" />
          </li>

          <li className="nav-item">
            <a className="nav-link" style={{ color: "black" }} href="/login">
              Login
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" style={{ color: "black" }} href="#">
              Register
            </a>
          </li>

          <li className="nav-item mx-5 my-2">
            <i className="fa-solid fa-id-badge"></i>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
