import { useContext, useEffect, useMemo, useRef } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useDarkMode } from './useDark';
import ThumbMenu from './ThumbMenu';
import logoUrl from '../assets/logo.png';
import lightLogo from '../assets/logo_light.png';
import { BonusContext } from './AppContext';
import createGlobe from "cobe";


export function AppHeader({className = ''}: {className:string}) {
  const { darkMode, toggle } = useDarkMode();
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
  const {bonus, toggleBonus} = useContext(BonusContext);
   const canvasRef = useRef(null);
    const { darkMode } = useDarkMode()
  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 220,
      theta: 45,
      dark: false,
      diffuse: 1,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [1, 1, 255],
      markerColor: [0, 0, 0],
      glowColor: [0.5, 0.5, 1],
      markers: [
        // longitude latitude
        { location: [41.8781136, -87.6297982], size: 0.1 },
        { location: [33.753746, -84.386330], size: 0.1 },
        { location: [32.779167, -96.808891], size: 0.1 },
      ],
      onRender: (state:any) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.00025;
      }
    });

    return () => {
      globe.destroy();
    };
  }, [darkMode]);
  return (
    <div className={`App-backdrop`}>
      <button className='flex w-screen -translate-y-32 fixed opacity-25 scale-150' onClick={() => toggleBonus(!bonus)}>
        <canvas ref={canvasRef} className='w-[500px] h-[500px] m-auto scale-100 sm:scale-125 md:scale-150' />
      </button>
      <main className={`App-container ${bonus ? 'electric-dream' : ''}`}>

        {children}
      </main>

      <AppHeader className='App-header -mb-2' />
    </div>
  )
}

export default { Layout, AppHeader };


