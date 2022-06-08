import React from "react";
import "./header.css";
import { ReactComponent as GithubLogo } from "./../images/githubLogo.svg";

function Header() {
  return (
    <header className="header">
      <h1 className="productTitle">
        <h1 className="highlightedText">G</h1>raph
        <h1 className="highlightedText"> A</h1>ugmented
        <h1 className="highlightedText"> R</h1>andom
        <h1 className="highlightedText"> A</h1>rray
        <h1 className="highlightedText"> G</h1>eneration
        <h1 className="highlightedText"> E</h1>ngine
      </h1>
      <a
        href="https://github.com/YeluriKetan/project-GARAGE"
        target="blank"
        rel="noreferrer"
        className="githubLink"
      >
        <GithubLogo className="githubLogo" />
      </a>
    </header>
  );
}

export default Header;
