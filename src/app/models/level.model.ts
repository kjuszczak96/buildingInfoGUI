import { Room } from './room.model';

export class Level {
    id: number;
    name: string;
    buildingId: number;
    rooms: Room[];

    constructor(id: number, name: string, buildingId: number) {
        this.id = id;
        this.name = name;
        this.buildingId = buildingId;
        this.rooms = [];
    }
}
