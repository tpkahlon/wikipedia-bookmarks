import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function Data({ data: { result, message }, address }) {
  let listing;
  const [text, setText] = useState({ value: "", copied: false });

  const onCopy = () => {
    setText({ copied: true });
    alert("URL copied successfully...");
  };
  if (result) {
    const parser = new DOMParser();
    const document = parser.parseFromString(result, "text/html");
    const ids = document.querySelectorAll("#content [id]");
    const arrayOfIds = Array.from(ids).map((i) => `${address}#${i.id}`);
    listing = arrayOfIds.map((i, idx) => (
      <li key={idx}>
        <a href={i} target="_blank" rel="noopener noreferrer">
          {i}
        </a>
        <CopyToClipboard onCopy={onCopy} text={i}>
          <button>Copy</button>
        </CopyToClipboard>
      </li>
    ));
  }
  if (message) return <div className="error">{message}</div>;
  return <ul>{listing}</ul>;
}
