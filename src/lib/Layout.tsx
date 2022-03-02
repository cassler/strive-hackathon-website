import { createRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { useDarkMode } from './useDark';
import ThumbMenu from './ThumbMenu';
import logoUrl from '../assets/logo.png';
import lightLogo from '../assets/logo_light.png';
import { BonusContext } from './AppContext';
import createGlobe from "cobe";
import Animate from './Animate';


export function AppHeader({className = ''}: {className:string}) {
  const { darkMode, toggle } = useContext(BonusContext);
  const [menuOpen, openMenu] = useState(false)

  useEffect(() => {
    setTimeout(() => openMenu(true), 250)
  }, [])


  return (
    <header className={className}>
    <Animate appear={true} show={menuOpen} preset="fade">
      <div className="container flex">
        <div className='flex-0 hover:-translate-y-1 transition-all duration-250'>
        <a href="https://striveconsulting.com/" target="_blank" className="flex pb-1.5 pr-2">
          <div className='flex items-center gap-2 flex-shrink-0'>
          <div><img src={darkMode ? lightLogo : logoUrl} className='h-6 w-6 translate-y-0.5 opacity-90'/></div>
          <div className='flex flex-col items-left text-left justify-center -space-y-2 text-black/75 dark:text-white/90 dark:hover:text-white'>
            <div className='text-2xl font-light'>strive</div>
            {/* <div className='font-semibold text-xs tracking-tighter flex-nowrap whitespace-nowrap'>Innovation Lab</div> */}
          </div>
          </div>
        </a>
        </div>
        <nav className="flex flex-1 justify-end items-center">
          <button onClick={() => toggle(!darkMode)} type="button" className="ui !bg-transparent">
            {darkMode ? <MoonIcon className="w-5 h-5 dark:text-white text-black/90 transition-all duration-250 ease-in-out" /> : <SunIcon className="w-5 h-5  transition-all duration-250 ease-in-outdark:text-white text-black/90" />}
          </button>
          <ThumbMenu />
        </nav>
      </div>
    </Animate>
    </header>
  );
}


export function Layout({children}:React.PropsWithChildren<{}>) {
  const {bonus} = useContext(BonusContext);
  return (
      <div className={`App-backdrop`}>
      <main className={`App-container fixed top-0 bottom-0 left-0 right-0 ${bonus ? 'electric-dream' : ''}`}>
        {children}
      </main>
      <DrawGlobe />

      <AppHeader className='App-header -mb-2' />
    </div>
  )
}

export default { Layout, AppHeader };



function DrawGlobe() {
  const {bonus, toggleBonus, darkMode} = useContext(BonusContext);
  const canvasRef = useRef(null);
  useEffect(() => {
    let phi = 0;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200 * 2,
      height: 1200 * 2,
      phi: 220,
      theta: 0.4,
      dark: true,
      diffuse: 1.5,
      mapSamples: 72000,
      mapBrightness: 1,
      baseColor: [1,1,1],
      markerColor: [1,1,1],
      glowColor: [1,1,1],
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
        phi += 0.00045;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <span
      onClick={() => toggleBonus(!bonus)}
      className={`
        globe
        absolute
        left-0 right-0 bottom-0 top-0 origin-center
        transition-all duration-[1800ms] ease-in-out
        items-center
        justify-center flex w-screen brightness-75
        dark:mix-blend-screen mix-blend-screen
        opacity-25
        ${bonus ? 'pointer-events-none scale-150 translate-y-[75%] brightness-50' : 'scale-75'}
      `}
    >
    <canvas ref={canvasRef} className={`
      w-[1200px] h-[1200px] scale-100 sm:scale-110 md:scale-125
    `} />
  </span>
  )
}
