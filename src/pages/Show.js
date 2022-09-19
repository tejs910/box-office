import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGET } from "../misc/config";
function Show() {
  const { id } = useParams();
  const [shows, setShows] = useState(null);
  useEffect(() => {
    apiGET(`shows/${id}?embed[]=seasons&embed[]=cast`).then((results) => {
      setShows(results);
    });
  }, [id]);
  console.log("show", shows);
  return <div>Show</div>;
}

export default Show;
