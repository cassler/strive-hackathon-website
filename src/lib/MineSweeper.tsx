import React, {
  useContext, useMemo, useState, createContext, useEffect, CSSProperties, Fragment,
} from 'react';
import { ArrowCircleLeftIcon, FlagIcon, MinusCircleIcon, PlusCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react';
import { BoardContextType, BoardPosition, useMineSweeper } from './useMinesweeper';
import { BonusContext } from './AppContext';
import Animate from './Animate';

export const BoardContext = createContext<BoardContextType>({
  board: [],
  flippedItems: [],
  selectItem: () => {},
});

export function MineSweeper({active = false}: {active: boolean}) {
  const ctx = useMineSweeper(12, 0.14);
  const { bonus, toggleBonus } = useContext(BonusContext);
  const {
    flippedItems, size, setSize, handleNewGame, board, getGridStyle,
  } = ctx;

  function handleClose() {
    handleNewGame();
  }

  const GameOverScreen = () => (

    <div className="transition-all duration-200 bg-white/90 text-center rotate-2 rounded-lg drop-shadow-lg text-black w-[320px] p-8 space-y-2">
      <Dialog.Overlay />
      <Dialog.Title className="text-black space-y-2 justify-center">
        <div className="text-xlfont-semibold">Your score</div>
        <div className="font-bold text-[64px]">{flippedItems.length}</div>
      </Dialog.Title>
      <p className="leading-2 pt-8 text-center font-light">
        Thanks for playing!<br /> Strive Consulting make all kinds of neat things - maybe we can make something for you?
      </p>
      <div title="actions-menu" className="pt-8 flex justify-center items-center">
        <a href='https://striveconsulting.com/contact-us/' target='_blank'>
        <button
          type="button"
          className=" rounded
          py-2 transition-all hover:scale-125 hover:-translate-y-1
          duration-300 ease-in-out hover:rotate-2
          px-4 ring ring-brand-500 bg-brand-500 text-white"
          onClick={() => handleClose()}
        >
          Contact Us
        </button>
        </a>
        <button
          type="button"
          className="py-2 transition-all hover:scale-125 rounded
          hover:-translate-y-1 duration-300
          ease-in-out hover:-rotate-2 text-white
          bg-brand3-500 ring-brand3-500 px-4 ring ml-4"
          onClick={() => handleClose()}
        >
          Play Again
        </button>
      </div>
      <Dialog.Description className="text-center text-xs text-black/50 pt-8">
        Thanks for playing.
      </Dialog.Description>
    </div>
  )

  return (

    <BoardContext.Provider value={ctx}>
      {/* minesweeper toolbar */}
      <Animate show={active} preset="slideDown">
        <div title="toolbar" className="App-header mt-1 top-0">
          <div className='container flex justify-between'>
            {/* scoreboard and back button */}
            <button title="decrement" type="button" className="!px-1 ui !bg-transparent hover:scale-125 transition-all duration-200 text-black/75 !dark:text-white/90 !dark:hover:text-white" onClick={() => toggleBonus(!bonus)} ><ArrowCircleLeftIcon className="w-6 h-6" /></button>
            <button title="current-score flex-0 items-center justify-start text-4xl text-black dark:text-white" onClick={() => toggleBonus(!bonus)} >
              <div className='flex justify-baseline items-center ml-2'>
                <div className='text-2xl sm:text-4xl mr-2 text-left font-bold tracking-tighter'>{ctx.ctx.flippedItems.length} </div>
                <div className='text-xs w-0 overflow-hidden sm:w-auto opacity-75'>of {ctx.size * ctx.size}</div>
              </div>
            </button>
            {/* horizontal spacer */}
            <div className='flex-1' />
            {/* game settings */}
            <div className="flex-0 flex gap-1 items-center justify-center w-auto">
              <span title="adjust-size" className="text-xs opacity-50 flex-1 mr-1 w-0 overflow-hidden sm:w-auto text-black dark:text-white">Size</span>
              <button title="decrement" type="button" className="!px-1 ui !bg-transparent hover:scale-125 transition-all duration-200 text-black/75 !dark:text-white/90 !dark:hover:text-white" disabled={size < 7} onClick={() => setSize(size - 1)}><MinusCircleIcon className="w-6 h-6" /></button>
              <button title="increment" type="button" className="!px-1 ui !bg-transparent hover:scale-125 transition-all duration-200 text-black/75 !dark:text-white/90 !dark:hover:text-white" onClick={() => setSize(size + 1)}><PlusCircleIcon className="w-6 h-6" /></button>
              <button title="newgame" onClick={handleNewGame} className="ui ml-1" type="button">
                <div>New Game</div>
              </button>
            </div>
          </div>
        </div>
      </Animate>
      {/* minesweeper game board */}
      <Animate show={active} preset="slideDownBig">
        <div className="minesweeper-board gap-1 sm:gap-2 pb-48 pt-16" style={getGridStyle(size)}>
          {board.map((pos, idx) => <Item idx={idx} key={idx.toString()} {...pos} />)}
        </div>
      </Animate>
      {/* gameover screen */}
      <Transition
        as={Fragment}
        show={ctx.status === 'lost'}
        enter="transition ease-out duration-500"
        enterFrom="transform opacity-0 scale-0"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-250"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-0"
      >
      <Dialog
        open={ctx.status === 'lost'}
        onClose={() => ctx.handleNewGame()}
        className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
      >
        <GameOverScreen />
      </Dialog>
      </Transition>
    </BoardContext.Provider>

  );
}

export type ItemProps = Partial<BoardPosition> & { idx: number };
export function Item({
  idx, count, bomb, xAxis, yAxis,
}: ItemProps) {
  const { flippedItems, selectItem } = useContext(BoardContext);
  const [flagged, setFlagged] = useState(false);
  const isOpen = flippedItems.includes(idx);

  const content = bomb ? 'X' : count;

  function handleClick(e:React.MouseEvent) {
    if (flagged) return;
    selectItem(idx);
  }
  function handleFlag(e:React.MouseEvent) {
    e.preventDefault();
    if (isOpen) return;
    setFlagged(!flagged)
  }

  useEffect(() => {
    // reset flag locally if the game restarts
    if (flippedItems.length === 0) { setFlagged(false) }
  }, [flippedItems])
  return (
    <button
      title={`x${xAxis}y${yAxis}`}
      className={`ms-item ${isOpen ? 'open' : 'close'} ${flagged ? 'flagged' : ''} ${bomb ? 'bomb' : `count-${count}`}`}
      type="button"
      onContextMenu={handleFlag}
      onClick={handleClick}
    >
      {!isOpen && flagged ? (
        <QuestionMarkCircleIcon className='h-6 w-6'/>
      ) : (
        <span>{isOpen && content}</span>
      )}
    </button>
  );
}
