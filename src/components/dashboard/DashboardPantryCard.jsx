import React, { useEffect, useState } from "react";
import { getFloorPantries } from "../../services/pantryService.js";
import DashboardDispenserCard from "./DashboardDispenserCard.jsx";
import { useNavigate } from "react-router-dom";

const DashboardPantryCard = (props) => {
    const floorId = props.floorId;
    const [pantries, setPantries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPantries = async () => {
            const pantryData = await getFloorPantries(floorId);
            setPantries(pantryData);
        };
        fetchPantries();
    }, [floorId]);

    const handleAddDispenser = (pantryId) => {
        navigate(`/create-dispenser?pantryId=${pantryId}`);
    };

    return (
        <>
            {pantries.map((pantry) => (
                <div key={pantry.id} className="pantry-card">
                    {/* Add Dispenser Button */}
                    <button
                        onClick={() => handleAddDispenser(pantry.id)}
                        className="add-dispenser-button"
                    >
                        + Add Dispenser
                    </button>

                    {/* Pantry Title */}
                    <h3>{pantry.name}</h3>

                    {/* Dispenser Cards */}
                    <div className="dispenser-container">
                        <DashboardDispenserCard pantryId={pantry.id} />
                    </div>
                </div>
            ))}
        </>
    );
};

export default DashboardPantryCard;
