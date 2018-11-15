import { Injectable } from '@angular/core';

import { Building } from './models/building.model';
import { Level } from './models/level.model';

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
        this.buildings[selectedBuildingIndex].levels.push(new Level(levelId, name));
    }

    findBuildingWithLevel(selectedLevel): Building {
        return this.buildings.find(building => {
            if (building.levels.find(level => level.id === selectedLevel.id)) {
                return true;
            }
        });
    }

    editLevel(selectedLevel: Level, editedLevel: Level): void {
        const selectedLevelIndex = this.getLevels()
            .map(level => level.id)
            .indexOf(selectedLevel.id);

        const buildingWithLevel = this.findBuildingWithLevel(selectedLevel);

        const selectedBuildingIndex = this.buildings
            .map(building => building.id)
            .indexOf(buildingWithLevel.id);

        this.buildings[selectedBuildingIndex].levels[selectedLevelIndex].id = editedLevel.id;
        this.buildings[selectedBuildingIndex].levels[selectedLevelIndex].name = editedLevel.name;
    }
}
