import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleDispenserView = () => {
  const [dispenser, setDispenser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getDispenserById = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/dispensers/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDispenser(response.data);
      } catch (error) {
        console.error('Error fetching dispenser:', error);
      } finally {
        setLoading(false);
      }
    };

    getDispenserById();
  }, [id, token]);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dispenser) {
    return <div>No dispenser found</div>;
  }

  return (
    <div className='home-card'>
      <h2>Dispenser Details</h2>
      <p>Type: {dispenser.type}</p>
      <p>Current Level: {dispenser.current_level}</p>
      <p>Threshold: {dispenser.threshold}</p>
    </div>
  );
};

export default SingleDispenserView;
