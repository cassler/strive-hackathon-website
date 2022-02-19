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
      enter: "transition ease-out duration-700 delay-250",
      enterFrom: "transform opacity-0 scale-90 -translate-y-32",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-700",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-90 -translate-y-32",
    },
    slideDownBig: {
      enter: "transition ease-in-out duration-1000 delay-500",
      enterFrom: "transform opacity-0 scale-0 -translate-y-[40vh]",
      enterTo: "transform opacity-100 scale-100",
      leave: "transition ease-in duration-500 delay-50",
      leaveFrom: "transform opacity-100 scale-100",
      leaveTo: "transform opacity-0 scale-[5] -translate-y-[300vh]",
    },
    shrinkUnder: {
      enter: "transition ease-out duration-500",
      enterFrom: "transform scale-25 translate-y-0",
      enterTo: "transform scale-150 translate-y-64",
      leave: "transition ease-in-out duration-500",
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
      enter: "transition ease-out duration-700 delay-700",
      enterFrom: "transform opacity-0 translate-y-16",
      enterTo: "transform opacity-100",
      leave: "transition ease-in-out duration-500",
      leaveFrom: "transform opacity-100",
      leaveTo: "transform opacity-0 translate-y-16",
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
