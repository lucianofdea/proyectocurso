import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  myForm = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    address: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    postalCode: new FormControl(null, [Validators.required, Validators.maxLength(5)])
  })

  susbcriptions: Subscription = new Subscription();

  constructor(private userService: UserService) { }

  ngOnDestroy(){
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.userService.getUserSelect().subscribe({
          next: (user) => {
            if(user){
              this.myForm.patchValue(user)
            }else{
              this.myForm.reset();
            }
          }, error : (error) => {
            console.error(error)
          }
        })
    )
  }

  addUser(){
    this.userService.addUser(this.myForm.value)
    this.myForm.reset();
  }
}
