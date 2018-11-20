import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MsgModalData } from 'src/app/models/msg-modal-data.model';

@Component({
    selector: 'binfo-add-building',
    templateUrl: './msg-modal.component.html',
})
export class MsgModalComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: MsgModalData) {}
}
