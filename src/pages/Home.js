import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGET } from "../misc/config";
function Home() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("show");
  const onInputChange = function (ev) {
    setInput(ev.target.value);
  };

  const onSearch = function () {
    apiGET(`search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
    });
  };
  const renderResult = function () {
    if (results && results.length === 0) {
      return <div>No Result</div>;
    }
    if (results && results.length > 0) {
      console.log(searchOption);
      console.log(results[0][searchOption]);
      return results[0].show
        ? results.map((item) => <div key={item.show.id}>{item.show.name}</div>)
        : results.map((item) => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }
    return null;
  };
  const onKeyDown = function (e) {
    if (e.key === "Enter") onSearch();
  };

  const onRadioChange = function (e) {
    setSearchOption(e.target.value);
    console.log(searchOption);
  };
  return (
    <MainPageLayout>
      <input
        onKeyDown={onKeyDown}
        onChange={onInputChange}
        placeholder="search for something"
        type="text"
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            name="typeSearch"
            type="radio"
            value="shows"
            onChange={onRadioChange}
          />
          <label htmlFor="actors-search">
            Actors
            <input
              id="actors-search"
              name="typeSearch"
              type="radio"
              value="people"
              onChange={onRadioChange}
            />
          </label>
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
}

export default Home;
