'use client';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../../firebase';

export const CreateAuthContext = createContext<any>(null);

export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [userInformation, setUserInformation] = useState<any>();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        setUserInformation(user);
      }
    });
  }, []);

  return (
    <CreateAuthContext.Provider value={{ userInformation }}>
      {children}
    </CreateAuthContext.Provider>
  );
};
