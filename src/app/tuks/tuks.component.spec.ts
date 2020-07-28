import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuksComponent } from './tuks.component';

describe('TuksComponent', () => {
  let component: TuksComponent;
  let fixture: ComponentFixture<TuksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
