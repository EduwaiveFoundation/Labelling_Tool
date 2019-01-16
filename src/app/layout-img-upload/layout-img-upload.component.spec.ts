import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutImgUploadComponent } from './layout-img-upload.component';

describe('LayoutImgUploadComponent', () => {
  let component: LayoutImgUploadComponent;
  let fixture: ComponentFixture<LayoutImgUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutImgUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
