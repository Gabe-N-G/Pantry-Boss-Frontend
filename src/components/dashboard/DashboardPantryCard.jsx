import React, { useEffect, useState } from "react";
import { getFloorPantries } from "../../services/pantryService.js";
import DashboardDispenserCard from "./DashboardDispenserCard.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPantryCard = (props) => {
    const floorId = props.floorId;
    const [pantries, setPantries] = useState([]);
    const navigate = useNavigate();

    const fetchPantries = async () => {
        const pantryData = await getFloorPantries(floorId);
        setPantries(pantryData);
    };

    useEffect(() => {
        fetchPantries();
    }, [floorId]);

    const handleAddDispenser = (pantryId) => {
        navigate(`/create-dispenser/pantry/${pantryId}`);
    };

    const handleDeletePantry = async (pantryid) => {
        if (window.confirm('Are you sure you want to delete this Pantry?')) {
          try {
            await axios.delete(`http://localhost:8000/api/pantries/${pantryid}/`, {
            });
            //navigate where to navigate to?
            fetchPantries();
          } catch (error) {
            console.error('Error deleting dispenser:', error);
          }
        }
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
                    <button
                        onClick={() => handleDeletePantry(pantry.id)}
                    >
                        Delete Pantry
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
