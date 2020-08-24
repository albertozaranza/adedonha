import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const Time = createContext();

export const TimeProvider = ({ children }) => {
  const [time, setTime] = useState(0);

  return (
    <Time.Provider
      value={{
        time,
        setTime
      }}
    >
      {children}
    </Time.Provider>
  );
};

TimeProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default Time;
