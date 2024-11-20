import { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleDispenserView = () => {
  const [dispenser, setDispenser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    current_level: 0,
    threshold: 0,
  });

  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getDispenserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/dispensers/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDispenser(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching dispenser:", error);
      } finally {
        setLoading(false);
      }
    };

    getDispenserById();
  }, [id, token]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this dispenser?')) {
      try {
        await axios.delete(`http://localhost:8000/api/dispensers/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        //navigate where to navigate to?
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting dispenser:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/dispensers/${id}/`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDispenser(response.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating dispenser:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dispenser) {
    return <div>No dispenser found</div>;
  }

  return (
    <div className="single-dispenser-card">
      <h2>Dispenser Details</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="DR">Drinks</option>
              <option value="SN">Snacks</option>
              <option value="CO">Coffee</option>
            </select>
          </div>
          <div>
            <label>Current Level:</label>
            <input
              type="number"
              name="current_level"
              value={formData.current_level}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Threshold:</label>
            <input
              type="number"
              name="threshold"
              value={formData.threshold}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Max Capacity:</label>
            <input
              type="number"
              name="max_capacity"
              value={formData.max_capacity}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Type: {dispenser.type}</p>
          <p>Current Level: {dispenser.current_level}</p>
          <p>Threshold: {dispenser.threshold}</p>
          <p>Maximum Capacity: {dispenser.max_capacity}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete Dispenser</button>
        </div>
      )}
    </div>
  );
};

export default SingleDispenserView;
