import { Injectable } from '@angular/core';

import { Building } from '../models/building.model';

import { LocationService } from './location.service';

@Injectable()
export class BuildingService extends LocationService<Building> {
    endpoint = 'building';
}
