import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Level } from 'src/app/models/level.model';
import { LevelService } from 'src/app/services/level.service';

import { AddLevelComponent } from '../../add-level/add-level.component';
import { LocationViewComponent } from '../location-view.component';

@Component({
    selector: 'binfo-level-view',
    templateUrl: './level-view.component.html',
    styleUrls: ['../location-view.component.scss'],
})
export class LevelViewComponent extends LocationViewComponent<Level, LevelService> {
    constructor(public dialog: MatDialog, public locationService: LevelService) {
        super(dialog, locationService);
    }
    openDialog(level: Level): void {
        this.dialog.open(
            AddLevelComponent,
            level
                ? { data: level, width: '20rem' }
                : {
                      width: '20rem',
                  },
        );
    }
}
