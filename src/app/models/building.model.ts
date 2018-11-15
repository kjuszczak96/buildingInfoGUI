import { Level } from './level.model';

export class Building {
    id: number;
    name: string;
    levels: Level[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.levels = [];
    }
}
