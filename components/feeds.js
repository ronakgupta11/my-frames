"use client";

import React, { useState, useEffect } from "react";
// import FeedCard from "./feedCard";
// import { Loader2 } from "lucide-react";
import { Spinner } from "flowbite-react";
// import { Button } from "./ui/button";
import { Button } from "flowbite-react";
import Frame from "./frame"
import ChannelSwitch from  "./changeChannel"

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [channel,setChannel] = useState("")
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextPageToken, setNextPageToken] = useState("");
  async function checkIfHTMLPage(url) {
    try {
      const data = JSON.stringify({
        url
      });
      const response = await fetch("/api/check",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
     
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }
  async function fetchData(nextPage, initialLoad) {
    try {
      if (initialLoad) {
        setLoading(true);
      } else {
        setLoadingMore(true)
      }
      const data = JSON.stringify({
        channel: channel,
        nextPage: nextPage,
      });
      const feedData = await fetch("/api/feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const feed = await feedData.json();
      console.log("feed",feed)

      const isEmbedValid = (item) => item.embeds[0]?.url;
      
      // const isUrlValid = await checkIfHTMLPage(item)

      const filteredFeed = await Promise.all(feed.map(async item => {
        if (isEmbedValid(item) && true) {
            return item;
        }
    }));
    
    // Filter out undefined values from the array (items that didn't pass the condition)
    const finalFilteredFeed = filteredFeed.filter(item => item !== undefined);
    

      setFeed((prevFeed) => [...prevFeed, ...finalFilteredFeed]);
      setNextPageToken(feed[0].pageToken);
      setLoading(false);
      setLoadingMore(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
      setLoadingMore(false)
    }
  }

  function refetchData() {
    fetchData(nextPageToken, false);
  }

  useEffect(() => {
    setFeed([]); // Clear the feed state
    fetchData("", true);
  }, [channel]);

  return (
    <div className="mt-4 flex min-h-screen flex-col items-center justify-start">
       <ChannelSwitch setChannel={setChannel}/>
      {loading ? (
        <Spinner  />
      ) : (
        <div className="flex flex-col items-center justify-start gap-12 mb-6">
          {feed ? (
            feed.map((item, index) => (
              <Frame
                key={index}
                url={item.embeds[0].url}
                // author={item.fid || "anon"}
                // text={item.castAddBody.text}
              />
            ))
          ) : (
            <h1>Failed to fetch Posts</h1>
          )}
          {loadingMore ? (
            <Button disabled>
              <Spinner />
            </Button>
          ) : (
            <Button variant="secondary" onClick={refetchData}>
              More
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
