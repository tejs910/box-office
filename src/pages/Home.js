import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";

function Home() {
  const [input, setInput] = useState("");
  const onInputChange = function (ev) {
    setInput(ev.target.value);
  };

  const onSearch = function () {
    // https://api.tvmaze.com/search/shows?q=girls
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then((res) => res.json())
      .then((result) => console.log(result));
  };

  const onKeyDown = function (e) {
    if (e.key === "Enter") onSearch();
  };

  return (
    <MainPageLayout>
      <input
        onKeyDown={onKeyDown}
        onChange={onInputChange}
        type="text"
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </MainPageLayout>
  );
}

export default Home;
