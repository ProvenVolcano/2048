import {useState} from "react";

interface StartScreenProps {
    onStart: () => void;
}

function StartScreen(props: StartScreenProps) {
    const [bestScore] = useState<number>(() => {
        const saved = localStorage.getItem('bestScore');
        return saved ? Number(saved) : 0;
    });

    return (
        <div className="screen start-screen">
            <h1 className="title-large">2048</h1>
            <button className="btn btn-primary" onClick={props.onStart}>
                NOVÁ HRA
            </button>
            <div className="best-score-display">
                <p className="best-label">NEJLEPŠÍ SKÓRE</p>
                <p className="best-value">♛ {bestScore}</p>
            </div>
            <div className="footer-links">O HŘE &nbsp;/&nbsp; JAK HRÁT</div>
        </div>
    )
}

export default StartScreen
