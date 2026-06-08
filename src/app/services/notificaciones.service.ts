import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  constructor() {
    this.solicitarPermisos();
  }

  async solicitarPermisos() {
    const status = await LocalNotifications.requestPermissions();
    if (status.display !== 'granted') {
      console.warn('Permisos denegados');
    }
  }

  async programarAlertaVencimiento(producto: any) {
    const fechaVencimiento = new Date(producto.fechaVencimiento);
    const fechaAlerta = new Date(fechaVencimiento);
    // Programamos la alerta para que suene 2 días antes de vencer
    fechaAlerta.setDate(fechaAlerta.getDate() - 2);

    if (fechaAlerta > new Date()) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '¡Alimento próximo a vencer! 🍎',
            body: `Tu producto "${producto.nombre}" vencerá el ${fechaVencimiento.toLocaleDateString()}.`,
            id: Math.floor(Math.random() * 100000), // ID aleatorio para la alerta
            schedule: { at: fechaAlerta },
          },
        ],
      });
      console.log(`Notificación push programada para: ${producto.nombre}`);
    }
  }
}
