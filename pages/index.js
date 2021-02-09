import React, { useState } from "react";
import useSWR from "swr";
import Data from "../components/Data";
import Head from "next/head";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export default function Index() {
  const [settings, setSettings] = useState({
    address: "",
    sent: false,
  });

  const { address, sent } = settings;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address === "") {
      alert("Please enter a wikipedia address...");
      return;
    }
    setSettings({
      ...settings,
      sent: true,
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "") {
      setSettings({
        ...settings,
        address: "",
        sent: false,
      });
      return;
    }
    setSettings({
      ...settings,
      address: value,
      sent: false,
    });
  };

  const { data, error } = useSWR(
    () => sent && `/api/address/${encodeURIComponent(address)}`,
    fetcher
  );

  return (
    <div id="app">
      <Head>
        <title>Wikipedia Bookmarks</title>
        <link
          rel="shortcut icon"
          href="https://www.flaticon.com/svg/vstatic/svg/372/372416.svg?token=exp=1612834069~hmac=86bedf73e1a96541dee7bc99e9dba579"
          type="image/x-icon"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Wikipedia Bookmarks</h1>
      <p>
        Search all the available bookmarks on a Wikipedia page for easier
        targeting or cross-referencing.
      </p>
      <p>
        Try this link below to get going:
        <br />
        <code>https://en.wikipedia.org/wiki/Sublime_Text</code>
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">URL:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          placeholder="Wikipedia link..."
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {error ? (
        <div className="error">Something went wrong, please try again...</div>
      ) : (
        <>
          {!data && sent ? (
            <div className="error">Loading...</div>
          ) : (
            <>{data && <Data data={data} address={address} />}</>
          )}
        </>
      )}
    </div>
  );
}
