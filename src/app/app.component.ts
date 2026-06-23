import { Component, inject } from '@angular/core'; // 1. Importamos inject
import { 
  IonApp, 
  IonRouterOutlet, 
  IonMenu, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonIcon, 
  IonLabel 
} from '@ionic/angular/standalone';
import { Router, RouterLink, RouterLinkActive } from '@angular/router'; // 2. Importamos el Router de Angular
import { LocalNotifications } from '@capacitor/local-notifications';
import { addIcons } from 'ionicons';
import { 
  homeOutline, 
  listOutline, 
  cartOutline, 
  gridOutline, 
  warningOutline,
  settingsOutline, 
  logOutOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, 
    IonRouterOutlet, 
    IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonItem, 
    IonIcon, 
    IonLabel, 
    RouterLink,
    RouterLinkActive 
  ],
})
export class AppComponent {
 
  private router = inject(Router);

  constructor() {
    addIcons({ 
      'home-outline': homeOutline, 
      'list-outline': listOutline, 
      'cart-outline': cartOutline, 
      'grid-outline': gridOutline, 
      'warning-outline': warningOutline, 
      'settings-outline': settingsOutline, 
      'log-out-outline': logOutOutline 
    });

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

  
  cerrarSesion() {
    console.log('Cerrando sesión y limpiando almacenamiento...');

    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}