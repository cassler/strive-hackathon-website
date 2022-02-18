import { useMemo } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useDarkMode } from './use-dark';
import DropdownMenu from './DropdownMenu';
import logoUrl from '../assets/logo.png';
import lightLogo from '../assets/logo_light.png';

export function AppHeader() {
  const { darkMode, toggle } = useDarkMode();

  const Logo = () => useMemo(() => (
    <div><img src={darkMode ? lightLogo : logoUrl} className='h-8 w-auto translate-y-1 opacity-90'/></div>
  ), [darkMode, toggle])

  return (
    <header className="App-header">
      <div className="container flex">
        <a href="https://striveconsulting.com/" target="_blank" className="flex-1 pb-1.5">
          <div className='flex items-center gap-2 hover:-translate-y-1 transition-all duration-250'>
          <Logo />
          <div className='flex flex-col items-left text-left justify-center -space-y-2 text-black/75 dark:text-white/90 dark:hover:text-white transition-all duration-200'>
            <div className='text-2xl font-normal'>strive</div>
            <div className='font-semibold text-xs tracking-tighter flex-nowrap whitespace-nowrap'>Innovation Lab</div>
          </div>
          </div>
        </a>
        <nav className="items-center flex gap-2">
          <button onClick={() => toggle(!darkMode)} type="button" className="flex-1 ui !bg-transparent">
            {darkMode ? <MoonIcon className="w-5 h-5 text-white" /> : <SunIcon className="w-5 h-5 text-white" />}
          </button>
          <DropdownMenu />
        </nav>
      </div>
    </header>
  );
}

export default { AppHeader };
