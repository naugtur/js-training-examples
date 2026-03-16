import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const SingleItem = ({ item }) => {
 
  const handleResize = () => {
    console.log("resized", item.field);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [item.field]);

  return <div className="lookItsMe">{item.field}</div>;
};

const SomeComponent = ({ items }) => (
  <div className="list x">
    {items.map((item, number) => (
      <SingleItem key={number} item={item} />
    ))}
  </div>
);

function generate() {
  return Array(99)
    .join(",")
    .split(",")
    .map(() => ({
      field: Math.random().toFixed(2),
      somethingToLeak: Array(1000).fill("lotsathingz".repeat(1000)),
    }));
}

function App() {
  const [items, setItems] = useState(generate);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setItems(generate());
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="app">
      <button onClick={() => setRunning(false)}>stop</button>
      <SomeComponent items={items} />
    </div>
  );
}

const root = createRoot(document.querySelector(".main"));
root.render(<App />);
