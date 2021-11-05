export interface ColData {
    start: string;
    end: string;
}

export interface SlotData {
    title: string;
    row: number;
    col: number;
}

export interface TableData {
    id?: string;
    name?: string;
    numrows?: number;
    numcols?: number;
    rows: string[];
    cols: colData[];
    slots: slotData[];
}
