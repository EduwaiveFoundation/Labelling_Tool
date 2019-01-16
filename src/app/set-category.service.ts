import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
@Injectable({
  providedIn: 'root'
})
export class SetCategoryService {

  public setCategorySubject = new Subject<any>();
  constructor() { }
  labelImages(selected_img)
  {
      this.setCategorySubject.next(selected_img);
  }
}
