import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IRoutine } from '../../../interfaces/routine';
import { YogaPose } from '../../../interfaces/yogaresponse';
import { YogaApiService } from '../../../services/Yoga-api/yoga-api.service';
import { RoutineApiService } from '../../../services/routine/routine-api.service';

@Component({
  selector: 'app-routine-details',
  standalone: true,
  imports: [CommonModule],  
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css']  
})
export class RoutineDetailsComponent implements OnInit {
  routine?: IRoutine;
  posesDetails: YogaPose[] = [];

  constructor(
      private route: ActivatedRoute,
      private routineApiService: RoutineApiService,
      private yogaApiService: YogaApiService
    ) {}

      ngOnInit(): void {
        const routineId = this.route.snapshot.paramMap.get('id');
        if (routineId) {
          this.routineApiService.getRoutineById(routineId).subscribe(routine => {
            this.routine = routine;
            this.loadPosesDetails();
          }, error => {
            console.error('Failed to load routine details', error);
          });
        }
      }

      //fetch the details of each pose in the routine.
      loadPosesDetails(): void {
        if (this.routine && this.routine.poses) {
          this.routine.poses.forEach(poseId => {
            this.yogaApiService.getYogaPoseById(poseId).subscribe(pose => {
              this.posesDetails.push(pose);
            }, error => {
              console.error('Error loading pose details:', error);
            });
          });
        }
      }
}
