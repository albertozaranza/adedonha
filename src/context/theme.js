import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import light from '@/themes/light';
import dark from '@/themes/dark';

const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  };

  return (
    <Theme.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </Theme.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired
};

export default Theme;
