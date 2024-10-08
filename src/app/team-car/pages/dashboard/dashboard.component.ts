import { Component } from '@angular/core';
import { ModalCarComponent } from '../../componets/modal-car/modal-car.component';
import { VehiculeService } from '../../services/vehicule.service';
import { Vehicle } from '../../models/vehicle.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ModalCarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public showModal=false
  public listVehicules:Vehicle[]=[];


  constructor(private vehiculeService: VehiculeService ){

  }

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.vehiculeService.currentMessage.subscribe( async message => {
      await this.loadData()
  }

    );
  }

  async loadData(): Promise<void> {
    const resp = await this.vehiculeService.getVehicules();
    this.listVehicules=resp.listVehicles;
  }

  openModal(){
    this.showModal=!this.showModal;
  }

}
