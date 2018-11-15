import { Injectable } from '@angular/core';

import { Building } from './models/building.model';
import { Level } from './models/level.model';
import { Room } from './models/room.model';

@Injectable()
export class BuildingService {
    private buildings: Building[] = [new Building(1, 'pierwszy'), new Building(2, 'drugi')];

    getBuildings(): Building[] {
        return this.buildings.slice();
    }

    getBuilding(id: number): Building {
        return { ...this.buildings.find(building => building.id === id) };
    }

    findBuildingIndex(buildingId): number {
        return this.buildings.map(building => building.id).indexOf(buildingId);
    }

    editBuilding(selectedBuilding: Building, editedBuilding: Building): void {
        const selectedBuildingIndex = this.findBuildingIndex(selectedBuilding.id);
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

    findLevelIndex(buildingIndex, levelId): number {
        return this.buildings[buildingIndex].levels.map(level => level.id).indexOf(levelId);
    }

    addLevel(buildingId: number, levelId: number, name: string): void {
        const selectedBuildingIndex = this.findBuildingIndex(buildingId);
        this.buildings[selectedBuildingIndex].levels.push(new Level(levelId, name, buildingId));
    }

    editLevel(selectedLevel: Level, editedLevel: Level): void {
        const selectedBuildingIndex = this.findBuildingIndex(selectedLevel.buildingId);
        const newBuildingIndex = this.findBuildingIndex(editedLevel.buildingId);
        const selectedLevelIndex = this.findLevelIndex(selectedBuildingIndex, selectedLevel.id);

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

    getRooms(): Room[] {
        const rooms = this.getLevels().map(level => level.rooms);
        return rooms.reduce((a, b) => a.concat(b), []);
    }

    getRoom(id: number): Room {
        return this.getRooms().find(room => room.id === id);
    }

    addRoom(
        id: number,
        name: string,
        area: number,
        volume: number,
        heatingPowerConsumption: number,
        illuminationPower: number,
        levelId: number,
    ): void {
        const building = this.getLevels().find(level => level.id === levelId).buildingId;
        const buildingIndex = this.findBuildingIndex(building);
        const levelIndex = this.findLevelIndex(buildingIndex, levelId);

        this.buildings[buildingIndex].levels[levelIndex].rooms.push(
            new Room(id, name, area, volume, heatingPowerConsumption, illuminationPower, levelId),
        );
    }

    editRoom(selectedRoom: Room, editedRoom: Room): void {
        const building = this.getLevels().find(level => level.id === selectedRoom.levelId)
            .buildingId;
        const buildingIndex = this.findBuildingIndex(building);
        const levelIndex = this.findLevelIndex(buildingIndex, selectedRoom.levelId);
        const newlevelIndex = this.findLevelIndex(buildingIndex, editedRoom.levelId);
        const roomIndex = this.buildings[buildingIndex].levels[levelIndex].rooms
            .map(room => room.id)
            .indexOf(selectedRoom.id);

        if (selectedRoom.levelId !== editedRoom.levelId) {
            const roomCopy: Room = { ...editedRoom };
            this.buildings[buildingIndex].levels[levelIndex].rooms.splice(roomIndex, 1);
            this.buildings[buildingIndex].levels[newlevelIndex].rooms.push(roomCopy);
        } else {
            this.buildings[buildingIndex].levels[levelIndex].rooms[roomIndex] = editedRoom;
        }
    }
}
