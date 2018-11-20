import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';

import { BuildingService } from '../services/building.service';
import { existingIdValidator } from '../validators/add-building-validator';

import { Building } from './../models/building.model';

@Component({
    selector: 'binfo-building-view',
    templateUrl: './building-view.component.html',
    styleUrls: ['./building-view.component.scss'],
})
export class BuildingViewComponent implements OnInit {
    constructor(public dialog: MatDialog, public buildingService: BuildingService) {}

    buildings$: Observable<Building[]>;

    openDialog(building: Building): void {
        this.dialog.open(
            AddBuildingFormComponent,
            building
                ? { data: building, width: '20rem' }
                : {
                      width: '20rem',
                  },
        );
    }

    ngOnInit(): void {
        this.buildings$ = this.buildingService.getAll();
    }

    getArea(building: Building): void {
        this.buildingService.getArea(building).subscribe(res => console.log(res));
    }

    getVolume(building: Building): void {
        this.buildingService.getVolume(building).subscribe(res => console.log(res));
    }

    getIlluminationPower(building: Building): void {
        this.buildingService.getIlluminationPower(building).subscribe(res => console.log(res));
    }
}

@Component({
    selector: 'binfo-add-building-form',
    templateUrl: 'add-building-form.html',
})
export class AddBuildingFormComponent implements OnDestroy {
    buildingForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddBuildingFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Building,
        public buildingService: BuildingService,
        private fb: FormBuilder,
    ) {
        this.buildingForm = !this.data
            ? this.fb.group({
                  name: ['', Validators.required],
                  id: ['', [Validators.required], [existingIdValidator(this.buildingService)]],
              })
            : this.fb.group({
                  name: [this.data.name, Validators.required],
                  id: [
                      this.data.id,
                      [Validators.required],
                      [existingIdValidator(this.buildingService, this.data.id)],
                  ],
              });
    }

    subscription: Subscription;

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSubmit(): void {
        if (this.data) {
            this.buildingService.edit(
                this.data.id,
                new Building(this.buildingForm.value.id, this.buildingForm.value.name),
            );
        } else {
            this.buildingService.add(
                new Building(this.buildingForm.value.id, this.buildingForm.value.name),
            );
        }
        this.dialogRef.close();
    }
}
