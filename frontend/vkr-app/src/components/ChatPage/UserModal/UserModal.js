import React, { useEffect, useRef } from 'react';
import './UserModal.css';
import { drawChart } from '../../widgets/PieChart';
import { drawMessageClassesChart } from '../../widgets/BarChart';

function UserModal({ user, onClose }) {
  const chartContainerRef = useRef(null);
  const messageClassesChartContainerRef = useRef(null);

  useEffect(() => {
    drawChart(chartContainerRef.current);
    drawMessageClassesChart(messageClassesChartContainerRef.current);
  }, []);

  return (
    <div className="user-modal">
      <div className="user-modal-content">
        <h3>{user}</h3>
        <div className="user-modal-content-wrapper">
          <div className="chart-container" ref={messageClassesChartContainerRef}></div>
        </div>
        <div className="chart-container" ref={chartContainerRef}></div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default UserModal;
