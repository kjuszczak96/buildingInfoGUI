import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from 'rxjs';
import { Building } from 'src/app/models/building.model';
import { BuildingService } from 'src/app/services/building.service';
import { existingIdValidator } from 'src/app/validators/add-location-validator';

@Component({
    selector: 'binfo-add-building',
    templateUrl: './add-building.component.html',
})
export class AddBuildingComponent implements OnDestroy {
    buildingForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<AddBuildingComponent>,
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
            this.buildingService.replace(
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
