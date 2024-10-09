import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  registerForm: FormGroup;

  constructor(private authService:AuthService,private router:Router) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('',[ Validators.required,Validators.minLength(5),]),
    });
  }

  async authValidation(){
    if(this.registerForm.valid){
      const res=await this.authService.validateUser(this.registerForm.value);
      if(res.status==='success'){
        this.authService.saveUser(res.token);
        await this.router.navigateByUrl(`dashboard`, { replaceUrl: true });
      }   
    }else{
      this.registerForm.markAllAsTouched();
    }
  }

}
