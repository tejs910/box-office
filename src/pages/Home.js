import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import CustomRadio from "../components/CustomRadio";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGET } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";
function Home() {
  const [input, setInput] = useLastQuery();
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
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
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
      <SearchInput
        onKeyDown={onKeyDown}
        onChange={onInputChange}
        placeholder="search for something"
        type="text"
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            label="Shows"
            id="shows-search"
            name="typeSearch"
            value="shows"
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="actors"
            id="actors-search"
            name="typeSearch"
            value="people"
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResult()}
    </MainPageLayout>
  );
}

export default Home;
