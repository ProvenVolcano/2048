import * as React from "react";
import type {Tile as TileType} from "./types";

interface TileProps{
    value: TileType;
}

export const Tile: React.FC<TileProps> = ({ value }) => {
    const tileClass = value.value === 0
        ? 'tile-empty'
        : value.value <= 2048
            ? `tile-${value.value}`
            : 'tile-super';

    return (
        <div className={`tile ${tileClass}`}>
            {value.value !== 0 ? value.value : null}
        </div>
    )
}