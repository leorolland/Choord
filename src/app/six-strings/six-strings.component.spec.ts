import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixStringsComponent } from './six-strings.component';

describe('SixStringsComponent', () => {
  let component: SixStringsComponent;
  let fixture: ComponentFixture<SixStringsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixStringsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixStringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
