import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, checkmarkCircle } from 'ionicons/icons'; // <-- Importamos el nuevo ícono aquí
import { FoodService, ItemCompra } from '../../services/food';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.page.html',
  styleUrls: ['./lista-compras.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonInput, IonButton, IonIcon
  ]
})
export class ListaComprasPage implements OnInit {

  private foodService = inject(FoodService);
  
  public articulosCompra: ItemCompra[] = [];
  public nuevoItemNombre: string = '';

  constructor() {
    // Registramos ambos íconos en el sistema Standalone
    addIcons({ add, checkmarkCircle });
  }

  ngOnInit() {
    this.cargarLista();
  }

  ionViewWillEnter() {
    this.cargarLista();
  }

  cargarLista() {
    this.articulosCompra = this.foodService.getListaCompras();
  }

  agregarArticulo() {
    if (!this.nuevoItemNombre.trim()) return;
    
    this.foodService.agregarItemCompra(this.nuevoItemNombre);
    this.nuevoItemNombre = '';
    this.cargarLista();
  }

  marcarComprado(id: number) {
    this.foodService.alternarEstadoCompra(id);
    this.cargarLista();
  }

  finalizarCompra() {
    this.foodService.procesarCompra();
    this.cargarLista();
  }
}