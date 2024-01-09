import { Link } from "react-router-dom";
import { useLogout } from "../utility-hooks/useLogout";
import { useAuthContext } from "../utility-hooks/useAuthContext";
import { useState } from "react";

const NavLogoLink = ({ data }) => {
  const { handleHover, handleUnhover, imageStyles } = data;

  return (
    <Link to="/appointments">
      <div
        className="logo-container"
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
      >
        <img src="/logo.jpeg" alt="logo" style={imageStyles} />
      </div>
    </Link>
  );
};

const LogoutButton = ({ data }) => {
  const { logout, handleHover, handleUnhover, imageStyles } = data;
  const handleClick = () => {
    logout();
  };

  return (
    <nav>
      <div className="user-back-contianer">
        <button
          onClick={handleClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleUnhover}
        >
          <img src="/back-button.jpeg" alt="back button" style={imageStyles} />
        </button>
      </div>
    </nav>
  );
};

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnhover = () => {
    setIsHovered(false);
  };

  const imageStyles = {
    transition: "transform 0.3s ease-in-out",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };

  return user ? (
    <header>
      <div className="container">
        <NavLogoLink
          data={{
            handleHover,
            handleUnhover,
            imageStyles,
          }}
        />
        <LogoutButton
          data={{
            handleHover,
            handleUnhover,
            imageStyles,
            logout,
            user,
          }}
        />
      </div>
    </header>
  ) : (
    "N/A"
  );
};

export default Navbar;
