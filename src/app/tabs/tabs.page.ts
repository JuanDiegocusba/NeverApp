import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import {
  homeOutline,
  cubeOutline,
  cartOutline,
  notificationsOutline,
  settingsOutline,
  warningOutline,
  pricetagOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({
      'home-outline': homeOutline,
      'cube-outline': cubeOutline,
      'cart-outline': cartOutline,
      'notifications-outline': notificationsOutline,
      'settings-outline': settingsOutline,
      'warning-outline': warningOutline,
      'pricetag-outline': pricetagOutline
    });
  }
}