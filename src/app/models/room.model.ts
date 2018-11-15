export class Room {
    id: number;
    name: string;
    area: number;
    volume: number;
    heatingPowerConsumption: number;
    illuminationPower: number;
    constructor(
        id: number,
        name: string,
        area: number,
        volume: number,
        heatingPowerConsumption: number,
        illuminationPower: number,
    ) {
        this.id = id;
        this.name = name;
        this.area = area;
        this.volume = volume;
        this.heatingPowerConsumption = heatingPowerConsumption;
        this.illuminationPower = illuminationPower;
    }
}
