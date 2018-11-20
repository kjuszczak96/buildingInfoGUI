import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { Level } from 'src/app/models/level.model';
import { Room } from 'src/app/models/room.model';
import { LevelService } from 'src/app/services/level.service';
import { RoomService } from 'src/app/services/room.service';
import { existingIdValidator } from 'src/app/validators/add-location-validator';

@Component({
    selector: 'binfo-add-room',
    templateUrl: './add-room.component.html',
})
export class AddRoomComponent implements OnDestroy, OnInit {
    roomForm: FormGroup;
    levels$: Observable<Level[]>;

    constructor(
        public dialogRef: MatDialogRef<AddRoomComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Room,
        public roomService: RoomService,
        public levelService: LevelService,
        private fb: FormBuilder,
    ) {
        this.roomForm = !this.data
            ? this.fb.group({
                  name: ['', Validators.required],
                  id: ['', [Validators.required], [existingIdValidator(this.roomService)]],
                  levelId: ['', [Validators.required]],
                  area: ['', [Validators.required]],
                  volume: ['', [Validators.required]],
                  heatingPowerConsumption: ['', [Validators.required]],
                  illuminationPower: ['', [Validators.required]],
              })
            : this.fb.group({
                  name: [this.data.name, Validators.required],
                  id: [
                      this.data.id,
                      [Validators.required],
                      [existingIdValidator(this.roomService, this.data.id)],
                  ],
                  levelId: ['', [Validators.required]],
                  area: ['', [Validators.required]],
                  volume: ['', [Validators.required]],
                  heatingPowerConsumption: ['', [Validators.required]],
                  illuminationPower: ['', [Validators.required]],
              });
    }

    subscription: Subscription;

    ngOnInit(): void {
        this.levels$ = this.levelService.getAll();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onSubmit(): void {
        this.levelService.get(this.roomForm.value.levelId).subscribe(res => {
            const room = new Room(
                this.roomForm.value.id,
                this.roomForm.value.name,
                this.roomForm.value.area,
                this.roomForm.value.volume,
                this.roomForm.value.heatingPowerConsumption,
                this.roomForm.value.illuminationPower,
            );
            if (this.data) {
                this.roomService.replace(this.data.id, room);
            } else {
                this.roomService.add(room);
            }
            res.rooms.push(room);
            this.levelService.replace(this.roomForm.value.levelId, res);
        });
        this.dialogRef.close();
    }
}
