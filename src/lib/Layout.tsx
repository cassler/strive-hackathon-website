import { useContext, useEffect, useMemo } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useDarkMode } from './useDark';
import ThumbMenu from './ThumbMenu';
import logoUrl from '../assets/logo.png';
import lightLogo from '../assets/logo_light.png';
import { BonusContext } from './AppContext';
import ReactGA from 'react-ga';
import { useAuth0 } from '@auth0/auth0-react';

export function AppHeader({className = ''}: {className:string}) {
  const { darkMode, toggle } = useDarkMode();
  const { user, isLoading } = useAuth0();
  useEffect(() => {
    ReactGA.initialize(import.meta.env.VITE_ANALYTICS_ID as string, {
      debug: true,
    });
    ReactGA.pageview('/')
  }, [])

  useEffect(() => {
    if ( isLoading ) return
    ReactGA.set({ userId: user?.sub })
  }, [user])

  const Logo = () => useMemo(() => (
    <div><img src={darkMode ? lightLogo : logoUrl} className='h-8 w-auto translate-y-1 opacity-90'/></div>
  ), [darkMode, toggle])

  return (
    <header className={className}>
      <div className="container flex">
        <a href="https://striveconsulting.com/" target="_blank" className="flex-1 pb-1.5">
          <div className='flex items-center gap-2 hover:-translate-y-1 transition-all duration-250'>
          <Logo />
          <div className='flex flex-col items-left text-left justify-center -space-y-2 text-black/75 dark:text-white/90 dark:hover:text-white'>
            <div className='text-2xl font-normal'>strive</div>
            <div className='font-semibold text-xs tracking-tighter flex-nowrap whitespace-nowrap'>Innovation Lab</div>
          </div>
          </div>
        </a>
        <nav className="items-center flex gap-2">
          <button onClick={() => toggle(!darkMode)} type="button" className="flex-1 ui !bg-transparent">
            {darkMode ? <MoonIcon className="w-5 h-5 text-white" /> : <SunIcon className="w-5 h-5 text-white" />}
          </button>
          <ThumbMenu />
        </nav>
      </div>
    </header>
  );
}


export function Layout({children}:React.PropsWithChildren<{}>) {
  const {bonus} = useContext(BonusContext);

  useEffect(() => {
    ReactGA.event({
      category: 'Easter Egg',
      action: 'Toggle Mode',
    })
  }, [bonus])
  return (
    <div className={`App-backdrop`}>
      <main className={`App-container ${bonus ? 'electric-dream' : ''}`}>
        {children}
      </main>
      <AppHeader className='App-header -mb-2' />
    </div>
  )
}

export default { Layout, AppHeader };
