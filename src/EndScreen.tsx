interface EndScreenProps {
    score: number;
    draw: boolean;
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
                <button>New game</button>
            </div>
        </>
    )
}

export default EndScreen