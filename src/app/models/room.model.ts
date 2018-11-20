import { AbstractLocation } from './abstract-location.model';

export class Room extends AbstractLocation {
    constructor(
        id: number,
        name: string,
        private area: number,
        private volume: number,
        private heatingPowerConsumption: number,
        private illuminationPower: number,
    ) {
        super(id, name);
    }
}
