import { useState, useEffect } from 'react';
import axios from 'axios';

type Issue = { id: string, title: string, description: string };
export function IssuePage() {
  const [objects, setObjects] = useState<Issue[]>([]);
  const [createData, setCreateData] = useState({ title: '', description: '' });
  const [updateData, setUpdateData] = useState({ id: '', title: '', description: '' });
  const [deleteId, setDeleteId] = useState('');

  // Handle creating an object
  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8800/create', createData);
      alert(response.data.message);
      fetchObjects(); // Refresh the objects after creation
    } catch (error) {
      console.error('Error creating object:', error);
    }
  };

  // Fetch the array of objects (Read operation)
  const fetchObjects = async () => {
    try {
      const response = await axios.get('http://localhost:8800/read');
      setObjects(response.data); // Assume the response is an array of objects
    } catch (error) {
      console.error('Error fetching objects:', error);
    }
  };

  // Handle updating an object
  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:8800/update', updateData);
      alert(response.data.message);
      fetchObjects(); // Refresh the objects after update
    } catch (error) {
      console.error('Error updating object:', error);
    }
  };

  // Handle deleting an object
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8800/delete/${deleteId}`);
      alert(response.data.message);
      fetchObjects(); // Refresh the objects after deletion
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  // Fetch the object once the component mounts
  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <div>
      <h1>Simple REST API Client</h1>

      {/* Create Object */}
      <div>
        <h2>Create Object</h2>
        <input
          type="text"
          placeholder="Title"
          value={createData.title}
          onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={createData.description}
          onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Read Objects */}
      <div>
        <h2>Read Objects</h2>
        {objects.length > 0 ? (
          <ul>
            {objects.map((obj, index) => (
              <li key={index}>
                <strong>ID:</strong> {obj.id} | <strong>Name:</strong> {obj.title} | <strong>Description:</strong> {obj.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No objects found.</p>
        )}
        <button onClick={fetchObjects}>Refresh Objects</button>
      </div>

      {/* Update Object */}
      <div>
        <h2>Update Object</h2>
        <input
          type="text"
          placeholder="ID"
          value={updateData.id}
          onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={updateData.title}
          onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={updateData.description}
          onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>

      {/* Delete Object */}
      <div>
        <h2>Delete Object</h2>
        <input
          type="text"
          placeholder="ID to delete"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
