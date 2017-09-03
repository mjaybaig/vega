import * as _ from 'underscore';
import { Vehicle } from './../app/models/Vehicle';
import { SaveVehicle } from './../app/models/SaveVehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin'; 


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  
  makes:any[];

  vehicle:SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: ''
    }
  };
  
  models:any[];
  features:any[];

  constructor(
        private vehicleService: VehicleService, 
        private toastyService: ToastyService,
        private route:ActivatedRoute,
        private router:Router
        ) {
            route.params.subscribe( p => this.vehicle.id = p['id'] );
         }

  ngOnInit() {
    var sources = [
      this.vehicleService.getFeatures(),
      this.vehicleService.getMakes()
    ];
    // if(this.vehicle.features.includes(2))
    //   console.log("hlo")

    //to prevent 404 from happening in case of create vehicle as id will be null
    if(this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))
    //end if
      Observable.forkJoin(sources).subscribe(data => {
        this.features = data[0];
        this.makes = data[1];

        if(this.vehicle.id){
          this.setVehicle(data[2]);
          this.populateModels();
        }
        //end if
      },err => {
        console.log(err);
                if(err.status == 404)
                  this.router.navigate(['/home']);
      });
  }

  private setVehicle(v:Vehicle){
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  }

  private populateModels(){
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId)
    this.models = selectedMake ? selectedMake.models : [];
  }

  onMakeChange(){
    this.populateModels();
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event){
    if($event.target.checked){
      this.vehicle.features.push(featureId);
    }
    else{
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
    
  }

  submit(){
    if(this.vehicle.id){
      this.vehicleService.updateVehicle(this.vehicle)
        .subscribe( x => {
          this.toastyService.success({
            title: 'Success!',
            msg: 'The vehicle was successfuly updated',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          })
        })
    }
    else{
      this.vehicleService.create(this.vehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: 'Success!',
            msg: 'The vehicle was successfuly added',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          })
        });
    }
  }

  delete(){
    if(confirm("Are you sure")){
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(x => this.router.navigate(['/home']))
    }
  }

}
