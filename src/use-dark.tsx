// Manage setting a `dark` class on the body from a React context
// and persisting between sessions with localStorage.

import React from 'react';

export function useDarkMode() {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const toggle = (enable: boolean) => {
    setDarkMode(enable);
    const { classList } = document.documentElement;
    const hasDarkClass = classList.contains('dark');
    if (enable && !hasDarkClass) {
      classList.add('dark');
      localStorage.theme = 'dark';
    } else if (!enable && hasDarkClass) {
      classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  React.useEffect(() => {
    const wasDark = localStorage.theme === 'dark';
    toggle(wasDark);
  }, []);

  return { darkMode, toggle, setDarkMode };
}

export default useDarkMode;
