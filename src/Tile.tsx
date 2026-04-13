import * as React from "react";
import type {Tile as TileType} from "./types.ts";

interface TileProps{
    value: TileType;
}

export const Tile: React.FC<TileProps> = ({ value }) => {

    return (
        <>
            <div>
                {value.value}
            </div>
        </>
    )
}

