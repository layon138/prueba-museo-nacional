import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehiculeService } from '../../services/vehicule.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { Affectations, Brand, StaffInCharge, Vehicle } from '../../models/vehicle.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-modal-car',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,AngularMultiSelectModule
  ],
  templateUrl: './modal-car.component.html',
  styleUrl: './modal-car.component.scss'
})
export class ModalCarComponent {
  carRegisterForm: FormGroup;

  public brandList: Brand[]=[];
  public staffInChargeList: StaffInCharge[]=[
    {"id":'1',"itemName":"Camilo"},
    {"id":'2',"itemName":"Sandra"},
  ];
  public affectationsList: Affectations[]=[
    {"id":'1',"itemName":"Camilo",description:"asa",percentage:30},
    {"id":'2',"itemName":"Sandra",description:"asa",percentage:40},
    {"id":'3',"itemName":"mario",description:"asapruentia",percentage:15},
  ];
  
  selectedItems: any[]= [];
  dropdownStaffInChargeSettings = { 
    singleSelection: false, 
    text:"",
    selectAllText:'seleccionar todo',
    unSelectAllText:'desseleccionar todo',
    enableSearchFilter: true,
    classes:"dropdownStaffInChargeSettings",
    position:'bottom',
    autoPosition:false
  };   
  dropdownBrandSettings = { 
    singleSelection: true, 
    text:"",
    selectAllText:'Select All',
    addNewItemOnFilter:true,
    unSelectAllText:'seleccionar todo',
    addNewButtonText: 'agregar',
    enableSearchFilter: true,
    classes:"dropdownBrandSettings"
  };   
  dropdownAffectationSettings = { 
    singleSelection: false, 
    text:"",
    selectAllText:'Select All',
    addNewItemOnFilter:true,
    unSelectAllText:'seleccionar todo',
    addNewButtonText: 'agregar',
    enableSearchFilter: true,
    classes:"drop-affectation",
    autoPosition:false
  }; 
  @Output () closeModal: EventEmitter<boolean> = new EventEmitter();
  constructor(private vehiculeService: VehiculeService,
    private readonly formBuilder: FormBuilder) {
    this.carRegisterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[ Validators.required,]),
      brand: new FormControl(null,[ Validators.required,]),
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

  getContnrol(index: number): AbstractControl[] {
    const control=(this.rowsControls[index].get('affectations') as FormArray)
    return control?.controls
  }

  getFormGroupAtIndex2(index: number,index2:number) {
    const control=(this.rowsControls[index].get('affectations') as FormArray)
    return (control?.controls[index2] as FormGroup);
  }

  onItemSelect(item:any){

}

addAffectations(item:any,rowIndex:number){
  console.log(item,rowIndex);
  let action = new FormGroup({
    itemName: new FormControl(item.itemName, [Validators.required]),
    description: new FormControl(item.description,[ Validators.required,]),
    percentage: new FormControl(item.percentage,[ Validators.required,  Validators.pattern("^[0-9]*$"),
    Validators.minLength(2)]),
  });
  const control=(this.rowsControls[rowIndex].get('affectations') as FormArray)
}

OnItemDeSelect(event:any,index:number){
  if(!event){
    (this.rowsControls[index].get('affectations') as FormArray)?.removeAt(0);
  }
  if(event){
    const currentNumber =  (this.rowsControls[index].get('affectations') as FormArray).controls.findIndex(
      (control) => control.get('itemName')?.value===event.itemName
    );
 
    (this.rowsControls[index].get('affectations') as FormArray)?.removeAt(currentNumber);
  }
}

saveNewBrand(event:any){
  this.brandList=[
    ...    this.brandList,
    {"id":uuidv4(),"itemName":event}
  ];
}

  async ngOnInit(): Promise<void> {
   this.brandList = (await this.vehiculeService.getBrands()).listBrands;
  }

  addAction() {
    let action = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[ Validators.required,]),
      affectations: this.formBuilder.array([]),
      affectation: new FormControl('',[ Validators.required,]),
    });
    
    this.actions.push(action);
  }

  deleteAction(index: number) {
    this.actions.removeAt(index);
  }

  public async saveData(){
    if(this.carRegisterForm.valid){
      console.log(this.carRegisterForm.value)

     const res= await this.vehiculeService.addVehicle(this.carRegisterForm.value);
      if(res.status==='success') this.clickCloseModal();
    }else{
      this.carRegisterForm.markAllAsTouched();
    }

  }

  clickCloseModal(){
      this.closeModal.emit(false)
  }
}
