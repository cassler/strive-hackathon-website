import { Transition, TransitionClasses, TransitionEvents } from "@headlessui/react";
import { Fragment } from "react";

// type AnimatePresets<K extends string, T> = {
//   [P in K]: T
// }
type PresetName = 'base' | 'slideDown' | 'slideUp' | 'pop' | 'fade' | 'slideDownBig' | 'shrinkUnder'
type AnimatePresets = Record<PresetName, TransitionClasses>

type Props = React.PropsWithChildren<{
  show: boolean,
  preset?: PresetName,
  unmount?: boolean,
  appear?: boolean
}> & TransitionEvents & TransitionClasses

const presetClasses:TransitionClasses = {
  enter: "transition ease-out duration-500",
  enterFrom: "transform opacity-0 scale-75 -translate-y-64",
  enterTo: "transform opacity-100 scale-100",
  leave: "transition ease-in duration-500",
  leaveFrom: "transform opacity-100 scale-100",
  leaveTo: "transform opacity-0 scale-75 -translate-y-64",
}

Animate.defaultProps = {
  beforeEnter: () => {},
  afterEnter: () => {},
  beforeLeave: () => {},
  afterLeave: () => {}
}

export default function Animate({children, show, unmount = true, appear = false, preset = 'base', ...args}:Props) {

  const presets = {
    base: {
      enter: "transition ease-out duration-500",
      enterFrom: "transform opacity-0 scale-75 -translate-y-64",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-500",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-75 -translate-y-64",
    },
    slideDown: {
      enter: "transition ease-out duration-500",
      enterFrom: "transform opacity-0 scale-90 -translate-y-32",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-500",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-90 -translate-y-32",
    },
    slideDownBig: {
      enter: "transition ease-out duration-500",
      enterFrom: "transform opacity-0 scale-75 -translate-y-64",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-500",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-75 -translate-y-64",
    },
    shrinkUnder: {
      enter: "transition ease-out duration-500",
      enterFrom: "transform scale-75 translate-y-0",
      enterTo: "transform scale-150 translate-y-64",
      leave: "transition ease-in duration-500",
      leaveFrom: "transform scale-150 translate-y-64",
      leaveTo: "transform scale-75 translate-y-0",
    },
    slideUp: {
      ...presetClasses,
    },
    pop: {
      ...presetClasses
    },
    fade: {
      ...presetClasses
    }
  } as AnimatePresets


  return (
    <Transition
        as={Fragment}
        show={show}
        {...presets[preset]}
        {...args}
      >
        {children}
      </Transition>
  )
}


function App() {
  return (
    <Animate show={false}>
      Hello!
    </Animate>
  )
}
