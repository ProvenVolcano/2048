import {useEffect, useState} from "react";

interface ScoreProps {
    score: number;
}

function Score(props: ScoreProps) {
    const [bestScore, setBestScore] = useState<number>(() => {
        const saved = localStorage.getItem('bestScore');
        return saved ? Number(saved) : 0;
    });

    useEffect(() => {
        if (props.score > bestScore) {
            setBestScore(props.score);
            localStorage.setItem('bestScore', String(props.score));
        }
    }, [props.score, bestScore]);

    return (
        <div className="score-bar">
            <div className="score">SKÓRE: {props.score}</div>
            <div className="best">NEJLEPŠÍ: {bestScore}</div>
        </div>
    )
}

export default Score
