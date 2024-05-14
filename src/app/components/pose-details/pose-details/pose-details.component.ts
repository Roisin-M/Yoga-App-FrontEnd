import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YogaApiService } from '../../../services/Yoga-api/yoga-api.service';
import { YogaPose } from '../../../interfaces/yogaresponse';
import { RoutineApiService } from '../../../services/routine/routine-api.service';
import { IRoutine } from '../../../interfaces/routine';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pose-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pose-details.component.html',
  styleUrls: ['./pose-details.component.css']
})
export class PoseDetailsComponent implements OnInit {
  pose?: YogaPose;
  routines: IRoutine[] = [];
  selectedRoutineId?: string;

  constructor(
    private route: ActivatedRoute, 
    private yogaApiService: YogaApiService,
    private routineApiService: RoutineApiService
  ) {}

  ngOnInit(): void {
    const poseId = this.route.snapshot.paramMap.get('id');
    if (poseId) {
      this.yogaApiService.getYogaPoseById(poseId).subscribe(pose => {
        this.pose = pose;
      });
    }
    this.fetchRoutines();
  }

  //funtion to fetch the list of routines to display in the drop down fro add to routine
  fetchRoutines(): void {
    this.routineApiService.getRoutines().subscribe(
      routines => this.routines = routines);
  }
  //doesn not work <error 404 from javascript in express server>
  // function to call api service function to update Routine in the databse
  // adds new pose to the routine, passes poseid as a string and routineid
  addToRoutine(routineId: string): void {
    if (!routineId || !this.pose) {
      console.error("Routine ID or pose data is missing.");
      return;
    }
    const poseIdAsString = String(this.pose.id);
    this.routineApiService.updateRoutine(routineId, poseIdAsString).subscribe({
      next: () => {
        alert('Pose added to routine successfully!');
      },
      error: (err) => {
        console.error("Failed to update routine", err);
        alert('Failed to add pose to routine.');
      }
    });
  }
}
