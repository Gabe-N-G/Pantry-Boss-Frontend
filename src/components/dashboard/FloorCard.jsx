import { useState, useEffect } from 'react';
import axios from 'axios';

const FloorCard = () => {
  const [floors, setFloors] = useState([]);

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        // Get the JWT token from localStorage
        const token = localStorage.getItem('token');
        
        const response = await axios.get('http://localhost:8000/api/floors/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setFloors(response.data);
        console.log(floors)
      } catch (error) {
        console.error('Error fetching floors:', error);
      }
    };

    fetchFloors();
  }, []);

  return (
    <div className="floors-container">
      <h2>My Floors</h2>
      <div className="floor-grid">
        {floors.map((floor) => (
          <div key={floor.id} className="floor-card">
            <h3>Floor {floor.number}</h3>
            {/* Add more floor details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorCard;