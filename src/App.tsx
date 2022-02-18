import { Auth0Provider } from '@auth0/auth0-react'
import React, { createContext, useState } from 'react'
import { Layout } from './lib/Layout'
import { tagline } from '../package.json';
import { MineSweeper } from './lib/MineSweeper'
import './styles/minesweeper.css';
import './styles/tailwind.css'

export const BonusContext = createContext<{
  bonus: boolean,
  toggleBonus: Function
}>({
  bonus: false,
  toggleBonus: () => {}
})

function App() {
  const [bonus, toggleBonus] = useState(false);
  return (
     <Auth0Provider
      domain="cassler.auth0.com"
      clientId={import.meta.env.VITE_AUTH0_CLIENTID as string}
      redirectUri={window.location.origin}
    >
    <BonusContext.Provider value={{bonus, toggleBonus}}>
      <Layout>
        <button className="text-sm text-white/50 uppercase tracking-widest" type="button" onClick={() => toggleBonus(!bonus)}>June 2022</button>
        {bonus ? <MineSweeper /> : <CallToAction />}
      </Layout>
    </BonusContext.Provider>
    </Auth0Provider>
  )
}

export default App


function CallToAction({children}:React.PropsWithChildren<{}>) {
  return (
    <div className="call-to-action">
         The world is your <span className='border-b-8 border-brand-orange'>canvas</span>.
    </div>
  )
}

