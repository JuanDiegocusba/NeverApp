import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
  IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, 
  IonModal, IonButtons, IonButton, IonInput, 
  IonBadge // Import IonBadge para la alerta visual
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, alertCircleOutline } from 'ionicons/icons'; // <-- 2. Importamos el ícono de advertencia
import { FoodService, Alimento } from '../../services/food';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, 
    IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, 
    IonModal, IonButtons, IonButton, IonInput,
    IonBadge // Registro IonBadge en los componentes Standalone
  ]
})
export class InventarioPage implements OnInit {
  
  private foodService = inject(FoodService);
  public listaAlimentos: Alimento[] = [];

  public isModalOpen = false;
  public nuevoNombre: string = '';
  public nuevaCantidad: number = 1;
  public nuevaFecha: string = '';
  
  // variable para saber si estamos editando un producto existente o creando uno nuevo
  public idAlimentoEditando: number | null = null; 

  constructor() {
    // Registro ambos íconos en el sistema nativo de Ionic
    addIcons({ add, alertCircleOutline });
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  ionViewWillEnter() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.listaAlimentos = this.foodService.getInventario();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //función para el botón flotante (+): Limpia el formulario para una inserción nueva
  abrirNuevoAlimento() {
    this.idAlimentoEditando = null; 
    this.nuevoNombre = '';
    this.nuevaCantidad = 1;
    this.nuevaFecha = '';
    this.setOpen(true);
  }

  // función al tocar un elemento de la lista: Carga los datos para edición
  abrirEditarAlimento(alimento: Alimento) {
    this.idAlimentoEditando = alimento.id;
    this.nuevoNombre = alimento.nombre;
    this.nuevaCantidad = alimento.cantidad;
    
    // Convertimos el objeto Date a formato 'YYYY-MM-DD' para que el input de tipo date pueda pintarlo
    if (alimento.fechaVencimiento) {
      this.nuevaFecha = new Date(alimento.fechaVencimiento).toISOString().split('T')[0];
    } else {
      this.nuevaFecha = '';
    }
    
    this.setOpen(true);
  }

  //  lógica de guardado para que responda a ambas acciones (Crear o Editar)
  guardarAlimento() {
    if (!this.nuevoNombre.trim() || !this.nuevaFecha) {
      alert('Por favor, llena todos los campos');
      return;
    }

    if (this.idAlimentoEditando !== null) {
      // Actualizar un alimento existente
      const alimento = this.foodService.getInventario().find(a => a.id === this.idAlimentoEditando);
      if (alimento) {
        alimento.nombre = this.nuevoNombre;
        alimento.cantidad = this.nuevaCantidad;
        alimento.fechaVencimiento = new Date(this.nuevaFecha);
        
        this.foodService.quitarMarcaRevision(alimento.id);
      }
    } else {
      // CASO B: Crear un registro completamente nuevo (Tu código original)
      this.foodService.agregarAlimento({
        nombre: this.nuevoNombre,
        cantidad: this.nuevaCantidad,
        fechaVencimiento: new Date(this.nuevaFecha)
      });
    }

    this.cerrarModal();
    this.obtenerProductos(); // Sincroniza y refresca la pantalla
  }

  // Centralizacion del cierre para limpiar el estado de edición de forma segura
  cerrarModal() {
    this.setOpen(false);
    this.idAlimentoEditando = null;
  }
}