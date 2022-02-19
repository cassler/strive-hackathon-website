import { createContext } from "react";

export const BonusContext = createContext<{
  bonus: boolean,
  toggleBonus: Function,
  darkMode: boolean,
  toggle: Function,
}>({
  bonus: false,
  toggleBonus: () => {},
  darkMode: false,
  toggle: () => {}
})

export default BonusContext;
