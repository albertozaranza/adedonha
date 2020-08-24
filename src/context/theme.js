import React, {
  useState,
  createContext,
  useLayoutEffect,
  useEffect
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import light from '@/themes/light';
import dark from '@/themes/dark';

const Theme = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(light);

  useLayoutEffect(() => {
    const getAsyncStorageTheme = async () => {
      try {
        const value = await AsyncStorage.getItem('@adedonha/theme');
        if (value !== null) {
          if (value === 'dark') setTheme(dark);
          else setTheme(light);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAsyncStorageTheme();
  }, []);

  useEffect(() => {
    const setAsyncStorageTheme = async () => {
      try {
        await AsyncStorage.setItem('@adedonha/theme', theme.title);
      } catch (error) {
        console.log(error);
      }
    };
    setAsyncStorageTheme();
  }, [theme]);

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
