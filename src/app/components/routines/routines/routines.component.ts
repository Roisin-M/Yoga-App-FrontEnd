import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineApiService } from '../../../services/routine/routine-api.service';
import { IRoutine, NewRoutine } from '../../../interfaces/routine';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {
  routines: IRoutine[] = [];

  constructor(
    private routineApiService: RoutineApiService,
    private router:Router) { }

  ngOnInit() {
    this.getRoutines();
  }

  getRoutines(): void {
    this.routineApiService.getRoutines().subscribe(
      routines => this.routines = routines);
  }

  //create new routine into the db
  addRoutine(name: string, description: string): void {
    const newRoutine = new NewRoutine(name, description);
    this.routineApiService.addRoutine(newRoutine).subscribe({
      next: () => {
        this.getRoutines();  //refresh the list
      },
      error: (err) => console.error('Error adding routine:', err)
    });
  }

  //delete routine from db
  deleteRoutine(id: string): void {
    this.routineApiService.deleteRoutine(id).subscribe({
      next: () => this.getRoutines(),  // Refresh the list
      error: (err) => console.error(err)
    });
  } 
  //naviagte to routine-details.component.html of the selected routine
  viewDetails(id: string): void {
    this.router.navigate(['/routine-details', id]);
  }
}


