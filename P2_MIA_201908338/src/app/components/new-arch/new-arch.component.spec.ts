import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArchComponent } from './new-arch.component';

describe('NewArchComponent', () => {
  let component: NewArchComponent;
  let fixture: ComponentFixture<NewArchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewArchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
