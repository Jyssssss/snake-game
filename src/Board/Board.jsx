import React, { useState, useEffect } from 'react';
import {
    useInterval,
} from '../lib/utils.js';

import './Board.css';
import LinkedList from '../lib/LinkedList';

const BOARD_SIZE = 15;
const SNAKE_SPEED = 100;
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

const Board = () => {
    const [board, setBoard] = useState(createBoard(BOARD_SIZE));
    const [snake, setSnake] = useState(new LinkedList(getSnakeStartValue(board)));
    const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cell]));
    const [direction, setDirection] = useState(Direction.RIGHT);
    const [hasBoundary, setHasBoundary] = useState(false);
    const [foodCell, setFoodCell] = useState(snake.head.value.cell + INITIAL_FOOD_DISTANCE);
    const [score, setScore] = useState(0);
    const [topScore, setTopScore] = useState(0);

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    useEffect(() => {
        if (score > topScore) {
            setTopScore(score);
        }
    }, [score, topScore])

    useInterval(() => {
        moveSnake();
    }, SNAKE_SPEED);

    const handleKeydown = e => {
        const newDirection = getDirectionFromKey(e.key);
        const isValidDirection = newDirection !== '';
        if (!isValidDirection) return;
        setDirection(newDirection);
    };

    const moveSnake = () => {
        const curHeadCoords = {
            row: snake.head.value.row,
            col: snake.head.value.col
        };

        const nextHeadCoords = getNextCoords(curHeadCoords, direction, board, hasBoundary);
        const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];

        if ((hasBoundary && isOutOfBounds(nextHeadCoords, board)) || snakeCells.has(nextHeadCell)) {
            handleGameOver();
            return;
        }

        snake.addFirst({
            row: nextHeadCoords.row,
            col: nextHeadCoords.col,
            cell: nextHeadCell
        });

        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.add(nextHeadCell);

        if (nextHeadCell !== foodCell) {
            newSnakeCells.delete(snake.tail.value.cell);
            snake.removeLast();
        } else {
            handleFoodConsumtion(newSnakeCells);
        }

        setSnake(snake);
        setSnakeCells(newSnakeCells);
    }

    const handleFoodConsumtion = newSnakeCells => {
        const maxCellValue = BOARD_SIZE * BOARD_SIZE;
        let nextFoodCell = null;
        while (nextFoodCell === null || newSnakeCells.has(nextFoodCell)) {
            nextFoodCell = Math.floor(Math.random() * maxCellValue + 1);
        }
        setFoodCell(nextFoodCell);
        setScore(s => s + 1);
    }

    const handleGameOver = () => {
        const newSnake = getSnakeStartValue(board);
        setSnake(new LinkedList(newSnake));
        setSnakeCells(new Set([newSnake.cell]));
        setDirection(Direction.RIGHT);
        setFoodCell(newSnake.cell + INITIAL_FOOD_DISTANCE)
        setScore(0);
    }

    return (
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
                    <span>Top Score: {topScore}</span>
                </div>
            </div>
        </div>
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
                key === 'ArrowLeft' ? Direction.LEFT : '';

const getOppositeDirection = direction =>
    direction === Direction.UP ? Direction.DOWN :
        direction === Direction.RIGHT ? Direction.LEFT :
            direction === Direction.DOWN ? Direction.UP :
                direction === Direction.LEFT ? Direction.RIGHT : '';

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
}

const isOutOfBounds = (coords, board) => {
    const { row, col } = coords;
    return row < 0 || col < 0 || row >= board.length || col >= board[0].length
};

const getCellClassName = (cellValue, foodCell, snakeCells) =>
    snakeCells.has(cellValue) ? 'cell snake-cell' : cellValue === foodCell ? 'cell food-cell' : 'cell';

export default Board;