import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGET } from "../misc/config";
function Show() {
  const { id } = useParams();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;
    apiGET(`shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          setShows(results);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log("show", shows);
  if (isLoading) return <div>Data is being loaded</div>;
  if (error) return <div>Error Occured : {error}</div>;

  return <div>Show</div>;
}

export default Show;
