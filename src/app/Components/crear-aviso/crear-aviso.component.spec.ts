import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAvisoComponent } from './crear-aviso.component';

describe('CrearAvisoComponent', () => {
  let component: CrearAvisoComponent;
  let fixture: ComponentFixture<CrearAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAvisoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
