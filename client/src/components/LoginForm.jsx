import React, { useState } from 'react';

function LoginForm({ onJoin }) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const handleJoin = () => {
    if (username.trim() && room.trim()) {
      onJoin({ username, room });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Join Chat</h1>
      <input
        placeholder="Enter your name"
        className="border rounded px-4 py-2 w-64"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Enter room name"
        className="border rounded px-4 py-2 w-64"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleJoin}
      >
        Join
      </button>
    </div>
  );
}

export default LoginForm;
