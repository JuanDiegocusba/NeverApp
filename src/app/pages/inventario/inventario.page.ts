import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
  IonButtons,
  IonButton,
  IonInput,
  IonBadge,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { add, alertCircleOutline } from 'ionicons/icons';
import { FoodService, Alimento } from '../../services/food';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonButtons,
    IonButton,
    IonInput,
    IonBadge,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
  ],
})
export class InventarioPage implements OnInit {
  private foodService = inject(FoodService);
  private notificacionesService = inject(NotificacionesService);

  public listaAlimentos: Alimento[] = [];

  public isModalOpen = false;

  public nuevoNombre: string = '';
  public nuevaCantidad: number = 1;
  public nuevaFecha: string = '';
  public nuevaCategoria: string = '';

  public idAlimentoEditando: number | null = null;

  public conteoCategorias: any = {};

  constructor() {
    addIcons({ add, alertCircleOutline });
  }

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  ionViewWillEnter() {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  // =========================
  // PRODUCTOS
  // =========================
  obtenerProductos() {
    this.listaAlimentos = this.foodService.getInventario();
  }

  // =========================
  // CATEGORÍAS
  // =========================
  obtenerCategorias() {
    this.conteoCategorias = this.foodService.getConteoPorCategoria();
  }

  // =========================
  // MODAL
  // =========================
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  abrirNuevoAlimento() {
    this.idAlimentoEditando = null;
    this.nuevoNombre = '';
    this.nuevaCantidad = 1;
    this.nuevaFecha = '';
    this.nuevaCategoria = '';
    this.setOpen(true);
  }

  abrirEditarAlimento(alimento: Alimento) {
    this.idAlimentoEditando = alimento.id;
    this.nuevoNombre = alimento.nombre;
    this.nuevaCantidad = alimento.cantidad;
    this.nuevaCategoria = alimento.categoria || '';

    this.nuevaFecha = alimento.fechaVencimiento
      ? new Date(alimento.fechaVencimiento).toISOString().split('T')[0]
      : '';

    this.setOpen(true);
  }

  guardarAlimento() {
    if (!this.nuevoNombre.trim() || !this.nuevaFecha) {
      alert('Por favor, llena todos los campos');
      return;
    }

    if (this.idAlimentoEditando !== null) {
      const alimento = this.foodService
        .getInventario()
        .find((a) => a.id === this.idAlimentoEditando);
      if (alimento) {
        alimento.nombre = this.nuevoNombre;
        alimento.cantidad = this.nuevaCantidad;
        alimento.categoria = this.nuevaCategoria;
        alimento.fechaVencimiento = new Date(this.nuevaFecha);
        this.foodService.quitarMarcaRevision(alimento.id);

        // 2. Reprogramar alerta al actualizar
        this.notificacionesService.programarAlertaVencimiento(alimento);
      }
    } else {
      // Cuando es un producto NUEVO
      const nuevoAlimento = {
        nombre: this.nuevoNombre,
        cantidad: this.nuevaCantidad,
        categoria: this.nuevaCategoria,
        fechaVencimiento: new Date(this.nuevaFecha),
      };

      this.foodService.agregarAlimento(nuevoAlimento);

      // 3. ¡PROGRAMAR LA NOTIFICACIÓN PUSH!
      this.notificacionesService.programarAlertaVencimiento(nuevoAlimento);
    }

    this.cerrarModal();
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  cerrarModal() {
    this.setOpen(false);
    this.idAlimentoEditando = null;
  }
}
