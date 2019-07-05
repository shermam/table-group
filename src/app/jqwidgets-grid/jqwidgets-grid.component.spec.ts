import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JqwidgetsGridComponent } from './jqwidgets-grid.component';

describe('JqwidgetsGridComponent', () => {
  let component: JqwidgetsGridComponent;
  let fixture: ComponentFixture<JqwidgetsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JqwidgetsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JqwidgetsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
