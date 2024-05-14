import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap,map } from 'rxjs';
import { YogaPose } from '../../interfaces/yogaresponse';

@Injectable({
  providedIn: 'root'
})
export class YogaApiService {
  private _siteURL="https://yoga-api-nzy4.onrender.com/v1"

  constructor(private _http:HttpClient) { }

//feth yogaPoses and stores as array
  getYogaPoses(): Observable<YogaPose[]> {
    return this._http.get<YogaPose[]>(`${this._siteURL}/poses`)
      .pipe(
        tap(data => console.log('Yoga poses data: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

//get yoga pose by id
getYogaPoseById(id: string): Observable<YogaPose> {
  return this._http.get<YogaPose>(`${this._siteURL}/poses?id=${id}`);
}

//get poses by level; beginner, intermediate, expert
getPosesByLevel(level: string): Observable<YogaPose[]> {
  return this._http.get<any>(`${this._siteURL}/poses?level=${level}`)
    .pipe(
      map(data => data.poses || []),  //Access the poses array within the returned object
      tap(poses => console.log(`Poses for level ${level}:`, poses)),
      catchError(this.handleError)
    );
}

  private handleError(err:HttpErrorResponse){
    console.log('yogaapiservice:' + err.message);
    return throwError(()=> new Error("yogaapiservice:"+err.message))
  }
}
