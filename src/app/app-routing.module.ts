import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlarmListComponent} from "./alarm-list/alarm-list.component"

const routes: Routes = [
  {path: 'alarm-list', component: AlarmListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
