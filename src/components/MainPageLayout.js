import React from "react";
import Navs from "./Navs";
import Title from "./Title";
function MainPageLayout({ children }) {
  return (
    <div>
      <Title
        title="Box Office"
        subtitle="Are you looking for movie or Actor?"
      />
      <Navs></Navs>
      {children}
    </div>
  );
}

export default MainPageLayout;
