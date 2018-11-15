import { Injectable } from '@angular/core';

import { Building } from './models/building.model';
import { Level } from './models/level.model';

@Injectable()
export class BuildingService {
    private buildings: Building[] = [new Building(1, 'pierwszy'), new Building(2, 'drugi')];

    getBuildings(): Building[] {
        return this.buildings.slice();
    }

    getBuilding(id: number): Building {
        return { ...this.buildings.find(building => building.id === id) };
    }

    findIndex(buildingId): number {
        return this.buildings.map(building => building.id).indexOf(buildingId);
    }

    editBuilding(selectedBuilding: Building, editedBuilding: Building): void {
        const selectedBuildingIndex = this.findIndex(selectedBuilding.id);
        this.buildings[selectedBuildingIndex].id = editedBuilding.id;
        this.buildings[selectedBuildingIndex].name = editedBuilding.name;
    }

    createBuilding(id: number, name: string): void {
        const building = new Building(id, name);
        this.buildings.push(building);
    }

    getLevels(): Level[] {
        const levels = this.buildings.map(building => building.levels);
        return levels.reduce((a, b) => a.concat(b), []);
    }

    getLevel(id: number): Level {
        return { ...this.getLevels().find(level => level.id === id) };
    }

    addLevel(buildingId: number, levelId: number, name: string): void {
        const selectedBuildingIndex = this.buildings
            .map(building => building.id)
            .indexOf(buildingId);
        this.buildings[selectedBuildingIndex].levels.push(new Level(levelId, name, buildingId));
    }

    editLevel(selectedLevel: Level, editedLevel: Level): void {
        const selectedBuildingIndex = this.findIndex(selectedLevel.buildingId);
        const newBuildingIndex = this.findIndex(editedLevel.buildingId);

        const selectedLevelIndex = this.buildings[selectedBuildingIndex].levels
            .map(level => level.id)
            .indexOf(selectedLevel.id);

        if (selectedLevel.buildingId !== editedLevel.buildingId) {
            const newLvl: Level = { ...selectedLevel };
            newLvl.id = editedLevel.id;
            newLvl.name = editedLevel.name;
            newLvl.buildingId = editedLevel.buildingId;
            this.buildings[selectedBuildingIndex].levels.splice(selectedLevelIndex, 1);
            this.buildings[newBuildingIndex].levels.push(newLvl);
        } else {
            this.buildings[selectedBuildingIndex].levels[selectedLevelIndex].id = editedLevel.id;
            this.buildings[selectedBuildingIndex].levels[selectedLevelIndex].name =
                editedLevel.name;
        }
    }
}
