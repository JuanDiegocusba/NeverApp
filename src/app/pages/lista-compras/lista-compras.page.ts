import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonInput, IonButton, IonIcon, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, checkmarkCircle } from 'ionicons/icons'; 
import { FoodService, ItemCompra } from '../../services/food';
import { TranslateService } from '../../services/translate.service';

@Component({
  selector: 'app-lista-compras',
  templateUrl: './lista-compras.page.html',
  styleUrls: ['./lista-compras.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonInput, IonButton, IonIcon, IonButtons, IonMenuButton
  ]
})
export class ListaComprasPage implements OnInit {

  private foodService = inject(FoodService);
  private cdr = inject(ChangeDetectorRef);
  translateService = inject(TranslateService);
  
  public articulosCompra: ItemCompra[] = [];
  public nuevoItemNombre: string = '';

  constructor() {
    addIcons({ add, checkmarkCircle });
    this.translateService.langChanged.subscribe(() => {
      this.cdr.detectChanges();
    });
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
