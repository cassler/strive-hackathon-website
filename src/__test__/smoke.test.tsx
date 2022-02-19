import React from 'react';
import { MineSweeper } from '../lib/MineSweeper';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import '@testing-library/jest-dom/extend-expect'

describe('It loads the test', () => {
  beforeEach(() => {
    let bonus;
    bonus = true;
  })
  it('Renders', () => {
    render(<div data-testid="reset"><MineSweeper active /></div>)
    expect(screen.getByTitle('increment')).toBeTruthy();
    expect(screen.getByTitle('decrement')).toBeTruthy();
    expect(screen.getByTitle('toolbar')).toBeTruthy();
    expect(screen.getByTitle('newgame')).toBeTruthy();
    expect(screen.getByTitle('x4y4')).toBeTruthy();
    expect(screen.getByTitle('x4y9')).toBeTruthy();
  })
})
