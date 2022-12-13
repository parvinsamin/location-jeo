import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterNavComponent } from './center-nav.component';

describe('CenterNavComponent', () => {
  let component: CenterNavComponent;
  let fixture: ComponentFixture<CenterNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
