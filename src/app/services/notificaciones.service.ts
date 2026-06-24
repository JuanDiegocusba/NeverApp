import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Alimento } from './food';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private notifId = 1;

  constructor() {}

  async solicitarPermisos() {
    const status = await LocalNotifications.requestPermissions();
    if (status.display !== 'granted') {
      console.warn('Permisos de notificación denegados');
    }
  }

  notificacionesActivas(): boolean {
    return localStorage.getItem('neverapp_notifications') === 'true';
  }

  async enviarNotificacionAhora(title: string, body: string) {
    if (!this.notificacionesActivas()) return;
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title,
            body,
            id: this.notifId++,
            schedule: { at: new Date() },
          },
        ],
      });
    } catch (error) {
      console.error('Error al enviar notificación:', error);
    }
  }

  async verificarYNotificarAlertas(inventario: Alimento[]) {
    if (!this.notificacionesActivas() || inventario.length === 0) return;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const vencidos = inventario.filter((p) => {
      const v = new Date(p.fechaVencimiento);
      v.setHours(0, 0, 0, 0);
      return v.getTime() < hoy.getTime();
    });

    const limite = new Date(hoy);
    limite.setDate(hoy.getDate() + 3);
    const proximos = inventario.filter((p) => {
      const v = new Date(p.fechaVencimiento);
      v.setHours(0, 0, 0, 0);
      return v >= hoy && v <= limite;
    });

    const pocos = inventario.filter((p) => p.cantidad <= 2);

    if (vencidos.length > 0) {
      await this.enviarNotificacionAhora(
        'NeverApp - Productos vencidos',
        `Tienes ${vencidos.length} producto${vencidos.length !== 1 ? 's' : ''} vencido${vencidos.length !== 1 ? 's' : ''}. ${vencidos.map(v => v.nombre).join(', ')}`
      );
    }

    if (proximos.length > 0) {
      await this.enviarNotificacionAhora(
        'NeverApp - Próximos a vencer',
        `${proximos.length} producto${proximos.length !== 1 ? 's' : ''} está${proximos.length !== 1 ? 'n' : ''} por vencer en los próximos 3 días.`
      );
    }

    if (pocos.length > 0) {
      await this.enviarNotificacionAhora(
        'NeverApp - Pocas unidades',
        `${pocos.length} producto${pocos.length !== 1 ? 's' : ''} tiene${pocos.length !== 1 ? 'n' : ''} pocas unidades (${pocos.map(p => `${p.nombre}: ${p.cantidad}`).join(', ')}).`
      );
    }
  }

  async programarAlertaVencimiento(producto: Alimento) {
    if (!this.notificacionesActivas()) return;

    const fechaVencimiento = new Date(producto.fechaVencimiento);
    const fechaAlerta = new Date(fechaVencimiento);
    fechaAlerta.setDate(fechaAlerta.getDate() - 2);

    if (fechaAlerta > new Date()) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'NeverApp - Alimento próximo a vencer',
            body: `"${producto.nombre}" vencerá el ${fechaVencimiento.toLocaleDateString()}. Revisa tu inventario.`,
            id: producto.id + 1000,
            schedule: { at: fechaAlerta },
          },
        ],
      });
    }
  }
}
