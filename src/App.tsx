import { useContext, useState } from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { BonusContext } from './lib/AppContext';
import { MineSweeper } from './lib/MineSweeper'
import { Layout } from './lib/Layout'
import './styles/minesweeper.css';
import './styles/tailwind.css'


function App() {
  const [bonus, toggleBonus] = useState(false);
  return (
     <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string || ''}
      clientId={import.meta.env.VITE_AUTH0_CLIENTID as string || ''}
      redirectUri={window.location.origin}
    >
    <BonusContext.Provider value={{bonus, toggleBonus}}>
      <Layout>
        {bonus ? <MineSweeper /> : <CallToAction />}
      </Layout>
    </BonusContext.Provider>
    </Auth0Provider>
  )
}

export default App


function CallToAction() {
  const { bonus, toggleBonus } = useContext(BonusContext);
  return (
    <>
      <button className="text-sm text-white/50 uppercase tracking-widest" type="button" onClick={() => toggleBonus(!bonus)}>June 2022</button>
      <div className="call-to-action">
          The world is your <span className='border-b-8 border-brand-orange'>canvas</span>.
      </div>
    </>
  )
}

