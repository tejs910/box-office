import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGET } from "../misc/config";
function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const onInputChange = function (ev) {
    setInput(ev.target.value);
  };

  const onSearch = function () {
    apiGET(`search/shows?q=${input}`).then((result) => {
      setResults(result);
    });
  };
  const renderResult = function () {
    if (results && results.length === 0) {
      return <div>No Result</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map((item) => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null;
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
      {renderResult()}
    </MainPageLayout>
  );
}

export default Home;
