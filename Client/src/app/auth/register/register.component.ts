import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Sweetalert2Service } from 'src/app/shared/swal.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  validationForm: FormGroup;

 constructor(private router: Router, private toast: Sweetalert2Service, private logService: AuthService, private loading: NgxSpinnerService
      ) {
    }

      ngOnInit() {
        this.validationForm = new FormGroup({
          email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
            Validators.maxLength(25)
          ])),
            fullName: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z0-9_-]{3,15}$')
          ])),
          password: new FormControl('',  Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25)
          ]))
        });
       }
      get fullName() { return this.validationForm.get('fullName'); }
      get email() { return this.validationForm.get('email'); }
      get password() { return this.validationForm.get('password'); }

  onSubmit(f) {
    this.loading.show(),
     this.logService.register(f).subscribe(
      res => {
        this.loading.hide();
        this.toast.show('success', res.msg);
        this.router.navigate(['/login']);
        this.validationForm.reset();

      },
   err => {
        this.toast.show('warning', err.error.msg);
        this.validationForm.reset();
        this.loading.hide();
  }
  );
  }

}
