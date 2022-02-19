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
  const { darkMode, toggle } = useDarkMode()
  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 700 * 2,
      height: 700 * 2,
      phi: 220,
      theta: 0.4,
      dark: true,
      diffuse: 0.3,
      mapSamples: 32000,
      mapBrightness: 1,
      baseColor: [1,1,1],
      markerColor: [0.5,0.5,1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [41.8781136, -87.6297982], size: 0.09 },
        { location: [33.753746, -84.386330], size: 0.07 },
        { location: [32.779167, -96.808891], size: 0.05 },
      ],
      onRender: (state:any) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.0003;
      }
    });

    return () => {
      globe.destroy();
    };
  }, [darkMode, toggle]);
  return (
      <div className={`App-backdrop`}>
      <main className={`App-container fixed top-0 bottom-0 left-0 right-0 ${bonus ? 'electric-dream' : ''}`}>
        {children}
      </main>
      <span className={`absolute mix-blend-soft-light opacity-30 bottom-0 left-0 right-0 transition-all duration-1000 items-center justify-center ease-in-out flex w-screen ${bonus ? 'pointer-events-none translate-y-32 scale-150' : '-translate-y-16 scale-100'}`} onClick={() => toggleBonus(!bonus)}>
        <div className={`transition-all duration-1000 ease-in-out ${bonus ? 'scale-110 translate-y-64 sm:translate-y-72 md:translate-y-96' : '-translate-y-16 scale-100'}`}>
          <canvas ref={canvasRef} className='transition-all duration-1000 ease-in-out w-[700px] h-[700px] scale-100 sm:scale-125 md:scale-150' />
        </div>
      </span>
      <AppHeader className='App-header -mb-2' />
    </div>
  )
}

export default { Layout, AppHeader };


