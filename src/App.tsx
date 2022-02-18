import { Auth0Provider } from '@auth0/auth0-react'
import { createContext, useState } from 'react'
import { AppHeader } from './lib/Layout'
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
  const [count, setCount] = useState(0)
  const [bonus, toggleBonus] = useState(false);
  return (
     <Auth0Provider
      domain="cassler.auth0.com"
      clientId={import.meta.env.VITE_AUTH0_CLIENTID as string}
      redirectUri={window.location.origin}
    >
    <BonusContext.Provider value={{bonus, toggleBonus}}>
    <div className="min-h-screen dark:from-brand-300 dark:to-brand-900 from-brand-400 to-brand-100 bg-gradient-to-bl transition-all duration-250">
      <AppHeader />
      <main className="border-blue-500 border-8 justify-center items-center text-center min-h-screen flex flex-col">
        <button className="text-sm mb-12 text-white/50 uppercase tracking-widest" type="button" onClick={() => toggleBonus(!bonus)}>June 2022</button>
          {bonus ? (
            <MineSweeper />
          ) : (
            <div className="transition-all duration-500 text-[40px] leading-[36px] sm:text-[72px] sm:leading-[60px] lg:text-[96px] lg:leading-[72px] max-w-md tracking-tighter font-serif text-center">The world is your canvas.</div>
          )}
      </main>
    </div>
    </BonusContext.Provider>
    </Auth0Provider>
  )
}

export default App
