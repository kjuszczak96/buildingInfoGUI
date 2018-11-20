import { Injectable } from '@angular/core';

import { Level } from '../models/level.model';

import { LocationService } from './location.service';

@Injectable()
export class LevelService extends LocationService<Level> {
    endpoint = 'level';
}
