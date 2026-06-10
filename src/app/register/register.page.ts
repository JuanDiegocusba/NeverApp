import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.password !== this.confirmarPassword) {
      alert('Las contraseñas no coinciden');
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

    alert('Usuario registrado correctamente');

    this.router.navigateByUrl('/login');

  }

}