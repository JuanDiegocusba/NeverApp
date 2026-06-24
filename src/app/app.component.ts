import { Component, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { 
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
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
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
import { TranslateService } from './services/translate.service';
import { NotificacionesService } from './services/notificaciones.service';
import { FoodService } from './services/food';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
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
  
  @ViewChild(IonMenu) menu!: IonMenu;

  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private notificacionesService = inject(NotificacionesService);
  private foodService = inject(FoodService);
  translateService = inject(TranslateService);

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

    this.translateService.langChanged.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  async inicializarNotificaciones() {
    try {
      const status = await LocalNotifications.requestPermissions();
      if (status.display === 'granted') {
        console.log('Permisos de notificación concedidos');
        this.notificacionesService.verificarYNotificarAlertas(this.foodService.getInventario());
      }
    } catch (error) {
      console.error('Error al solicitar permisos:', error);
    }
  }

  closeMenu() {
    this.menu.close();
  }

  cerrarSesion() {
    const usuario = localStorage.getItem('usuarioNeverApp');
    const lang = localStorage.getItem('neverapp_lang');
    localStorage.clear();
    if (usuario) localStorage.setItem('usuarioNeverApp', usuario);
    if (lang) localStorage.setItem('neverapp_lang', lang);
    sessionStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
