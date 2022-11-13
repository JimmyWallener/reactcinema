import { createContext, useContext, useState } from 'react';
import { AuthContextType, IAuth } from '../@types/auth';

const AuthContext = createContext<AuthContextType>({
  loggedInUser: { logged: false, id: '' },
  setLoggedInUser: () => {},
});
const AuthContextProvider = ({ children }: any) => {
  const [loggedInUser, setLoggedInUser] = useState<IAuth>({
    logged: false,
    id: '',
  });

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContextProvider;
