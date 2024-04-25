import React, { useState, useEffect } from 'react';

function BananaPunchCard({ username }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`/api/banana-count/${username}`)
      .then(response => response.json())
      .then(data => {
        setCount(data.count);
      })
      .catch(error => console.error("Failed to fetch banana count:", error));
    }, [username]);

  const handlePunch = () => {
    fetch(`/api/banana-punch`, {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        setCount(data.count);
      })
      .catch(error => console.error("Failed to punch banana:", error));
    };

  return (
    <div className="banana-punch-card">
      <h3>{username} The number of bananas you have insisted on tracking: {count}</h3>
      <button onClick={handlePunch}>🍌 Get A Banana! 🍌</button>
    </div>
  );
}

export default BananaPunchCard;
