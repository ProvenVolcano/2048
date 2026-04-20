import type {Tile as TileType} from './types';
import {Tile} from "./Tile.tsx";
import "./TileGridStyle.css";
import {useState} from "react";
import {useEffect} from "react";
import EndScreen from "./EndScreen.tsx";

interface TileGridProps {
    setScore: (score: number) => void;
}

function TileGrid(props: TileGridProps) {
    let canSpawnNew = false;
    function initializeNumbers(){
        let grid = Array.from({ length: 4 }, () => Array(4).fill(0));
        grid = addNewTiles(grid);
        grid = addNewTiles(grid);
        return grid;
    }

    const [values, setValues] = useState<number[][]>(initializeNumbers());
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [continuedAfterWin, setContinuedAfterWin] = useState(false);
    let nextScore = 0;

    const resetGame = () => {
        setValues(initializeNumbers());
        setScore(0);
        setGameOver(false);
        setWon(false);
        setContinuedAfterWin(false);
        props.setScore(0)
    };

    const continueGame = () => {
        setWon(false);
        setContinuedAfterWin(true);
    };

    function hasWon(tiles: number[][]) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (tiles[i][j] >= 2048) return true;
            }
        }
        return false;
    }

    function valuesToTiles(newVals: number[][]) {
        const temp: TileType[] = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                temp.push({
                    posX: j,
                    posY: i,
                    value: newVals[i][j]
                })

            }
        }
        return temp;
    }

    function isGameOver(tiles: number[][]) {
        let gameOver = true;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (tiles[i][j] === 0) return false;
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (tiles[i][j] == tiles[i][j+1]) {
                    gameOver = false;
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                if (tiles[j][i] == tiles[j + 1][i]) {
                    gameOver = false;
                }
            }
        }
        return gameOver;
    }

    const tiles = valuesToTiles(values);

    const handleKeyPress = (event: KeyboardEvent) => {
        let newNumbers: number[][];
        switch (event.key) {
            case 'ArrowUp':
                newNumbers = moveVertical(true);
                break;
            case 'ArrowDown':
                newNumbers = moveVertical(false);
                break;
            case 'ArrowLeft':
                newNumbers = moveHorizontal(true);
                break;
            case 'ArrowRight':
                newNumbers = moveHorizontal(false);
                break;
            default:
                return;
        }
        newNumbers = addNewTiles(newNumbers)
        setValues(newNumbers)
        setGameOver(isGameOver(newNumbers) && !canSpawnNew);
        if (!continuedAfterWin && hasWon(newNumbers)) {
            setWon(true);
        }
        setScore(score + nextScore);
        props.setScore(score + nextScore);
    }

    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);

// Minimální vzdálenost v pixelech, aby se pohyb počítal jako swipe
    const minSwipeDistance = 40;

    const onTouchStart = (e: React.TouchEvent) => {
        console.log("t start")
        setTouchStart({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
        });
    };

    const onTouchEnd = (e: React.TouchEvent) => {

        if (!touchStart) return;


        const touchEndClientX = e.changedTouches[0].clientX;
        const touchEndClientY = e.changedTouches[0].clientY;

        const distanceX = touchEndClientX - touchStart.x;
        const distanceY = touchEndClientY - touchStart.y;
        let newNumbers: number[][] = [];
        // Zjistíme, jestli byl pohyb spíše horizontální nebo vertikální
        if (Math.abs(distanceX) > Math.abs(distanceY)) {

            // Horizontální swipe
            if (Math.abs(distanceX) > minSwipeDistance) {
                if (distanceX > 0) {
                    console.log("move right")
                    newNumbers = moveHorizontal(false); // Swipe doprava
                } else {
                    console.log("move left")
                    newNumbers = moveHorizontal(true);  // Swipe doleva
                }
            }
        } else {

            // Vertikální swipe
            if (Math.abs(distanceY) > minSwipeDistance) {
                if (distanceY > 0) {
                    console.log("move down")
                    newNumbers = moveVertical(false); // Swipe dolů
                } else {
                    console.log("move up")
                    newNumbers = moveVertical(true);  // Swipe nahoru
                }
            }
        }

        setTouchStart(null); // Resetujeme počáteční pozici
        newNumbers = addNewTiles(newNumbers)
        setValues(newNumbers)
        setGameOver(isGameOver(newNumbers) && !canSpawnNew);
        if (!continuedAfterWin && hasWon(newNumbers)) {
            setWon(true);
        }
        setScore(score + nextScore);
        props.setScore(score + nextScore);
    };

    function moveVertical(up: boolean) {
        console.log("move vertical")
        const temp = values.map(row => [...row]);
        for (let i = 0; i < 4; i++) {
            const line: number[] = [];
            for (let j = 0; j < 4; j++) {
                line.push(temp[j][i])
            }
            let slided: number[];
            if (up) {
                slided = slideLine(line)
            } else slided = slideLine([...line].reverse()).reverse();

            for (let j = 0; j < 4; j++) {
                temp[j][i] = slided[j];
            }
        }
        return temp;
    }

    function moveHorizontal(left: boolean) {
        const temp = values.map(row => [...row]);
        for (let i = 0; i < 4; i++) {
            if (left) {
                temp[i] = slideLine(temp[i]);
            } else temp[i] = slideLine([...temp[i]].reverse()).reverse();
        }
        return temp;
    }

    function slideLine(line: number[]) {
        const noZero: number[] = [];
        const result: number[] = [];
        for (let i = 0; i < line.length; i++) {
            if (line[i] != 0) {
                noZero.push(line[i]);
            }
        }
        for (let i = 0; i < noZero.length; i++) {
            if (noZero[i] == noZero[i + 1]) {
                result.push(noZero[i] * 2);
                nextScore += noZero[i] * 2;
                i++;
            } else {
                result.push(noZero[i]);
            }
        }
        while (result.length < 4) {
            result.push(0);
        }
        for (let i = 0; i < 4; i++) {
            if (line[i] != result[i]) {
                canSpawnNew = true;
            }
        }
        return result;
    }

    function addNewTiles(tiles: number[][]) {

        const zeroTiles = []
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (tiles[i][j] == 0) {
                    zeroTiles.push({y: i, x: j});
                }
            }
        }

        if (zeroTiles.length == 0) {
            return tiles;
        }

        const index = Math.floor(Math.random() * zeroTiles.length);
        const newTiles = tiles.map(row => [...row]);
        newTiles[zeroTiles[index].y][zeroTiles[index].x] = Math.random() < 0.9 ? 2 : 4;
        return newTiles;
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [values]);

    return (
        <>
            <div className="grid" onTouchStart={onTouchStart}
                 onTouchEnd={onTouchEnd}
                 style={{ touchAction: 'none' }}>

                {tiles.map((tile, index) => (
                    <Tile key={index} value={tile}/>
                ))}
            </div>
            <EndScreen score={score} draw={gameOver} won={won} restartGame={resetGame} continueGame={continueGame}></EndScreen>
        </>
    );
}

export default TileGrid