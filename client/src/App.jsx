import { useState } from 'react';
import LoginForm from './components/LoginForm';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <Chat username={user.username} room={user.room} />
      ) : (
        <LoginForm onJoin={setUser} />
      )}
    </div>
  );
}

export default App;
