// Referenced from https://github.com/clementmihailescu/Snake-Game-Reverse-LL-Tutorial

import React, { useState, useEffect, useCallback } from 'react';
import {
    useInterval,
} from '../lib/utils.js';

import './Board.css';
import Snake from './Snake';
import Modal from '../Modal/Modal';

const SNAKE_MIN_SPEED = 1000;
const INITIAL_FOOD_DISTANCE = 5

const PAUSE_KEY = 'Enter';
const END_KEY = 'Escape';
const UP_KEY = 'ArrowUp';
const RIGHT_KEY = 'ArrowRight';
const DOWN_KEY = 'ArrowDown';
const LEFT_KEY = 'ArrowLeft';

const Direction = {
    UP: 'UP',
    RIGHT: 'RIGHT',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
};

const getSnakeStartValue = board => {
    const rowSize = board.length;
    const colSize = board[0].length;
    const startRow = Math.round(rowSize / 3);
    const startCol = Math.round(colSize / 3);
    const startCell = board[startRow][startCol];
    return {
        row: startRow,
        col: startCol,
        cell: startCell,
    };
};

const getDirectionFromKey = key =>
    key === UP_KEY ? Direction.UP :
        key === RIGHT_KEY ? Direction.RIGHT :
            key === DOWN_KEY ? Direction.DOWN :
                key === LEFT_KEY ? Direction.LEFT : null;

const createBoard = boardSize => {
    let counter = 1;
    const board = [];
    for (let row = 0; row < boardSize; row++) {
        const currentRow = [];
        for (let col = 0; col < boardSize; col++) {
            currentRow.push(counter++);
        }
        board.push(currentRow);
    }
    return board
}

const Board = (props) => {
    const board = createBoard(props.boardSize);
    const [snake, setSnake] = useState(new Snake(getSnakeStartValue(board)));
    const [snakeCells, setSnakeCells] = useState(new Set([snake.getHead().cell]));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [foodCell, setFoodCell] = useState(snake.getHead().cell + INITIAL_FOOD_DISTANCE);
    const [score, setScore] = useState(0);
    const [stop, setStop] = useState(false);
    const [speed,] = useState(Math.max(SNAKE_MIN_SPEED - (props.speed - 1) * 50, 10));
    const [hasBoundary,] = useState(props.hasWall);
    const [isPauseOpen, setIsPauseOpen] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    const handleRestart = useCallback(() => {
        const newSnake = getSnakeStartValue(board);
        setSnake(new Snake(newSnake));
        setSnakeCells(new Set([newSnake.cell]));
        setDirection(Direction.RIGHT);
        setFoodCell(newSnake.cell + INITIAL_FOOD_DISTANCE)
        setScore(0);
    }, [board]);

    const getNextCoords = useCallback((dir) => {
        const newCoords = dir === Direction.UP ? {
            row: snake.getHead().row - 1,
            col: snake.getHead().col
        } : dir === Direction.RIGHT ? {
            row: snake.getHead().row,
            col: snake.getHead().col + 1
        } : dir === Direction.DOWN ? {
            row: snake.getHead().row + 1,
            col: snake.getHead().col
        } : dir === Direction.LEFT ? {
            row: snake.getHead().row,
            col: snake.getHead().col - 1
        } : {
            row: snake.getHead().row,
            col: snake.getHead().col
        };
        return hasBoundary ? newCoords : {
            row: newCoords.row < 0 ? board.length - 1 : newCoords.row >= board.length ? 0 : newCoords.row,
            col: newCoords.col < 0 ? board[0].length - 1 : newCoords.col >= board[0].length ? 0 : newCoords.col
        };
    }, [snake, board, hasBoundary]);

    const isOutOfBounds = useCallback((coords) => {
        const { row, col } = coords;
        return row < 0 || col < 0 || row >= board.length || col >= board[0].length
    }, [board]);

    const getCellClassName = useCallback((cellValue) =>
        snakeCells.has(cellValue) ? 'cell snake-cell' :
            cellValue === foodCell ? 'cell food-cell' :
                'cell', [foodCell, snakeCells]);

    // Handle keydown event.
    useEffect(() => {
        const handleKeydown = e => {
            // Press Enter to pause or resume.
            if (e.key === PAUSE_KEY) {
                setStop(!stop);
                if (isEnd) handleRestart();
                setIsPauseOpen(!isPauseOpen);
            } else if (e.key === END_KEY) {
                props.viewHandler();
            } else if (!stop) {
                const newDirection = getDirectionFromKey(e.key);
                // Ignore the cases
                // 1. input key not arrow directions, or
                // 2. the next cell is the same as the cell one after the haed 
                // when the snake's size is greater than one.
                if (newDirection === null) return;

                const nextHeadCoords = getNextCoords(newDirection);
                if (!isOutOfBounds(nextHeadCoords) &&
                    snake.length > 1 &&
                    snake[snake.length - 2].cell === board[nextHeadCoords.row][nextHeadCoords.col]) {
                    return;
                }

                setDirection(newDirection);
            }
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [board, snake, stop, direction, snakeCells.size, isPauseOpen, isEnd,
        handleRestart, getNextCoords, isOutOfBounds, props]);

    // Handle scores
    useEffect(() => {
        if (score > props.topScore) props.topScoreHandler(score);
    }, [score, props]);

    // Handle snake's move.
    useInterval(() => {
        moveSnake();
    }, !stop ? speed : null);

    const moveSnake = () => {
        const nextHeadCoords = getNextCoords(direction);

        if (isOutOfBounds(nextHeadCoords) ||
            snakeCells.has(board[nextHeadCoords.row][nextHeadCoords.col])) {
            handleGameOver();
            return;
        }
        const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];
        const newSnake = new Snake(...snake);

        newSnake.addHead({
            row: nextHeadCoords.row,
            col: nextHeadCoords.col,
            cell: nextHeadCell
        });

        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.add(nextHeadCell);

        if (nextHeadCell !== foodCell) {
            newSnakeCells.delete(snake.getTail().cell);
            newSnake.removeTail();
        } else {
            handleFoodConsumption(newSnakeCells);
        }

        setSnake(newSnake);
        setSnakeCells(newSnakeCells);
    };

    const handleFoodConsumption = newSnakeCells => {
        const maxCellValue = props.boardSize ** 2;
        let nextFoodCell = null;
        while (nextFoodCell === null || newSnakeCells.has(nextFoodCell)) {
            nextFoodCell = Math.floor(Math.random() * maxCellValue + 1);
        }
        setFoodCell(nextFoodCell);
        setScore(s => s + 1);
    };

    const handleGameOver = () => {
        setStop(true);
        setIsEnd(true);
        setIsPauseOpen(true);
    }

    return (
        <>
            <div className="board">{
                board.map((row, rowIdx) => (
                    <div key={rowIdx} className="row">{
                        row.map((cellValue, cellIdx) => (
                            <div
                                key={cellIdx}
                                className={getCellClassName(cellValue)}>
                            </div>
                        ))
                    }</div>
                ))
            }
                <div className="score-row">
                    <div className="score-cell">
                        <span>Score: {score}</span>
                    </div>
                    <div className="score-cell">
                        <span>Top Score: {props.topScore}</span>
                    </div>
                </div>
            </div>
            <Modal isOpen={isPauseOpen}>
                <div>
                    <br></br>
                    {isEnd && <h3>Your score: {score}</h3>}
                    <h3>Press ENTER to Resume.</h3>
                    <h3>Press ESC to End.</h3>
                    <br></br>
                </div>
            </Modal>
        </>
    );
};

export default Board;