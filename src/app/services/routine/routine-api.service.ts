import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { IRoutine } from '../../interfaces/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineApiService {
  private _siteURL = 'http://localhost:5050';

  constructor(private _http: HttpClient) { }

  //fetch routines from mongodb database hosted on localhost:5050
  getRoutines(): Observable<IRoutine[]> {
    return this._http.get<IRoutine[]>(`${this._siteURL}/routines`).pipe(
      tap(data => console.log('All routines data:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  //fetch routines by their id
  getRoutineById(id: string): Observable<IRoutine> {
    return this._http.get<IRoutine>(`${this._siteURL}/routines/${id}`).pipe(
      tap(data => console.log('Routine data:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  //service to updateRoutine with new poseId for the poses array, however have error 404 not found
  updateRoutine(routineId: string, poseId: string): Observable<any> {
    return this._http.put(`${this._siteURL}/routines/${routineId}`, { poseId: poseId }).pipe(
      tap(data => console.log('Pose added to routine:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  
  //add newly created routine to databse
  addRoutine(routine: IRoutine): Observable<IRoutine> {
    return this._http.post<IRoutine>(`${this._siteURL}/routines`, routine)
      .pipe(
        tap(data => console.log('Add routine message: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  //delete routine from db permanently
  deleteRoutine(id: string): Observable<any> {
    return this._http.delete(`${this._siteURL}/routines/${id}`).pipe(
      tap(data => console.log('Delete routine message:', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
