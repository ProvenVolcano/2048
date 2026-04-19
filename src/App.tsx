import './App.css'
import TileGrid from "./TileGrid.tsx";
import Score from "./Score.tsx";
import StartScreen from "./StartScreen.tsx";
import {useState} from "react";


function App() {
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className="app">
            <h1 className="header">2048</h1>
            {!gameStarted ? (
                <StartScreen onStart={() => setGameStarted(true)} />
            ) : (
                <div className="game-container">
                    <Score score={score}/>
                    <TileGrid setScore={setScore}></TileGrid>
                </div>
            )}
        </div>
    )
}

export default App
