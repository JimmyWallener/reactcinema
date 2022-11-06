import { useState } from 'react';
import { app, db } from '../db/firebase';

export const useAuth = () => {
  const [authed, setAuthed] = useState(true);
  console.log(app);
  console.log(db);

  return {
    authed,
    login() {
      return new Promise<void>((res) => {
        setAuthed(true);
        res();
      });
    },
    logout() {
      return new Promise<void>((res) => {
        setAuthed(false);
        res();
      });
    },
  };
};
