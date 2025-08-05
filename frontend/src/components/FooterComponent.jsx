import React from "react";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light py-3 fixed-bottom">
      <div className="container text-center">
        <span>
          &copy; {new Date().getFullYear()} Todo App. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default FooterComponent;
