import React, { useEffect, useState } from "react";
import "./styles.css";
import { getUserFloors } from "../../services/floorService.js";
import DashboardPantryCard from "./DashboardPantryCard.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [floors, setFloors] = useState([]);
    const user = localStorage.getItem("username");
    const navigate = useNavigate();

    const fetchFloors = async () => {
        const floorData = await getUserFloors();
        setFloors(floorData);
    };

    useEffect(() => {
        fetchFloors();
    }, []);

    const handleDeleteFloor = async (floorid) => {
        if (window.confirm('Are you sure you want to delete this floor?')) {
          try {
            await axios.delete(`http://localhost:8000/api/floors/${floorid}/`, {
            });
            //navigate where to navigate to?
            fetchFloors();
          } catch (error) {
            console.error('Error deleting dispenser:', error);
          }
        }
      };

    const handleAddFloor = () => {
        navigate("/create-floor"); // Redirect to Add Floor form
    };

    const handleAddPantry = (floorId) => {
        navigate(`/create-pantry/floor/${floorId}/`); // Redirect to Add Pantry form with floorId
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-actions">
                {/* Welcome Message */}
                <h1 className="welcome-message">Welcome to your Dashboard, {user}</h1>

                {/* Add Floor Button */}
                <button onClick={handleAddFloor} className="add-floor-button">
                    + Add Floor
                </button>
            </div>

            <div className="dashboard-container">
                {floors.map((floor) => (
                    <div key={floor.id} className="floor-card">
                        {/* Floor Header */}
                        <div className="floor-header">
                            <h2>Floor {floor.number}</h2>
                            {/* Add Pantry Button */}
                            <button
                                onClick={() => handleDeleteFloor(floor.id)}
                            >
                                Delete Floor
                            </button>
                            <button
                                onClick={() => handleAddPantry(floor.id)}
                                className="add-pantry-button"
                            >
                                + Add Pantry
                            </button>
                        </div>

                        {/* Pantries */}
                        <div className="pantry-container">
                            <DashboardPantryCard floorId={floor.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
