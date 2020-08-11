import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  auth: '',
  setAuth: () => {},
});

const ContextWrapper = (props) => {
  const cookies = document.cookie.split('; ').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});

  const authCookie = cookies['x-auth-cookie'];
  
  const [auth, setAuth] = useState(!!authCookie);
  const value = React.useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default ContextWrapper;
