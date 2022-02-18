import { CSSProperties, useEffect, useMemo, useState } from 'react';

export type BoardPosition = {
  xAxis: number;
  yAxis: number;
  bomb: boolean;
  count: number,
  neighborIndeces: number[],
};

export type BoardContextType = {
  board: BoardPosition[];
  flippedItems: number[];
  selectItem: Function
};

export interface UseMinesweeperProps {
  initialSize?: number;
  initialDifficulty?: number;
}

export function useMineSweeper(initialSize: number = 14, initialDifficulty: number = 0.10) {
  const [size, setSize] = useState<number>(initialSize);
  const [difficulty, setDifficulty] = useState<number>(initialDifficulty);
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [board, setBoard] = useState<BoardPosition[]>([]);
  const [flippedItems, setFlippedItems] = useState<number[]>([]);
  /**
 * @param idx numerical index of point on board
 * @param axis size of board axis in absolute terms
 * @returns direct neighbors of point on board as numerical indeces.
 */
  function getNeighbors(idx: number, axis: number):number[] {
  // adding or subtracting these values to any index will get the
  // neighboring indices given a square grid.
    const pole = [idx - axis, idx, idx + axis];
    // check if were on the first column and skip if so.
    const left = idx % axis === 0 ? [] : pole.map((x) => x - 1);
    // check if were on the last column and skip if so.
    const right = (idx + 1) % axis === 0 ? [] : pole.map((x) => x + 1);

    // Spread each section into an array
    return [left, right, pole].flat()
    // Then filter to bound values that are within the board
      .filter((i) => i >= 0 && i < axis * axis && i !== idx)
    // Sort them lowest to highest for ease of use.
      .sort((a, b) => a - b);
  }

  function computeBoardValues():BoardPosition[] {
    const axis = Array.from({ length: size }, (_, i) => i);
    const initialBoard = axis.map((x) => axis.map((y) => ({
      xAxis: x,
      yAxis: y,
      bomb: Math.random() < difficulty,
    }))).flat();
    return initialBoard.map((item, idx) => {
      const neighborIndeces = getNeighbors(idx, size);
      const count = neighborIndeces.filter((i) => initialBoard[i].bomb).length;
      return { ...item, count, neighborIndeces };
    });
  }
  function handleNewGame() {
    setFlippedItems([]);
    setBoard(computeBoardValues());
    setStatus('playing');
  }

  function selectItem(idx:number) {
    if (flippedItems.includes(idx)) return;
    const current = board[idx];
    if (current.bomb) {
      setStatus('lost');
      return;
    }
    // this will add the current item to the flippedItems list
    const newFlipList = sortedUnique([...flippedItems, idx])
    setFlippedItems(newFlipList);
  }

  function getGridStyle(s: number):CSSProperties {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${s}, min-content)`,
      gridTemplateRows: `repeat(${s}, min-content)`,
    };
  }

  function sortedUnique<T>(val: T[]): T[] {
    return val.filter((v,i,s) => s.indexOf(v) === i).sort((a:any, b:any) => a - b);
  }

  useEffect(() => handleNewGame(), [size, difficulty]);
  useEffect(() => {
    const next = board
      // get visible 0s
      .filter((i, idx) => i.count === 0 && flippedItems.includes(idx))
      // put their neighbors into a flat array
      // filter neighbors that are already flipped
      .map((i) => i.neighborIndeces).flat()
      .filter((i) => !flippedItems.includes(i));
    // if all visible zeros neighbors are flipped, we're done.
    if (next.length === 0) return;
    // wait 100ms before flipping the next series of neighbors.
    setTimeout(() => {
      // this is where we reveal empty neighbor squares
      const flipSet = sortedUnique([...flippedItems, ...next.flat()])
      setFlippedItems(flipSet);
    }, 75);
  }, [flippedItems]);

  const ctx = useMemo(
    () => ({ board, flippedItems, selectItem }),
    [board, flippedItems, selectItem, size],
  );

  function isItemOpen(idx:number) {
    return ctx.flippedItems.includes(idx);
  }

  return {
    ctx,
    isItemOpen,
    status,
    setStatus,
    flippedItems,
    board,
    size,
    getGridStyle,
    selectItem,
    handleNewGame,
    setSize,
    setDifficulty,
  };
}
