import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyArchComponent } from './modify-arch.component';

describe('ModifyArchComponent', () => {
  let component: ModifyArchComponent;
  let fixture: ComponentFixture<ModifyArchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyArchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
