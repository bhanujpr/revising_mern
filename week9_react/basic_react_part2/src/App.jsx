import { useState } from "react";

function App() {
  return (
    <>
      <div style={{ display: "flex" }}>
        {/* <Card children={"Hello there"} /> MEANS SAME */}
        <Card>
          <div>
          Wanna inpur something
          </div>
          <div>
          <input type="text" name="" id="" />
          </div>
          </Card>
        <Card>
          <div style={{ color: "orange" }}>Hello there</div>
        </Card>
      </div>
    </>
  );
}

function Card({ children }) {
  return (
    <div
      style={{
        background: "black",
        borderRadius: 10,
        color: "white",
        padding: 10,
        margin: 10,
      }}
    >
      upperr contwnt
      {children}
      lower content
    </div>
  );
}

export default App;
