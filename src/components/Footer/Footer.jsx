import React from "react";
import "./Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-links">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <FacebookIcon className="footer-icon" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <TwitterIcon className="footer-icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <InstagramIcon className="footer-icon" />
        </a>
      </div>
      <p>
        &#169; {new Date(Date.now()).getFullYear()} DevCode | Made with{" "}
        <FavoriteIcon className="heart-icon" /> in India
      </p>
    </div>
  );
}

export default Footer;
