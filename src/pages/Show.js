import React, { useEffect, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";
import { useParams } from "react-router-dom";
import { apiGET } from "../misc/config";
const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return {
        isLoading: false,
        show: action.show,
        error: null,
      };
    }
    case "FETCH_FAILED": {
      return {
        ...prevState,
        isLoading: false,
        error: action.error,
      };
    }
    default:
      return prevState;
  }
};
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};
function Show() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  //   const [shows, setShows] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    apiGET(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          console.log("res is", results);
          dispatch({ type: "FETCH_SUCCESS", show: results });
          //   setShows(results);
          //   setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAILED", error: err.message });
          //   setError(err.message);
          //   setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log("show", state.show);
  if (state.isLoading) return <div>Data is being loaded</div>;
  if (state.error) return <div>Error Occured : {state.error}</div>;

  return <div>Show</div>;
}

export default Show;
