import { Component, OnInit } from '@angular/core';
import {category_count} from '../global';
import {SetCategoryService} from '../set-category.service';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {database} from '../database_interface';
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
  name_category = new Map();
  tagged_names=new Array<string>();
  untagged_names=new Array<string>();
  uploaded_names=new Array<string>();
  detectFiles(event) {
    this.all_img = [];
    let files = event.target.files;
    this.number=files.length;
    console.log(this.number);
  
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.all_img.push(e.target.result);
          let name=file.name;
          console.log(file.name)
         
          this.uploaded_names.push(file.name);
          
        }          
        reader.readAsDataURL(file);
      }
      console.log("x"+this.uploaded_names)
      this.name=this.uploaded_names
      this.display_img=this.all_img
      for(let file of files)
      document.getElementById(file.name).setAttribute("value","Unclassified")
         
    }
   
  }

func(event:any )
{
  console.log(event)
  console.log("checked"+event.target.defaultValue);
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
  {console.log("lab"+img)
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
  console.log(this.xah_map_to_obj(category_count))
  var sJson = JSON.stringify(this.xah_map_to_obj(category_count));
  var json_data=this.xah_map_to_obj(category_count)
  var now=new Date().toDateString();
  var data : database[]=[];
  for(let x in json_data)
    {
      let obj = new database();
      obj.category_name=json_data[x]
      obj.image_name=x;
      obj.time_stamp=now
      data.push(obj)
    }
    this.http.post('http://35.232.19.110:8000/set_category/',data).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "Image-Category.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
   
    document.body.removeChild(element);


}
filter(event)
{ this.name=[]
  this.selected_img=[]
  this.id=(event.target.id);
  if(this.id=="all")
  {
    this.display_img=this.all_img;
    this.name=this.tagged_names
    this.name.concat(this.untagged_img);
  }
  else if(this.id=="Tagged")
  {
    this.display_img=this.tagged_img;
    this.name=this.tagged_names
  }
  else
  {
    this.display_img=this.untagged_img;
    this.name=this.untagged_names
  }
}
  constructor(private http:HttpClient,public setCategory : SetCategoryService) { }
  makeRequest(): void {
    
    this.http.get('http://35.232.19.110:8000/labelled_images/')
    .subscribe((res: any) => {
      console.log(res.directory_paths)
      
      for(let url of res.directory_paths["Payment"])
      {
        var new_url="http://35.232.19.110:8888/"+url.split('/')[5].replace(" ","%20")+'/'+url.split('/')[6];
        console.log(new_url);
        this.tagged_img.push(new_url);
        this.all_img.push(new_url);
        let n=url.split('/')[6];
        console.log(n);
        this.tagged_names.push(n);
      
      }
      for(let url of res.directory_paths["Delivery Order"])
      {
        console.log("u"+url.split('/')[5].replace(" ","%20"))
        url.replace(' ','%20')
        var new_url="http://35.232.19.110:8888/"+url.split('/')[5].replace(" ","%20")+'/'+url.split('/')[6];
        console.log(new_url);
        this.tagged_img.push(new_url);
        this.all_img.push(new_url);
        let n=url.split('/')[6];
        console.log(n);
        this.tagged_names.push(n);
      }
      /*for(let url of res.directory_paths['"Invoice "'])
      {
        this.tagged_img.push(url);
        this.all_img.push(url);
      }*/
      for(let url of res.directory_paths["Purchase Order"])
      {
        var new_url="http://35.232.19.110:8888/"+url.split('/')[5].replace(" ","%20")+'/'+url.split('/')[6];
        console.log(new_url);
        this.tagged_img.push(new_url);
        this.all_img.push(new_url);
        let n=url.split('/')[6];
        console.log(n);
        this.tagged_names.push(n);
      }
      for(let url of res.directory_paths["Unclassified"])
      {
        var new_url="http://35.232.19.110:8888/"+url.split('/')[5].replace(" ","%20")+'/'+url.split('/')[6];
        console.log(new_url);
        this.untagged_img.push(new_url);
        this.all_img.push(new_url);
        let n=url.split('/')[6];
        console.log(n);
        this.untagged_names.push(n);
      }
      this.display_img=this.untagged_img
      this.name=this.untagged_names
      for(let data of res.labell)
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
