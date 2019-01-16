import { TestBed } from '@angular/core/testing';

import { SetCategoryService } from './set-category.service';

describe('SetCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetCategoryService = TestBed.get(SetCategoryService);
    expect(service).toBeTruthy();
  });
});
