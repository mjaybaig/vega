import { KeyValuePair } from './../app/models/KeyValuePair';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../app/models/Vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  //allVehicles: Vehicle[];
  makes: KeyValuePair[];
  models: KeyValuePair[];
  filter:any = {};

  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
    .subscribe (m => this.makes = m)
    this.populateVehicles();
  }
  
  private populateVehicles(){
    this.vehicleService.getVehicles(this.filter)
    //.subscribe( v => this.vehicles = this.allVehicles = v) clientside filtering
    .subscribe( v => this.vehicles = v) 
  }
  onFilterChange(){
    this.filter.modelId = 11
    this.populateVehicles();
    //for CLIENT SIDE FILTERING. we are currently filtering server side
    // var vehicles = this.allVehicles;

    // //filter by make
    // if(this.filter.makeId)
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId)
    // //endif

    // //filter by model
    // if(this.filter.modelId)
    //   vehicles = vehicles.filter(v => v.model.id == this.filter.modelId)
    // //endif

    // this.vehicles = vehicles;
  }

  resetFilters(){
    //   this.vehicles = this.allVehicles;
    this.filter = {};
    this.onFilterChange();
  }
}
