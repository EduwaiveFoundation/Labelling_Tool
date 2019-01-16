import { Component, OnInit } from '@angular/core';
import {category_count} from '../global';
import {SetCategoryService} from '../set-category.service';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})

export class ImageUploadComponent implements OnInit {
  all_img = new Array<string>();
  name = new Array<string>();
  selected_img=new Array<string>();
  number:number;
  checked=false;
  tagged_img = new Array<string>();
  untagged_img = new Array<string>();
  display_img=new Array<string>();
  id="Untagged";
  tag_result=[];
  detectFiles(event) {
    this.all_img = [];
    this.name= [];
    let files = event.target.files;
    this.number=files.length;
    console.log(this.number);
  
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.all_img.push(e.target.result);
          let name=file.name;
          
          let f=0;
          for(let n of this.tag_result)
          {
            if(name==n)
            {
              this.tagged_img.push(e.target.result);
              f=1;break;
            }
          }
          this.name.push(name);
          if(f==0)
          {
            this.untagged_img.push(e.target.result);
          }
        }
        reader.readAsDataURL(file);
      }
    }
    this.display_img=this.untagged_img;
  }

func(event:any )
{
  console.log(event.target);
  console.log(event.target.defaultValue);
  if(event.target.checked==true)
  this.selected_img.push(event.target.defaultValue);
  else
  {let i=0;
    for(let img of this.selected_img)
    {
      if(img==event.target.defaultValue)
      {
          this.selected_img.splice(i,1);
          break;
      }
      i++;
    }
  }
}

label_imgs()
{
  this.setCategory.labelImages(this.selected_img);
  for(let img of this.selected_img)
  {
    document.getElementById(img).setAttribute("value",category_count.get(img));
  }
 
}
 xah_map_to_obj = ( aMap => {
  const obj = {};
  aMap.forEach ((v,k) => { obj[k] = v });
  return obj;
});

mapTojson()
{

  console.log(this.xah_map_to_obj(category_count));
  console.log(JSON.stringify(this.xah_map_to_obj(category_count)))
  var sJson = JSON.stringify(this.xah_map_to_obj(category_count));
    this.http.post('http://127.0.0.1:8000/labelled_images/',sJson);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "Image-Category.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
   
    document.body.removeChild(element);


}
filter(event)
{
  this.id=(event.target.id);
  if(this.id=="all")
  {
    this.display_img=this.all_img;
  }
  else if(this.id=="Tagged")
  {
    this.display_img=this.tagged_img;
  }
  else
  {
    this.display_img=this.untagged_img;
  }
}
  constructor(private http:HttpClient,public setCategory : SetCategoryService) { }
  makeRequest(): void {
    
    this.http.get('http://127.0.0.1:8000/labelled_images/')
    .subscribe((res: any) => {
      for(let data of res)
      {
        this.tag_result.push(data['image_name']);
        //console.log(this.tag_result.length)
      }
      
    })
  }
  ngOnInit() {
    this.makeRequest();
  }

}
