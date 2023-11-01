import React from "react";
import Dictionary from "./Dictionary";
import emojipedia from "../emojipedia";

function createEmojipedia(emoji) {
  return (
    <Dictionary
      key={emoji.id}
      name={emoji.name}
      meaning={emoji.meaning}
      emoji={emoji.emoji}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojipedia.map(createEmojipedia)}</dl>
    </div>
  );
}

export default App;
