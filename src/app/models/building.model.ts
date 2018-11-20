import { AbstractLocation } from './abstract-location.model';
import { Level } from './level.model';

export class Building extends AbstractLocation {
    constructor(id: number, name: string, private levels: Level[] = []) {
        super(id, name);
    }
}
