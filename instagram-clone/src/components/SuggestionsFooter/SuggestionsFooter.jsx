import React from "react";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import "./suggestionsfooter.css";

const SuggestionsFooter = () => {
  return (
    <ul className="suggestions-footer">
      <li>
        <Link className="footer-links">About</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">Help</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">Press</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">API</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">Job</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">Privacy</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">Terms</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">Locations</Link>
      </li>
      <LuDot className="footer-links-dot" />
      <li>
        <Link className="footer-links">Language</Link>
      </li>
    </ul>
  );
};

export default SuggestionsFooter;
