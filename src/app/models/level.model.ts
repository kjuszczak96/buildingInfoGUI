import { Room } from './room.model';

export class Level {
    id: number;
    name: string;
    rooms: Room[];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.rooms = [];
    }
}
