interface ScoreProps {
    score: number;
}

function Score(props: ScoreProps) {

    return (
        <>
            <div>
                {props.score}
            </div>
        </>
    )
}

export default Score