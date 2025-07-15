import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function Chat({ username, room }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    socket.emit('joinRoom', { username, room });

    socket.on('chatMessage', (msg) => {
      setMessages((prev) => [...prev, { ...msg, isPrivate: false }]);
    });

    socket.on('privateMessage', (msg) => {
      setMessages((prev) => [...prev, { ...msg, isPrivate: true }]);
    });

    socket.on('updateUsers', (users) => {
      setOnlineUsers(users.filter((u) => u !== username));
    });

    socket.on('userTyping', (user) => {
      if (user !== username) setTypingUser(user);
    });

    socket.on('userStopTyping', () => {
      setTypingUser('');
    });

    return () => {
      socket.off('chatMessage');
      socket.off('privateMessage');
      socket.off('updateUsers');
      socket.off('userTyping');
      socket.off('userStopTyping');
    };
  }, [username, room]);

  let typingTimeout = null;
  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', room);
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => socket.emit('stopTyping', room), 1000);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      user: username,
      text: message,
      time: new Date().toLocaleTimeString(),
      to: recipient,
      room
    };

    if (recipient) {
      socket.emit('privateMessage', { to: recipient, msg: message, room });
    } else {
      socket.emit('chatMessage', msgData);
    }

    setMessage('');
    socket.emit('stopTyping', room);
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300 overflow-y-auto">
        <h3 className="text-lg font-semibold">Welcome, {username}!</h3>
        <p className="text-sm text-gray-600">Room: {room}</p>
        <h4 className="text-md mt-4 mb-2 font-medium">Online Users</h4>
        <ul className="space-y-2">
          {onlineUsers.map((user, i) => (
            <li
              key={i}
              className={`cursor-pointer ${
                recipient === user ? 'text-blue-600 font-bold' : 'text-green-600'
              }`}
              onClick={() => setRecipient(user === recipient ? '' : user)}
            >
              {recipient === user ? '📩 ' : '🟢 '}
              {user}
            </li>
          ))}
        </ul>
        {recipient && (
          <p className="text-sm text-gray-500 mt-4">
            Sending private message to: <strong>{recipient}</strong>
          </p>
        )}
      </div>

      <div className="w-3/4 flex flex-col p-4 bg-white">
        <div className="flex-1 overflow-y-auto mb-4 pr-2 border-b border-gray-300">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`py-2 border-b border-dashed ${
                msg.isPrivate ? 'bg-yellow-50 text-purple-800' : 'text-black'
              }`}
            >
              <strong>{msg.user}</strong>
              <span className="text-gray-500 text-sm ml-2">[{msg.time}]</span>: {msg.text}
              {msg.isPrivate && (
                <span className="ml-2 text-xs text-purple-500">(private)</span>
              )}
            </div>
          ))}
          {typingUser && (
            <p className="italic text-sm text-gray-500 mt-2">{typingUser} is typing...</p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder={recipient ? `Private to ${recipient}...` : 'Type your message...'}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-28"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
