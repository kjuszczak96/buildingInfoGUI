import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildingViewComponent } from './building-view/building-view.component';
import { LevelViewComponent } from './level-view/level-view.component';
import { RoomViewComponent } from './room-view/room-view.component';

const routes: Routes = [
    { path: '', redirectTo: 'building', pathMatch: 'full' },
    { path: 'building', component: BuildingViewComponent },
    { path: 'level', component: LevelViewComponent },
    { path: 'room', component: RoomViewComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
