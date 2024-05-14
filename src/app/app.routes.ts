import { Routes } from '@angular/router';
import { YogaPosesComponent } from './components/yoga-poses/yoga-poses/yoga-poses.component';
import { RoutinesComponent } from './components/routines/routines/routines.component';
import { PoseDetailsComponent } from './components/pose-details/pose-details/pose-details.component';
import { RoutineDetailsComponent } from './components/routineDetails/routine-details/routine-details.component';

export const routes: Routes = [
  {path:'',component:YogaPosesComponent},
  {path:'routines',component:RoutinesComponent},
  {path:'pose-details/:id',component:PoseDetailsComponent},
  { path: 'routine-details/:id', component: RoutineDetailsComponent }
];
