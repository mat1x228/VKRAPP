import React, { useState, useEffect, useRef } from 'react';
import './UserList.css';
import UserModal from '../UserModal/UserModal';
import { drawConflictDynamics } from '../../widgets/LineChart';


function UserList({ onClose }) {
  const userList = ['@adelgz', '@elinatimergalieva', '@mrkvchch', '@d0nor_keksa'];
  const [selectedUser, setSelectedUser] = useState(null);
  const chartContainerRef = useRef(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    //test d3.js
    const data = [
      { date: "2023-05-19", count: 5 },
      { date: "2023-05-20", count: 9 },
      { date: "2023-05-21", count: 10 },
      { date: "2023-05-22", count: 3 },
      { date: "2023-05-23", count: 6 },
      { date: "2023-05-24", count: 8 },
      { date: "2023-05-25", count: 9 },
      { date: "2023-05-26", count: 5 },
    ];

    drawConflictDynamics(data, chartContainerRef);
  }, []);

  return (
    <div className="user-list">
      <h3>User List</h3>
      <div className="graph-card">
        <div ref={chartContainerRef} id="conflict-dynamics-container"></div>
      </div>

      {userList.map((user) => (
        <button
          key={user}
          className="user-list-item"
          onClick={() => handleUserClick(user)}
        >
          {user}
        </button>
      ))}
      {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
}

export default UserList;
