import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule
  ]
})
export class RegisterPage implements OnInit {

  nombre: string = '';
  correo: string = '';
  password: string = '';
  confirmarPassword: string = '';
  translateService = inject(TranslateService);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  registrar() {
    if (
      !this.nombre ||
      !this.correo ||
      !this.password ||
      !this.confirmarPassword
    ) {
      alert(this.translateService.t('register.required'));
      return;
    }

    if (this.password !== this.confirmarPassword) {
      alert(this.translateService.t('register.passwordMismatch'));
      return;
    }

    const usuario = {
      nombre: this.nombre,
      correo: this.correo,
      password: this.password
    };

    localStorage.setItem(
      'usuarioNeverApp',
      JSON.stringify(usuario)
    );

    alert(this.translateService.t('register.success'));

    this.router.navigateByUrl('/login');
  }

}
