import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../client";
import MasonaryLayout from "./MasonaryLayout";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins , setPins]= useState([])
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query  = searchQuery(categoryId)
      client.fetch(query).then((data) => {
        console.log(data)
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery).then((data) => {
        console.log(data, 'from feed query')
        setPins(data)
        setLoading(false)
      })
    }
  }, [categoryId]);
  if (loading) {
    return <Spinner message={`Chotto matte kudasai...`}></Spinner>;
  }
  return (
    <section>
      {pins && <MasonaryLayout pins={pins}></MasonaryLayout>}
    </section>
  );
};

export default Feed;
