import { useState, useEffect } from 'react';
import axios from 'axios';

const FloorCard = () => {
  const [floors, setFloors] = useState([]);
  const [newFloor, setNewFloor] = useState('');

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/floors/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setFloors(response.data);
      } catch (error) {
        console.error('Error fetching floors:', error);
      }
    };

    fetchFloors();
  }, []);

  const handleCreateFloor = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const response = await axios.post(
        'http://localhost:8000/api/floors/', 
        { 
          number: parseInt(newFloor), 
          user: userId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setFloors([...floors, response.data]);
      setNewFloor('');
      
    } catch (error) {
      console.error('Error creating floor:', error);
    }
  };

  return (
    <div className="floors-container">
      <h2>My Floors</h2>

      <form onSubmit={handleCreateFloor} className="add-floor-form">
        <input
          type="number"
          value={newFloor}
          onChange={(e) => setNewFloor(e.target.value)}
          placeholder="Enter floor number"
          min="1"
          required
        />
        <button type="submit">Add Floor</button>
      </form>

      <div className="floor-list">
        {floors.map((floor) => (
          <div key={floor.id} className="floor-card">
            <h3>Floor {floor.number}</h3>
            <button onClick={() => window.location.href = `/floors/${floor.number}`}>
              View Floor Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FloorCard;
