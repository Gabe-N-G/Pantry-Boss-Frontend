import { useState, useEffect } from 'react';
import { useParams, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateFloorForm() {
    const [floors, setFloors] = useState([]);
    const [newFloor, setNewFloor] = useState('');
    const navigate = useNavigate()

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
        navigate('/dashboard')
        
      } catch (error) {
        console.error('Error creating floor:', error);
      }
    };


  return (
    <div className='home-card'>
        <h3>CreateFloorForm</h3>
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
    </div>
  )
}

export default CreateFloorForm