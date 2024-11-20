import React, { useEffect, useState } from "react";
import "./styles.css";
import { getUserFloors } from "../../services/floorService.js";
import DashboardPantryCard from "./DashboardPantryCard.jsx";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [floors, setFloors] = useState([]);
    const user = localStorage.getItem("username");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFloors = async () => {
            const floorData = await getUserFloors();
            setFloors(floorData);
        };

        fetchFloors();

    }, []);

    const handleAddFloor = () => {
        navigate("/create-floor"); // Redirect to Add Floor form
    };

    const handleAddPantry = (floorId) => {
        navigate(`/create-pantry?floorId=${floorId}`); // Redirect to Add Pantry form with floorId
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
