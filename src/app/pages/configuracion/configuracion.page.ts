import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonAlert,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { TranslateService } from '../../services/translate.service';
import { FoodService } from '../../services/food';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonAlert,
    IonButtons,
    IonMenuButton,
  ],
})
export class ConfiguracionPage implements OnInit {
  translateService = inject(TranslateService);
  private foodService = inject(FoodService);
  private router = inject(Router);

  notifications = localStorage.getItem('neverapp_notifications') === 'true';
  username = '';
  language: string = this.translateService.lang;
  showDeleteAlert = false;

  alertButtons: any[] = [];

  constructor() {
    this.cargarUsuario();
    this.updateAlertButtons();
  }

  ngOnInit() {}

  onNotificationsChange() {
    localStorage.setItem('neverapp_notifications', this.notifications ? 'true' : 'false');
  }

  private cargarUsuario() {
    const usuarioGuardado = localStorage.getItem('usuarioNeverApp');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.username = usuario.nombre || '';
    }
  }

  private updateAlertButtons() {
    this.alertButtons = [
      {
        text: this.translateService.t('settings.cancel'),
        role: 'cancel',
        handler: () => { this.showDeleteAlert = false; }
      },
      {
        text: this.translateService.t('settings.confirm'),
        role: 'destructive',
        handler: () => this.confirmarEliminar()
      }
    ];
  }

  onLanguageChange(event: any) {
    const lang = event.detail.value;
    this.translateService.setLang(lang);
    this.updateAlertButtons();
  }

  actualizarNombre() {
    if (!this.username.trim()) return;
    const usuarioGuardado = localStorage.getItem('usuarioNeverApp');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      usuario.nombre = this.username;
      localStorage.setItem('usuarioNeverApp', JSON.stringify(usuario));
      alert(this.translateService.t('settings.usernameUpdated'));
    }
  }

  eliminarDatos() {
    this.showDeleteAlert = true;
  }

  confirmarEliminar() {
    localStorage.clear();
    sessionStorage.clear();
    this.foodService.limpiarDatos();
    this.showDeleteAlert = false;
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
