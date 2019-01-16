import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSearchCategoryComponent } from './layout-search-category.component';

describe('LayoutSearchCategoryComponent', () => {
  let component: LayoutSearchCategoryComponent;
  let fixture: ComponentFixture<LayoutSearchCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSearchCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSearchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
