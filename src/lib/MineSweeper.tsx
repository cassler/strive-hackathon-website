import {
  useContext, useMemo, useState, createContext, useEffect, CSSProperties,
} from 'react';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { BoardContextType, BoardPosition, useMineSweeper } from './useMinesweeper';

export const BoardContext = createContext<BoardContextType>({
  board: [],
  flippedItems: [],
  selectItem: () => {},
});

export function MineSweeper() {
  const ctx = useMineSweeper(12);
  const {
    flippedItems, size, setSize, handleNewGame, board, getGridStyle,
  } = ctx;

  function handleClose() {
    handleNewGame();
  }

  const GameOverScreen = () => (
    <div className="ring-4 ring-red-500 animate-fadeIn transition-all duration-200 bg-white/90 text-center hover:scale-110 rotate-2 rounded-lg drop-shadow-lg text-black w-[320px] p-8 space-y-2">
      <Dialog.Overlay />
      <Dialog.Title className="text-black space-y-2 justify-center">
        <div className="text-xl font-semibold pb-2">Your score</div>
        <div className="text-black text-[64px]">{flippedItems.length}</div>
      </Dialog.Title>
      <p className="text-sm leading-2 pt-8 px-2 text-center">
        You only had
        {' '}
        {board.length - flippedItems.length}
        {' '}
        left to go! There were
        {' '}
        {board.filter((i) => i.bomb).length}
        {' '}
        bombs, and you found one.
        {' '}
        <span className="font-bold">You Lose.</span>
      </p>
      <div title="actions-menu" className="pt-8 flex items-center">
        <button
          type="button"
          className="
          py-2 transition-all hover:scale-110 hover:-translate-y-2
          duration-300 ease-in-out hover:rotate-2
          px-4 ring ring-purple-700"
          onClick={() => handleClose()}
        >
          Good Game

        </button>
        <button
          type="button"
          className="py-2 transition-all hover:scale-110
          hover:-translate-y-2 duration-300
          ease-in-out hover:-rotate-2
          bg-purple-500  ring-purple-700 text-white px-4 ring ml-4"
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
      <div title="toolbar" className="App-header max-w-[100%] w-screen justify-between mt-2 top-0">
        <div title="current-score flex-1 text-4xl">
          {`${flippedItems.length} / ${size * size}`}
        </div>
        <div className="flex-0 flex gap-2 items-center justify-center w-auto">
          <span title="adjust-size" className="text-sm text-white/50 flex-1">Size</span>
          <button title="decrement" type="button" className="ui" disabled={size < 7} onClick={() => setSize(size - 1)}><MinusCircleIcon className="w-5 h-5" /></button>
          <button title="increment" type="button" className="ui" onClick={() => setSize(size + 1)}><PlusCircleIcon className="w-5 h-5" /></button>
          <button title="newgame" onClick={handleNewGame} className="ui" type="button">
            <div>New Game</div>
          </button>
        </div>
      </div>
      <div className="minesweeper-board mb-4 gap-1 sm:gap-2" style={getGridStyle(size)}>
        {board.map((pos, idx) => <Item idx={idx} key={idx.toString()} {...pos} />)}
      </div>
      <Dialog
        open={ctx.status === 'lost'}
        onClose={() => ctx.handleNewGame()}
        className="animate-fadeIn fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-red-500/75"
      >
        <GameOverScreen />
      </Dialog>
    </BoardContext.Provider>
  );
}

export type ItemProps = Partial<BoardPosition> & { idx: number };
export function Item({
  idx, count, bomb, xAxis, yAxis,
}: ItemProps) {
  const { flippedItems, selectItem } = useContext(BoardContext);
  const isOpen = flippedItems.includes(idx);
  const content = bomb ? 'X' : count;

  function handleClick(e:React.MouseEvent) {
    if (e.type === 'contextmenu') {
      e.preventDefault();
    } else {
      selectItem(idx);
    }
  }
  return (
    <button
      title={`x${xAxis}y${yAxis}`}
      className={`ms-item ${isOpen ? 'open' : 'close'} ${bomb ? 'bomb' : `count-${count}`}`}
      type="button"
      onClick={handleClick}
    >
      <span>{isOpen && content}</span>
    </button>
  );
}
