import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validationForm: FormGroup;

  constructor(private router: Router, private log: AuthService, private toast: Sweetalert2Service, private loading: NgxSpinnerService) {
  }

 ngOnInit() {
      this.validationForm = new FormGroup({
        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.maxLength(25)
        ])),

        password: new FormControl('',  Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z0-9_-]{4,15}$')
        ]))
      });


     }

    get email() { return this.validationForm.get('email'); }
    get password() { return this.validationForm.get('password'); }
    onSubmit(f) {
      // stop here if form is invalid
      if (this.validationForm.invalid) {
        return;
    }
      this.loading.show();
      this.log.login(f).subscribe(
      res => {
        this.router.navigate(['/todo']);
        this.toast.show('success', res.msg);
        this.validationForm.reset();
        this.loading.hide();
        this.log.getToken();
      },
      err => {
        this.toast.show('warning', err.error.msg);
        this.router.navigate(['/register']);
        this.validationForm.reset();
        this.loading.hide();
      }
    );
  }

}
