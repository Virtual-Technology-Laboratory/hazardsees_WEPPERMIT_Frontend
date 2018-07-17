import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErmitFormComponent } from './ermit-form.component';

describe('ErmitFormComponent', () => {
  let component: ErmitFormComponent;
  let fixture: ComponentFixture<ErmitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErmitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
