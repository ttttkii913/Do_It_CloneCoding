import React from "react";
import Potato from "./Potato";

function Food({ fav }) {
  return <h1>I like { fav }</h1>
}

function App() {
  return (
    <div>
      <h1>Hello</h1>
      <Potato />
      <Food fav="kimchi" />
      <Food fav="ramen" />
      <Food fav="samgiopsal" />
      <Food fav="chukumi" />
    </div>
  );
}

export default App;
