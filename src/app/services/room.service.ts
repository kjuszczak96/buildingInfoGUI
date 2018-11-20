import { Injectable } from '@angular/core';

import { Room } from '../models/room.model';

import { LocationService } from './location.service';

@Injectable()
export class RoomService extends LocationService<Room> {
    endpoint = 'room';
}
