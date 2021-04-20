import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service';
import { FormGroup,FormControl,Validators,FormsModule, FormArray, FormBuilder } from '@angular/forms';  
import { MatTableDataSource } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BeerListService } from '../../service/beerList/beer-list.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-notify-request',
  templateUrl: './notify-request.component.html',
  styleUrls: ['./notify-request.component.css']
})
export class NotifyRequestComponent implements OnInit {

  brewControl = new FormControl();
  styleControl = new FormControl();
  beerControl = new FormControl();
  breweries: Observable<string[]>;
  styles: Observable<string[]>;
  beers: Observable<string[]>;
  notifications: any =[];
  hasData: boolean;
  email: string;


  constructor(private newService: CommonService,
              private beerListService: BeerListService) {}


  ngOnInit(): void {
    //get stored email for user
    this.email = sessionStorage.getItem('email');
    //update page with current selection of notifications
    this.updateNotifications();
    //populate dropdown menu with all avail breweries
    this.beerListService.getBreweries().subscribe(val =>{
        val.unshift('Any Brewery');
        this.breweries = this.brewControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value,val))
        );
    });
    //populate dropdown menu with all avail styles
    this.beerListService.getStyles().subscribe(val =>{
      val.unshift('Any Style');
      for(let i=0;i<val.length;i++){
        val[i] = val[i].split(' - ')[0]
      }
      val =[...new Set(val)]
      this.styles = this.styleControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value,val))
      );
    });
  }

  //filter search results as user types
  private _filter(value: string,v): string[] {
    const filterValue = value.toLowerCase();
    return v.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  //update beer dropdown when brewery is changed 
  updateSelected(e){
    if(e==''){
      this.beers = this.beerControl.value;
      return;
    }
      this.beerListService.getBeers({brewery: e.option.value}).subscribe(val =>{
        val.unshift('Any Beer');
        this.beers = this.beerControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value,val))
        );
    });
  }

  //update page with current selection of notifications
  updateNotifications = function() {
    this.newService.getNotifications({email: this.email})  
    .subscribe(data =>  {
      if(data.length>0){
        this.notifications = data[0].notifications;
        if(this.notifications.length>0)
          this.hasData=true;
      }else{
        this.hasData=false;
      }
    });  
  }

  //add notification to shown notifications
  addNotification =function(){
    console.log(this.brewControl.value);
    if(this.brewControl.value != null && this.brewControl.value !=''){
      this.newService.addNotification({email: this.email, brewery: this.brewControl.value, style: this.styleControl.value, name: this.beerControl.value})
        .subscribe(data =>  {
          this.updateNotifications();
        });
        this.clearAll()
    }
  }

  //remove notification from db
  deleteNotification = function(obj) {
    this.newService.deleteNotification({email: this.email,brewery: obj.brewery, style: obj.style, name: obj.name})  
    .subscribe(data =>  { 
      this.updateNotifications();
    });  
  }

  //clear all dropdowns
  clearAll(){
      this.beerControl.setValue('');
      this.styleControl.setValue('');
      this.brewControl.setValue('');

  }

}
