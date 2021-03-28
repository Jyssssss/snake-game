import React, { useState, useEffect, useCallback } from 'react';
import {
    useInterval,
} from '../lib/utils.js';

import './Board.css';
import Snake from './Snake';
import Modal from '../Modal/Modal';

const SNAKE_MIN_SPEED = 1000;
const INITIAL_FOOD_DISTANCE = 5

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

const Board = (props) => {
    const board = createBoard(props.boardSize);
    const [snake, setSnake] = useState(new Snake(getSnakeStartValue(board)));
    const [snakeCells, setSnakeCells] = useState(new Set([snake.getHead().value.cell]));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [foodCell, setFoodCell] = useState(snake.getHead().value.cell + INITIAL_FOOD_DISTANCE);
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

    // Handle keydown event.
    useEffect(() => {
        const handleKeydown = e => {
            // Press Enter to pause or resume.
            if (e.key === 'Enter') {
                setStop(!stop);
                if (isEnd) handleRestart();
                setIsPauseOpen(!isPauseOpen);
            } else if (e.key === 'Escape') {
                props.viewHandler();
            } else if (!stop) {
                const newDirection = getDirectionFromKey(e.key);
                // Ignore the cases
                // 1. input key not arrow directions,
                // 2. or new direction is the opposite of the original one 
                // when the snake's size is more than one.
                if (newDirection === null ||
                    (getOppositeDirection(newDirection) === direction && snakeCells.size > 1))
                    return;
                setDirection(newDirection);
            }
        };

        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    }, [stop, direction, snakeCells.size, isPauseOpen, isEnd, handleRestart, props]);

    // Handle scores
    useEffect(() => {
        if (score > props.topScore) props.topScoreHandler(score);
    }, [score, props]);

    // Handle snake's move.
    useInterval(() => {
        moveSnake();
    }, !stop ? speed : null);

    const moveSnake = () => {
        const curHeadCoords = {
            row: snake.getHead().value.row,
            col: snake.getHead().value.col
        };

        const nextHeadCoords = getNextCoords(curHeadCoords, direction, board, hasBoundary);

        if ((hasBoundary && isOutOfBounds(nextHeadCoords, board)) ||
            snakeCells.has(board[nextHeadCoords.row][nextHeadCoords.col])) {
            handleGameOver();
            return;
        }
        const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];

        snake.addHead({
            row: nextHeadCoords.row,
            col: nextHeadCoords.col,
            cell: nextHeadCell
        });

        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.add(nextHeadCell);

        if (nextHeadCell !== foodCell) {
            newSnakeCells.delete(snake.getTail().value.cell);
            snake.removeTail();
        } else {
            handleFoodConsumption(newSnakeCells);
        }

        setSnake(snake);
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
                                className={getCellClassName(cellValue, foodCell, snakeCells)}>
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
                    <h3>Press ENTER to resume.</h3>
                    <h3>Press ESC to End.</h3>
                    <br></br>
                </div>
            </Modal>
        </>
    );
};

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

const getDirectionFromKey = key =>
    key === 'ArrowUp' ? Direction.UP :
        key === 'ArrowRight' ? Direction.RIGHT :
            key === 'ArrowDown' ? Direction.DOWN :
                key === 'ArrowLeft' ? Direction.LEFT : null;

const getOppositeDirection = direction =>
    direction === Direction.UP ? Direction.DOWN :
        direction === Direction.RIGHT ? Direction.LEFT :
            direction === Direction.DOWN ? Direction.UP :
                direction === Direction.LEFT ? Direction.RIGHT : null;

const getNextCoords = (coords, direction, board, hasBoundary) => {
    const newCoords = direction === Direction.UP ? {
        row: coords.row - 1,
        col: coords.col
    } : direction === Direction.RIGHT ? {
        row: coords.row,
        col: coords.col + 1
    } : direction === Direction.DOWN ? {
        row: coords.row + 1,
        col: coords.col
    } : direction === Direction.LEFT ? {
        row: coords.row,
        col: coords.col - 1
    } : {
        row: coords.row,
        col: coords.col
    };
    return hasBoundary ? newCoords : {
        row: newCoords.row < 0 ? board.length - 1 : newCoords.row >= board.length ? 0 : newCoords.row,
        col: newCoords.col < 0 ? board[0].length - 1 : newCoords.col >= board[0].length ? 0 : newCoords.col
    };
};

const isOutOfBounds = (coords, board) => {
    const { row, col } = coords;
    return row < 0 || col < 0 || row >= board.length || col >= board[0].length
};

const getCellClassName = (cellValue, foodCell, snakeCells) =>
    snakeCells.has(cellValue) ? 'cell snake-cell' : cellValue === foodCell ? 'cell food-cell' : 'cell';

export default Board;