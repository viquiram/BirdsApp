import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBirdPage } from './add-bird.page';

describe('AddBirdPage', () => {
  let component: AddBirdPage;
  let fixture: ComponentFixture<AddBirdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBirdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBirdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
