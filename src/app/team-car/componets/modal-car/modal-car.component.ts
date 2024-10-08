import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculeService } from '../../services/vehicule.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@Component({
  selector: 'app-modal-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,AngularMultiSelectModule
  ],
  templateUrl: './modal-car.component.html',
  styleUrl: './modal-car.component.scss'
})
export class ModalCarComponent {
  carRegisterForm: FormGroup;
  public brandList: any[]=[
    {"id":1,"itemName":"India"},
    {"id":2,"itemName":"Singapore"},
    {"id":3,"itemName":"Australia"},
    {"id":4,"itemName":"Canada"},
    {"id":5,"itemName":"South Korea"},
    {"id":6,"itemName":"Germany"},
    {"id":7,"itemName":"France"},
    {"id":8,"itemName":"Russia"},
    {"id":9,"itemName":"Italy"},
    {"id":10,"itemName":"Sweden"}
  ];
  selectedItems = [];
  constructor(private vehiculeService: VehiculeService,
    private readonly formBuilder: FormBuilder) {
    this.carRegisterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[ Validators.required,]),
      brand: new FormControl('',[ Validators.required,]),
      staffInCharge: new FormControl([],[ Validators.required,]),
      actions: this.formBuilder.array([])
    });
  }

  get actions(): FormArray {
    return (this.carRegisterForm.get('actions') as FormArray);
  }

  get rowsControls(): AbstractControl[] {
    return this.actions.controls;
  }

  getFormGroupAtIndex(index: number) {
    return (this.rowsControls[index] as FormGroup);
  }

  onItemSelect(item:any){
    console.log(item);
    this.carRegisterForm.get('staffInCharge')?.setValue(item.itemName);
    console.log(this.carRegisterForm.get('staffInCharge'));
}

  async ngOnInit(): Promise<void> {
  // this.brandList = (await this.vehiculeService.getBrands()).listBrands;
  }

  addAction() {
    let action = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[ Validators.required,]),
      affectations: new FormControl('',[ Validators.required,]),
    });
    
    this.actions.push(action);
    console.log(this.carRegisterForm)
  }

  public async saveData(){
    console.log(this.carRegisterForm)
    if(this.carRegisterForm.valid){
     const res= await this.vehiculeService.addVehicle(this.carRegisterForm.value);
      if(res.status==='success'){
       
      }   
    }else{
      this.carRegisterForm.markAllAsTouched();
    }

  }
}
