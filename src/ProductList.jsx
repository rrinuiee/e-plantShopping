import React, { useState } from "react";
import "./ProductList.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/CartSlice";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          id: 1,
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          price: 15,
        },
        {
          id: 2,
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene.",
          price: 12,
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          id: 3,
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Soothing gel used for skin.",
          price: 14,
        },
        {
          id: 4,
          name: "Chamomile",
          image:
            "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Promotes sleep and relaxation.",
          price: 15,
        },
      ],
    },
  ];

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div>
      {/* NAVBAR */}
      <div
        style={{
          backgroundColor: "#4CAF50",
          padding: "15px",
          display: "flex",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <h2 onClick={onHomeClick} style={{ cursor: "pointer" }}>
          Paradise Nursery
        </h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => setShowCart(false)}>Plants</button>
          <button onClick={() => setShowCart(true)}>
            Cart 🛒 ({totalItems})
          </button>
        </div>
      </div>

      {/* SHOW CART */}
      {showCart ? (
        <CartItem />
      ) : (
        <div style={{ padding: "20px" }}>
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2>{category.category}</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >
                {category.plants.map((plant) => {
                  const isInCart = cartItems.find(
                    (item) => item.id === plant.id
                  );

                  return (
                    <div
                      key={plant.id}
                      style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        textAlign: "center",
                      }}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        style={{ width: "150px", height: "150px" }}
                      />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <p>${plant.price}</p>

                      <button
                        onClick={() => handleAddToCart(plant)}
                        disabled={isInCart}
                        style={{
                          backgroundColor: isInCart
                            ? "gray"
                            : "#4CAF50",
                          color: "white",
                          padding: "10px",
                          border: "none",
                          cursor: isInCart
                            ? "not-allowed"
                            : "pointer",
                        }}
                      >
                        {isInCart ? "Added" : "Add to Cart"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
