import { AbstractLocation } from './abstract-location.model';
import { Room } from './room.model';

export class Level extends AbstractLocation {
    constructor(id: number, name: string, public rooms: Room[] = []) {
        super(id, name);
    }
}
