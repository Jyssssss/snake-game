import React, { useState, useEffect } from 'react';
import {
    // randomIntFromInterval,
    // reverseLinkedList,
    useInterval,
} from '../lib/utils.js';

import './Board.css';
import LinkedListNode from '../lib/LinkedListNode';
import LinkedList from '../lib/LinkedList';

const BOARD_SIZE = 10;

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

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
    });

    useInterval(() => {
        moveSnake();
    }, 300);

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
        if (hasBoundary && isOutOfBounds(nextHeadCoords, board)) {
            handleGameOver();
            return;
        }

        const nextHeadCell = board[nextHeadCoords.row][nextHeadCoords.col];

        snake.addFirst(new LinkedListNode({
            row: nextHeadCoords.row,
            col: nextHeadCoords.col,
            cell: nextHeadCell
        }));

        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.delete(snake.tail.value.cell);
        newSnakeCells.add(nextHeadCell);

        snake.tail = snake.tail.next !== null ? snake.tail.next : snake.head;

        setSnakeCells(newSnakeCells);
    }

    const handleGameOver = () => {
        const newSnake = getSnakeStartValue(board);
        setSnake(new LinkedList(newSnake));
        setSnakeCells(new Set([newSnake.cell]));
        setDirection(Direction.RIGHT);
    }

    return (
        <div className="board">{
            board.map((row, rowIdx) => (
                <div key={rowIdx} className="row">{
                    row.map((cellValue, cellIdx) => (
                        <div
                            key={cellIdx}
                            className={`cell ${snakeCells.has(cellValue) ? 'snake-cell' : ''}`}>
                        </div>
                    ))
                }</div>
            ))
        }</div>
    );
};

const createBoard = (boardSize) => {
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

const getDirectionFromKey = key => {
    if (key === 'ArrowUp') return Direction.UP;
    if (key === 'ArrowRight') return Direction.RIGHT;
    if (key === 'ArrowDown') return Direction.DOWN;
    if (key === 'ArrowLeft') return Direction.LEFT;
    return '';
};

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

export default Board;