import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import ShowMainData from "../components/show/ShowMainData";
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
  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
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
  console.log("show", show);
  if (isLoading) return <div>Data is being loaded</div>;
  if (error) return <div>Error Occured : {error}</div>;

  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        sumarry={show.sumarry}
        tags={show.genres}
      />

      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>

      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>

      <div>
        <h2>Casts</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
}

export default Show;
