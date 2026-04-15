import './App.css'
import TileGrid from "./TileGrid.tsx";
import Score from "./Score.tsx";
import {useState} from "react";


function App() {
    const [score, setScore] = useState(0);

    return (
        <>
            <Score score={score}/>
            <TileGrid setScore={setScore}></TileGrid>
        </>
    )
}

export default App
