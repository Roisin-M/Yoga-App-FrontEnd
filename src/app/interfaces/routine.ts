export interface IRoutine {
  _id: string;                       
  name: string;          
  description: string;   
  poses: string[];       
}
export class NewRoutine implements IRoutine{
  _id!: string          
  name: string;          
  description: string;   
  poses: string[];  

  constructor( name: string, description: string, poses: string[]=[]) {  
    this.name = name; 
    this.description = description; 
    this.poses = poses; 
  }
}
export interface IRoutineUpdate {
  poses?: string[];
}
