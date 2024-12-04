import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleBlockUser = async (userId) => {
    try {
      await axios.put(`/api/users/${userId}/block`);
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, isBlocked: true } : user
        )
      );
    } catch (error) {
      console.error("Error blocking user", error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {user.username}
            <button
              onClick={() => handleBlockUser(user.id)}
              className="btn btn-danger btn-sm"
            >
              Block
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
