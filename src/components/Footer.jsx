function Footer() {
  return (
    <footer className="bg-primary text-white py-2 mt-5">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <p className="mb-0 fs-5">&copy; 2024 B-Cards. All rights reserved.</p>
          <p className="fs-5 my-2">Designed and developed by Tal Madar</p>
        </div>

        <div className="text-center">
          <a
            href="https://www.linkedin.com/feed/?trk=404_page"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <div className="text-end">
          <p className="fs-5 my-2">
            Email me:{" "}
            <a href="mailto:talmadar360@gmail.com" className="text-white">
              talmadar360@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
