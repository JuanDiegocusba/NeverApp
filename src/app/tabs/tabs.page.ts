import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
// 1. Agregamos "warningOutline" a las importaciones de arriba
import { homeOutline, cubeOutline, cartOutline, notificationsOutline, settingsOutline, warningOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // 2. Registramos "warning-outline" mapeado a su respectivo objeto importado
    addIcons({ 
      'home-outline': homeOutline, 
      'cube-outline': cubeOutline, 
      'cart-outline': cartOutline, 
      'notifications-outline': notificationsOutline, 
      'settings-outline': settingsOutline,
      'warning-outline': warningOutline // <-- ¡ESTA ES LA LÍNEA MÁGICA!
    });
  }
}