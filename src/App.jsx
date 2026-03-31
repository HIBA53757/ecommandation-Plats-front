import React from "react";
import PlateCard from "./components/PlateCard.jsx"; 
import "./App.css";

export default function App() {
  const plates = [
    { name: "coscos", price: 50, is_available: true },
    { name: "tajine", price: 70, is_available: false },
    { name: "bastila", price: 90, is_available: true },
  ];

  return (
     <div className="app">
          <h1>menu</h1>
      <div className="plate-list">
        {plates.map((plate, index) => (
          <PlateCard
       key={index}
             name={plate.name}
              price={plate.price}
            is_available={plate.is_available}
          />
        ))}
      </div>
    </div>
  );
}