interface EndScreenProps {
    score: number;
    draw: boolean;
    won: boolean;
    restartGame: () => void;
    continueGame: () => void;
}

function EndScreen(props: EndScreenProps) {
    if (props.won) {
        return (
            <div className="overlay overlay-won">
                <h2>VYHRÁL JSI!</h2>
                <p>Dosáhl jsi dlaždice 2048!</p>
                <p>Finální skóre: {props.score}</p>
                <div className="overlay-buttons">
                    <button className="btn btn-primary" onClick={() => props.restartGame()}>
                        HRÁT ZNOVU
                    </button>
                    <button className="btn btn-primary" onClick={() => props.continueGame()}>
                        POKRAČOVAT VE HŘE
                    </button>
                </div>
            </div>
        )
    }

    if (!props.draw) {
        return (<></>);
    }

    return (
        <div className="overlay overlay-lost">
            <h2>HRA SKONČILA!</h2>
            <p>Vaše finální skóre: {props.score}</p>
            <button className="btn btn-primary" onClick={() => {
                props.restartGame();
            }}>HRÁT ZNOVU</button>
            <p className="small-text">Zkuste to znovu!</p>
        </div>
    )
}

export default EndScreen
