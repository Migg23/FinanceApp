// src/contexts/UserContext.js
import { createContext, useState } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [username, setUN] = useState('');

  return (
    <UserContext.Provider value={{ username, setUN }}>
      {children}
    </UserContext.Provider>
  );
}
