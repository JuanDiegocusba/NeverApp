import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    this.inicializarNotificaciones();
  }

  async inicializarNotificaciones() {
    try {
      const status = await LocalNotifications.requestPermissions();
      if (status.display === 'granted') {
        console.log('Permisos de notificación concedidos');
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  }
}
