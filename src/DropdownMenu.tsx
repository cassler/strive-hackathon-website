import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import {
  ArchiveIcon, ClipboardCopyIcon, ChevronUpIcon,
} from '@heroicons/react/solid';

interface RenderButtonProps {
  text: string,
  Icon: React.FunctionComponent<{ className: string }>
}
interface RenderButtonPropsWithOnClick extends RenderButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
type MenuTuples = [string, React.FunctionComponent<{ className: string }>];

const defaultItems:MenuTuples[] = [
  ['Timers', ClipboardCopyIcon],
  ['Profile', ArchiveIcon],
  ['Settings', ArchiveIcon],
];

type Props = {
  items?: MenuTuples[]
};

export default function DropdownMenu({ items }: Props) {
  const initialText = 'Launcher';
  const [current, setCurrent] = useState(initialText);

  const list:MenuTuples[] = items || defaultItems;

  const RenderButton = React.memo(({ onClick, text, Icon }:RenderButtonPropsWithOnClick) => {
    function getClass(active:boolean) {
      const textStyle = active ? 'bg-brand-500 text-white' : 'text-gray-900';
      const baseStyle = 'group flex rounded-md items-center w-full px-2 py-2 text-sm';
      return [textStyle, baseStyle].join(' ');
    }
    return (
      <Menu.Item>
        {({ active }) => (
          <button type="button" onClick={onClick} className={getClass(active)}>
            <Icon className="w-5 h-5 mr-2  group-hover:text-white" />
            {text}
          </button>
        )}
      </Menu.Item>
    );
  });

  const MenuButton = React.memo(() => (
    <Menu.Button className="flex ui">
      <div className="flex-1 w-24 text-left">{current}</div>
      <ChevronUpIcon
        className="w-5 h-5 ml-2 mr-1 text-violet-200 hover:text-violet-100 flex-0"
        aria-hidden="true"
      />
    </Menu.Button>
  ));

  return (
    <Menu as="nav" className="relative inline-flex text-left text-gray-900">
      <MenuButton />
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="App-menu-items absolute right-0 bottom-10 origin-bottom-right">
          <div className="px-1 py-1 ">
            {list.slice(0, 2).map(([title, icon]) => (
              <RenderButton onClick={() => setCurrent(title)} text={title} Icon={icon} />
            ))}
          </div>
          <div className="px-1 py-1">
            {list.slice(2).map(([title, icon]) => (
              <RenderButton onClick={() => setCurrent(title)} text={title} Icon={icon} />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
DropdownMenu.defaultProps = {
  items: defaultItems,
};
