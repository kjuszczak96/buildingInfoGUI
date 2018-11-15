import { Injectable } from '@angular/core';

import { Building } from './models/building.model';

@Injectable()
export class BuildingService {
    private buildings: Building[] = [];

    getBuildings(): Building[] {
        return this.buildings.slice();
    }

    getBuilding(id: number): Building {
        return { ...this.buildings.find(building => building.id === id) };
    }

    editBuilding(selectedBuilding: Building, editedBuilding: Building): void {
        const selectedBuildingIndex = this.buildings
            .map(building => building.id)
            .indexOf(selectedBuilding.id);
        this.buildings[selectedBuildingIndex].id = editedBuilding.id;
        this.buildings[selectedBuildingIndex].name = editedBuilding.name;
    }

    createBuilding(id: number, name: string): void {
        const building = new Building(id, name);
        this.buildings.push(building);
    }
}
