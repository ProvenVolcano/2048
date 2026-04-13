import type {Tile as TileType} from './types.ts';
import {Tile} from "./Tile.tsx";
import "./TileGridStyle.css";
import {useState} from "react";
import {useEffect} from "react";

interface TileGridProps {
    setScore: (score: number) => void;
}

function TileGrid(props: TileGridProps) {
    const [values, setValues] = useState<number[][]>([
        [2, 0, 0, 2],
        [0, 2, 4, 0],
        [0, 0, 0, 0],
        [0, 0, 8, 0]
    ]);
    const [score, setScore] = useState(0);
    let nextScore = 0;

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
        setValues(newNumbers);
        setScore(score + nextScore);
        props.setScore(score + nextScore);
    }

    function moveVertical(up: boolean) {
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
        return result;
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [values]);

    return (
        <div className="grid">
            {tiles.map((tile, index) => (
                <Tile key={index} value={tile}/>
            ))}
        </div>
    );
}

export default TileGrid