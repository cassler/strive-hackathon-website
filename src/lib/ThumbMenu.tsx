import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  ArchiveIcon, ClipboardCopyIcon, ChevronUpIcon, UserIcon, ArrowCircleRightIcon, LogoutIcon, MoonIcon, SunIcon, QuestionMarkCircleIcon, ClockIcon,
} from '@heroicons/react/solid';
import useDarkMode from './useDark';
import { BonusContext } from './AppContext';

interface RenderButtonProps {
  text: string,
  Icon: React.FunctionComponent<{ className: string }>
}
interface RenderButtonPropsWithOnClick extends RenderButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export default function ThumbMenu() {
  const { bonus, toggleBonus, darkMode, toggle } = useContext(BonusContext);
  const { isAuthenticated, logout, loginWithRedirect, user, isLoading } = useAuth0();


  function getClass(active:boolean) {
    const textStyle = active ? 'bg-brand-500 disabled:bg-transparent text-white disabled:text-gray-700/50' : 'text-gray-900';
    const baseStyle = 'group flex rounded-md items-center w-full px-2 py-2 text-sm disabled:text-gray-700/50 focus:text-black';
    return [textStyle, baseStyle].join(' ');
  }

  const RenderButton = React.memo(({ onClick, text, Icon, disabled = false }:RenderButtonPropsWithOnClick) => {
    return (
      <Menu.Item>
        {({ active }) => (
          <button type="button" onClick={onClick} disabled={disabled} className={getClass(active)}>
            <Icon className="w-5 h-5 mr-2" />
            {text}
          </button>
        )}
      </Menu.Item>
    );
  });

  function handleLoginLogout() {
    if (isLoading) return;
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      logout({ returnTo: window.location.origin });

    }
  }

  return (
    <Menu as="nav" className="relative inline-block text-left text-gray-900  w-auto rounded-lg">
      <Menu.Button className="flex ui !outline-none !px-1">
        <span className="flex-1 text-left flex-nowrap pl-1.5 ">
          {isLoading ? 'Loading...' : (
            <div className='text-ellipsis overflow-hidden pr-1 max-w-[126px]'>{`${user?.name ? user.name : 'Guest'}`}</div>
          )}
        </span>
        {isLoading ? (
          <ArrowCircleRightIcon
          className="w-5 h-5  text-black dark:text-white flex-0"
          aria-hidden="true" />
        ) : (
          <ChevronUpIcon
            className="w-5 h-5  text-black dark:text-white flex-0"
            aria-hidden="true"
          />
        )}
      </Menu.Button>
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
            <RenderButton disabled onClick={() => {}} text='Timers' Icon={ClockIcon} />
            <RenderButton disabled={!isAuthenticated} onClick={() => toggleBonus(!bonus)} text='Easter Eggs' Icon={QuestionMarkCircleIcon} />
          </div>
          <div className="px-1 py-1">
            <RenderButton onClick={() => toggle(!darkMode)} text={darkMode ? 'Dark Theme' : 'Light Theme'} Icon={darkMode ? MoonIcon : SunIcon} />
            {isAuthenticated && (
              <RenderButton onClick={() => logout({ returnTo: window.location.origin })} text='Logout' Icon={LogoutIcon} />
            )}
            <RenderButton onClick={handleLoginLogout} text={user?.name ? user.name : 'Login'} Icon={UserIcon} />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
