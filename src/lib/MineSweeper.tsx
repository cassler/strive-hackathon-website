import React, {
  useContext, useMemo, useState, createContext, useEffect, CSSProperties,
} from 'react';
import { FlagIcon, MinusCircleIcon, PlusCircleIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';
import { BoardContextType, BoardPosition, useMineSweeper } from './useMinesweeper';
import { BonusContext } from './AppContext';

export const BoardContext = createContext<BoardContextType>({
  board: [],
  flippedItems: [],
  selectItem: () => {},
});

export function MineSweeper() {
  const ctx = useMineSweeper(12);
  const { bonus, toggleBonus } = useContext(BonusContext);
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
      <div title="toolbar" className="App-header mt-1 top-0">
        <div className='container flex justify-between'>
          <button title="current-score flex-1 items-center justify-center text-4xl text-black dark:text-white" onClick={() => toggleBonus(!bonus)} >
            <div className='flex justify-baseline items-center'>
              <div className='text-2xl sm:text-4xl w-[72px] text-left font-bold tracking-tighter'>{ctx.ctx.flippedItems.length} </div>
              <div className='text-xs w-0 overflow-hidden sm:w-auto opacity-75'>of {ctx.size * ctx.size}</div>
            </div>
          </button>

          <div className="flex-0 flex gap-1 items-center justify-center w-auto">
            <span title="adjust-size" className="text-sm text-white/75  flex-1 mr-1 w-0 overflow-hidden sm:w-auto">Size</span>
            <button title="decrement" type="button" className="!px-1 ui !bg-transparent hover:scale-125 transition-all duration-200" disabled={size < 7} onClick={() => setSize(size - 1)}><MinusCircleIcon className="w-6 h-6" /></button>
            <button title="increment" type="button" className="!px-1 ui !bg-transparent hover:scale-125 transition-all duration-200" onClick={() => setSize(size + 1)}><PlusCircleIcon className="w-6 h-6" /></button>
            <button title="newgame" onClick={handleNewGame} className="ui ml-1" type="button">
              <div>New Game</div>
            </button>
          </div>
        </div>
      </div>
      <div className="minesweeper-board gap-1 -translate-y-8 sm:-translate-y-0 sm:gap-2" style={getGridStyle(size)}>
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
