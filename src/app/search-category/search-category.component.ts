import { Component, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'
import {Icategory} from '../category';
import {category_count} from '../global';
import {SetCategoryService} from '../set-category.service';

@Component({
  selector: 'app-search-category',
  templateUrl:'./search-category.component.html',
  styleUrls: ['./search-category.component.css']
})
export class SearchCategoryComponent implements OnInit {
  
  loading: boolean;
  public selected :string;
  myControl = new FormControl();
  options : Icategory[]=[];
  filteredOptions: Observable<Icategory[]>;
  selected_category:any;
  selected_images:any;
  constructor(private http:HttpClient,
    private setCategory : SetCategoryService) { }


  ngOnInit() {
    this.makeRequest();
    this.setCategory.setCategorySubject.subscribe(
      data => {
        for (let img of data)
        {
          category_count.set(img,this.selected_category.category_name);
          
        }
        category_count.forEach((value: any, key: any) => {
          console.log(key, value);
      });
      });
    
   }



   sliceFunc()
   {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith<string | Icategory>(''),
      map(value => typeof value === 'string' ? value : value.category_name),
      map(category_name => category_name ? this._filter(category_name) : this.options.slice())
    );
   
   
   }


   
   displayFn(cat?: Icategory): string | undefined {
    return cat ? cat.category_name : undefined;
  }


  private _filter(category_name: string): Icategory[] {
    const filterValue =category_name.toLowerCase();
    return this.options.filter(option => option.category_name.toLowerCase().indexOf(filterValue) === 0);
  }


   makeRequest(): void {
    this.loading = true;
    this.http.get('http://127.0.0.1:8000/labelled_images/')
    .subscribe((res: any) => {
      let result=res.directory_paths
      let data=[];
      for(let k in result)
        data.push(k);
      this.loading=false;
      let index=0;
     for(let i of data){

      let catObj = new Icategory();
        catObj.category_name=i;
        catObj.id=index;
        this.options.push(catObj);
        console.log(catObj);
        index++;
     }
     this.sliceFunc();
      
    });
  }
}
