import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSightingPage } from './add-sighting.page';

describe('AddSightingPage', () => {
  let component: AddSightingPage;
  let fixture: ComponentFixture<AddSightingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSightingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSightingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
