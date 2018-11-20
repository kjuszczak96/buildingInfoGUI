import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Building } from 'src/app/models/building.model';
import { Level } from 'src/app/models/level.model';
import { BuildingService } from 'src/app/services';
import { LevelService } from 'src/app/services/level.service';
import { existingIdValidator } from 'src/app/validators/add-location-validator';

@Component({
    selector: 'binfo-add-level',
    templateUrl: './add-level.component.html',
})
export class AddLevelComponent implements OnDestroy, OnInit {
    levelForm: FormGroup;
    buildings$: Observable<Building[]>;

    constructor(
        public dialogRef: MatDialogRef<AddLevelComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Level,
        public levelService: LevelService,
        public buildingService: BuildingService,
        private fb: FormBuilder,
    ) {
        this.levelForm = !this.data
            ? this.fb.group({
                  name: ['', Validators.required],
                  id: ['', [Validators.required], [existingIdValidator(this.levelService)]],
                  buildingId: ['', [Validators.required]],
              })
            : this.fb.group({
                  name: [this.data.name, Validators.required],
                  id: [
                      this.data.id,
                      [Validators.required],
                      [existingIdValidator(this.levelService, this.data.id)],
                  ],
                  buildingId: ['', [Validators.required]],
              });
    }

    subscription: Subscription;

    ngOnInit(): void {
        this.buildings$ = this.buildingService.getAll();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSubmit(): void {
        this.buildingService.get(this.levelForm.value.buildingId).subscribe(res => {
            const level = new Level(this.levelForm.value.id, this.levelForm.value.name);
            if (this.data) {
                this.levelService.replace(this.data.id, level);
            } else {
                this.levelService.add(level);
            }
            res.levels.push(level);
            this.buildingService.replace(this.levelForm.value.buildingId, res);
        });
        this.dialogRef.close();
    }
}
