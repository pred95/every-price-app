import React, {createContext, useReducer} from 'react';
import authInitialState from './initialsStates/authInitialState';
import offersInitialState from './initialsStates/offersInitialState';
import auth from './reducers/auth';
import offers from './reducers/offers';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [offersState, offersDispatch] = useReducer(offers, offersInitialState);

  return (
    <GlobalContext.Provider
      value={{
        authState,
        offersState,
        authDispatch,
        offersDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
