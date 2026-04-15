interface EndScreenProps {
    score: number;
    draw: boolean;
    restartGame: () => void;
}

function EndScreen(props: EndScreenProps) {
    if (!props.draw) {
        return (<></>);
    }

    return (
        <>
            <div>
                <p>Game Over</p>
                <p>Score: {props.score}</p>
                <button onClick={() => {
                    props.restartGame();
                }}>New game</button>
            </div>
        </>
    )
}

export default EndScreen