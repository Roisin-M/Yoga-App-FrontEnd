import { Component, OnInit } from '@angular/core';
import { YogaPose } from '../../../interfaces/yogaresponse';
import { YogaApiService } from '../../../services/Yoga-api/yoga-api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yoga-poses',
  templateUrl: './yoga-poses.component.html',
  styleUrls: ['./yoga-poses.component.css'],
  imports: [CommonModule],  
  standalone: true
})
export class YogaPosesComponent implements OnInit {
  yogaPoses: YogaPose[] = [];

  constructor(
    private yogaApiService: YogaApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPoses();
  }

  //fetches yoga poses form api service
  getAllPoses(): void {
    this.yogaApiService.getYogaPoses().subscribe(poses => {
      this.yogaPoses = poses;
    });
  }
  //fetches yoga poses using getposebylevel api service
  getPosesByLevel(level: string): void {
    this.yogaApiService.getPosesByLevel(level).subscribe({
      next: (poses) => {
        this.yogaPoses = poses;
        console.log('Updated yoga poses:', this.yogaPoses);
      },
      error: (err) => {
        console.error('Error fetching poses by level:', err);
      }
    });
  }
  //naviagte to pose-details.component.html of the selected pose
  showDetails(poseId: string): void {
    this.router.navigate(['/pose-details', poseId]);
    
  }
}
