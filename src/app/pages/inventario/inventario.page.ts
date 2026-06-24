import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  IonMenuButton,
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
import { TranslateService } from '../../services/translate.service';

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
    IonMenuButton,
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
  private cdr = inject(ChangeDetectorRef);
  translateService = inject(TranslateService);

  public listaAlimentos: Alimento[] = [];
  public isModalOpen = false;

  public nuevoNombre: string = '';
  public nuevaCantidad: number = 1;
  public nuevaFecha: string = '';
  public nuevaCategoria: string = '';

  public idAlimentoEditando: number | null = null;
  public conteoCategorias: any = {};
  public textoBuscar: string = '';

  constructor() {
    addIcons({ add, alertCircleOutline });
    this.translateService.langChanged.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  ionViewWillEnter() {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos() {
    const inventarioCompleto = this.foodService.getInventario();

    if (!this.textoBuscar.trim()) {
      this.listaAlimentos = inventarioCompleto;
    } else {
      const termino = this.textoBuscar.toLowerCase().trim();
      this.listaAlimentos = inventarioCompleto.filter(alimento => 
        alimento.nombre.toLowerCase().includes(termino)
      );
    }
  }

  filtrarAlimentos(event: any) {
    this.textoBuscar = event.detail.value || '';
    this.obtenerProductos();
  }

  obtenerCategorias() {
    this.conteoCategorias = this.foodService.getConteoPorCategoria();
  }

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
    this.nuevaCategoria = alimento.categoria || 'Sin categoría';
    
    if (alimento.fechaVencimiento) {
      this.nuevaFecha = new Date(alimento.fechaVencimiento).toISOString().split('T')[0];
    } else {
      this.nuevaFecha = '';
    }
    
    this.setOpen(true);
  }

  guardarAlimento() {
    if (!this.nuevoNombre.trim() || !this.nuevaFecha) {
      alert(this.translateService.t('inventory.fillFields'));
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
        this.notificacionesService.programarAlertaVencimiento(alimento);
      }
    } else {
      const nuevoAlimento = {
        nombre: this.nuevoNombre,
        cantidad: this.nuevaCantidad,
        categoria: this.nuevaCategoria || 'Sin categoría',
        fechaVencimiento: new Date(this.nuevaFecha),
      };

      this.foodService.agregarAlimento(nuevoAlimento);

      const agregado = this.foodService.getInventario().find(
        a => a.nombre === nuevoAlimento.nombre && 
        new Date(a.fechaVencimiento).getTime() === nuevoAlimento.fechaVencimiento.getTime()
      );
      
      if (agregado) {
        this.notificacionesService.programarAlertaVencimiento(agregado);
      }
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
