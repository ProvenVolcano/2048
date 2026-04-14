import './App.css'
import TileGrid from "./TileGrid.tsx";
import Score from "./Score.tsx";
import {useState} from "react";
import EndScreen from "./EndScreen.tsx";


function App() {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    return (
        <>
            <Score score={score}/>
            <TileGrid setScore={setScore} setGameOver={setGameOver}></TileGrid>
            <EndScreen score={score} draw={gameOver}></EndScreen>
        </>
    )
}

export default App
