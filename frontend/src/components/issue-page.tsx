import { useState, useEffect } from 'react';
import axios from 'axios';

type Issue = { id: string, title: string, description: string };
const BASE_URL = 'http://localhost:8800/issue';

export function IssuePage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [createIssue, setCreateIssue] = useState({ title: '', description: '' });
  const [updateIssue, setUpdateIssue] = useState({ id: '', title: '', description: '' });
  const [deleteId, setDeleteId] = useState('');

  // Handle creating an issue
  const handleCreate = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, createIssue);
      alert(response.data.message);
      fetchIssues(); // Refresh the issues after creation
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  // Fetch the array of issues (Read operation)
  const fetchIssues = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/read`);
      setIssues(response.data); // Assume the response is an array of issues
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  // Handle updating an issue
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${updateIssue.id}`, updateIssue);
      alert(response.data.message);
      fetchIssues(); // Refresh the issues after update
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  // Handle deleting an issue
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${deleteId}`);
      alert(response.data.message);
      fetchIssues(); // Refresh the issues after deletion
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  // Fetch the issue once the component mounts
  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      <h1>Simple REST API Client</h1>

      {/* Create Issue */}
      <div>
        <h2>Create Issue</h2>
        <input
          type="text"
          placeholder="Title"
          value={createIssue.title}
          onChange={(e) => setCreateIssue({ ...createIssue, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={createIssue.description}
          onChange={(e) => setCreateIssue({ ...createIssue, description: e.target.value })}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Read Issues */}
      <div>
        <h2>Read Issues</h2>
        {issues.length > 0 ? (
          <ul>
            {issues.map((obj, index) => (
              <li key={index}>
                <strong>ID:</strong> {obj.id} | <strong>Name:</strong> {obj.title} | <strong>Description:</strong> {obj.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No issues found.</p>
        )}
        <button onClick={fetchIssues}>Refresh Issues</button>
      </div>

      {/* Update Issue */}
      <div>
        <h2>Update Issue</h2>
        <input
          type="text"
          placeholder="ID"
          value={updateIssue.id}
          onChange={(e) => setUpdateIssue({ ...updateIssue, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={updateIssue.title}
          onChange={(e) => setUpdateIssue({ ...updateIssue, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={updateIssue.description}
          onChange={(e) => setUpdateIssue({ ...updateIssue, description: e.target.value })}
        />
        <button onClick={handleUpdate}>Update</button>
      </div>

      {/* Delete Issue */}
      <div>
        <h2>Delete Issue</h2>
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
