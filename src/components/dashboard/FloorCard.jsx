import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FloorCard.css";

function FloorCard() {
  const [floors, setFloors] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newFloorNumber, setNewFloorNumber] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const floorsResponse = await axios.get("/api/floors", config);

        const userResponse = await axios.get("/users/me", config);

        setFloors(floorsResponse.data);
        setUser(userResponse.data);
      } catch (err) {
        setError("Failed to load floors. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading floors...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const userFloors = floors.filter((floor) => floor.user.id === user.id);

  // adding a new floor
  const handleAddFloor = async () => {
    if (!newFloorNumber) return;

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // POST request to add floor
      const response = await axios.post(
        "/floors/",
        { number: newFloorNumber, user: user.id } //check this w/ backend
      );

      const newFloor = response.data;
      setFloors((prevFloors) => [...prevFloors, newFloor]);
      setNewFloorNumber("");
    } catch (err) {
      setError("Failed to add floor. Please try again later.");
    }
  };

  return (
    <div className="floor-card-container">
      <h2>Your Floors</h2>
      {userFloors.length > 0 ? (
        <ul className="floor-list">
          {userFloors.map((floor) => (
            <li key={floor.id} className="floor-item">
              <div className="floor-details">
                <span>Floor {floor.number}</span>
              </div>
              {/* link to view pantries etc. other stuff here? */}
              <button
                className="view-pantries-button"
                onClick={() =>
                  console.log(`example view pantries for floor ${floor.number}`)
                }
              >
                View Pantry or whatever we want
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p> You are not currently managing any floors. </p>
      )}

      <div className="add-floor-form">
        <h3>Add a Floor</h3>
        <input
          type="number"
          placeholder="Floor Number"
          value={newFloorNumber}
          onChange={(e) => setNewFloorNumber(e.target.value)}
        />
        <button onClick={handleAddFloor}>Add Floor</button>
      </div>
    </div>
  );
}

export default FloorCard;
