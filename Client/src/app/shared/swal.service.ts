import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class Sweetalert2Service {

  constructor( ) { }
  top(typ, mesage) {
    Swal.fire({
      position: 'top',
      type: typ,
      html: mesage,
      showConfirmButton: true,
      confirmButtonText: 'Look up',

      timer: 3000,
      width: 300,
      animation: true


    });
  }

    show(typee, text) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000,
        width: 200

      });
      Toast.fire({
        type: typee,
        title: text
      });
    }
    load() {
      Swal.showLoading();
    }
  }
