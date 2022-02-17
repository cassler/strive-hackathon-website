import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useAuth0 } from '@auth0/auth0-react';
import { useDarkMode } from './use-dark';
import DropdownMenu from './DropdownMenu';

export function AppHeader() {
  const { darkMode, toggle } = useDarkMode();
  const {
    user, isAuthenticated, loginWithRedirect, logout, isLoading,
  } = useAuth0();

  function handleProfileClick() {
    if (isLoading) return;
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      logout();
    }
  }

  return (
    <header className="App-header">
      <div className="container flex">
        <h2 className="flex-1 ">
          <div>Strive</div>
          <span>Innovation Lab</span>
        </h2>
        <nav className="items-center flex gap-2">
          <button onClick={() => toggle(!darkMode)} type="button" className="flex-1 ui">
            {darkMode ? <MoonIcon className="w-5 h-5 text-white" /> : <SunIcon className="w-5 h-5 text-white" />}
          </button>
          <button onClick={handleProfileClick} type="button" className="inline-block ui w-24">
            {user?.name ? user.name : 'Login'}
          </button>
          <DropdownMenu />
        </nav>
      </div>
    </header>
  );
}

export default { AppHeader };
