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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage implements OnInit {

  correo: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irARegistro() {
    this.router.navigate(['/register']);
  }

  iniciarSesion() {

    const usuarioGuardado = localStorage.getItem('usuarioNeverApp');

    if (!usuarioGuardado) {
      alert('No existe ningún usuario registrado');
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (
      this.correo === usuario.correo &&
      this.password === usuario.password
    ) {
      alert('Inicio de sesión correcto');

      this.router.navigateByUrl('/tabs', { replaceUrl: true });

    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

}