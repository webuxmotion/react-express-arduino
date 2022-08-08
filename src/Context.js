import { createContext, useState, useContext, useMemo, useEffect } from 'react';

const Context = createContext({
  data: {},
  setData: () => {},
});

function Provider({ children }) {
  const [data, setData] = useState({});
  const value = useMemo(
    () => ({ data, setData }), 
    [data]
  );
  
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

export { Context, Provider };