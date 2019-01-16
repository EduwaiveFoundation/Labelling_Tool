import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutImgUploadComponent } from './layout-img-upload/layout-img-upload.component';
import { SearchCategoryComponent } from './search-category/search-category.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {HttpClientModule} from '@angular/common/http';
import { LayoutSearchCategoryComponent } from './layout-search-category/layout-search-category.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SetCategoryService} from './set-category.service';
@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    LayoutImgUploadComponent,
    SearchCategoryComponent,
    LayoutSearchCategoryComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule, 
    ReactiveFormsModule
    

  ],
  providers: [SetCategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
