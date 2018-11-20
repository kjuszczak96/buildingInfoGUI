import { AbstractLocation } from './abstract-location.model';

export class Room extends AbstractLocation {
    constructor(
        id: number,
        name: string,
        public area: number,
        public volume: number,
        public heatingPowerConsumption: number,
        public illuminationPower: number,
    ) {
        super(id, name);
    }
}
