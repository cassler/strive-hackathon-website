import { createContext } from "react";

export const BonusContext = createContext<{
  bonus: boolean,
  toggleBonus: Function
}>({
  bonus: false,
  toggleBonus: () => {}
})

export default BonusContext;
