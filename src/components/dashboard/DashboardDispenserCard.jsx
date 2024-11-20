import React, { useEffect, useState } from "react";
import { getPantryDispensers } from "../../services/dispensers.js";

const DashboardDispenserCard = (props) => {
    const pantryId = props.pantryId;
    const [dispensers, setDispensers] = useState([]);

    const friendlyType = {
        "CO": "Coffee Dispenser",
        "DR": "Drinks Dispenser",
        "SN": "Snacks Dispenser",
    }

    useEffect(() => {
        const fetchDispensers = async () => {
            const dispenserData = await getPantryDispensers(pantryId);
            setDispensers(dispenserData);
        };
        fetchDispensers();
    }, [pantryId]);

    return (
        <div className="dispenser-container">
            {dispensers.map((dispenser) => (
                <div
                    key={dispenser.id}
                    className={`dispenser-card ${
                        dispenser.current_level < dispenser.threshold ? "low-stock" : "full-stock"
                    }`}
                >
                    {/* Icon */}
                    <div className="icon">
                        {dispenser.current_level < dispenser.threshold ? "⚠️" : "✅"}
                    </div>

                    {/* Type */}
                    <p className="type"> {friendlyType[dispenser.type]}</p>

                    {/* Stock Level */}
                    <p className="level">
                        Level: {dispenser.current_level}/{dispenser.max_capacity}
                    </p>

                    {/* Alert Message */}
                    {dispenser.current_level < dispenser.threshold ? (
                        <p className="alert">Low Stock</p>
                    ) : (
                        <p className="alert">Full Stock</p>
                    )}
                </div>

            ))}
        </div>
    );
};

export default DashboardDispenserCard;
