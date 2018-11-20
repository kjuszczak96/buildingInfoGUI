import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BuildingViewComponent, LevelViewComponent, RoomViewComponent } from './components';

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
