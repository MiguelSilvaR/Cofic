import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAdminComponent } from './files-admin.component';

describe('FilesAdminComponent', () => {
  let component: FilesAdminComponent;
  let fixture: ComponentFixture<FilesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
