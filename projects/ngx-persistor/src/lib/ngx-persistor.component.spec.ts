import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPersistorComponent } from './ngx-persistor.component';

describe('NgxPersistorComponent', () => {
  let component: NgxPersistorComponent;
  let fixture: ComponentFixture<NgxPersistorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxPersistorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxPersistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
