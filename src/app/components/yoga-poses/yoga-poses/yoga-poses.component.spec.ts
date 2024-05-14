import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YogaPosesComponent } from './yoga-poses.component';

describe('YogaPosesComponent', () => {
  let component: YogaPosesComponent;
  let fixture: ComponentFixture<YogaPosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YogaPosesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YogaPosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
