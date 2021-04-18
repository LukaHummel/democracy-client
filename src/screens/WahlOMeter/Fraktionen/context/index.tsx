import React, { createContext, useState } from 'react';

interface WomPartyInterface {
  party: number;
  setWomParty: (party: number) => void;
}

const defaults: WomPartyInterface = {
  party: 0,
  setWomParty: () => {
    throw new Error('WomPartyContext: setWomParty function is not defined');
  },
};

export const WomPartyContext = createContext<WomPartyInterface>(defaults);

export const WomPartyProvider: React.FC = ({ children }) => {
  const [party, setWomParty] = useState(0);

  return (
    <WomPartyContext.Provider
      value={{
        party,
        setWomParty,
      }}>
      {children}
    </WomPartyContext.Provider>
  );
};
