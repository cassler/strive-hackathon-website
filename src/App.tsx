import { Fragment, useContext, useState } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { BonusContext } from './lib/AppContext';
import { MineSweeper } from './lib/MineSweeper'
import { Layout } from './lib/Layout'
import './styles/minesweeper.css';
import './styles/tailwind.css'
import { Transition } from '@headlessui/react';
import useDarkMode from './lib/useDark';

function App() {
  const [bonus, toggleBonus] = useState(false);
  const { darkMode, toggle} = useDarkMode();
  return (
     <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string || ''}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID as string || ''}
      redirectUri={window.location.origin}
    >
    <BonusContext.Provider value={{bonus, toggleBonus, darkMode, toggle}}>
      <Layout>
        <div className={`absolute top-32 left-0 right-0 w-screen flex items-center justify-center h-[75%]`}><MineSweeper active={bonus} /></div>
        <Transition
          as={Fragment}
          show={!bonus}
          appear={true}
          enter="transition ease-in duration-500 delay-500"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-700"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-90 translate-y-32"
        >
        <div>
          <button className="text-sm text-white/50 uppercase tracking-widest" type="button" onClick={() => toggleBonus(!bonus)}>June 2022</button>
          <div className="call-to-action">
              The world is your <span className='border-b-8 border-brand3-600'>canvas</span>.
          </div>
        </div>
        </Transition>



      </Layout>
    </BonusContext.Provider>
    </Auth0Provider>
  )
}

export default App
