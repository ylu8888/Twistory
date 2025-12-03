const Navbar = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo" onClick={scrollToTop}>Twistory</h1>
      </div>

      <div className="navbar-right">
        <a href="#how">How It Works </a>
        <a href="#about">About Twistory </a>
        <a 
          href="https://www.linkedin.com/in/yang-lu-a47441265/"
          target="_blank"
          rel="noopener noreferrer"
        >Contact</a>

      </div>
      
    </nav>
  );
};

export default Navbar;
