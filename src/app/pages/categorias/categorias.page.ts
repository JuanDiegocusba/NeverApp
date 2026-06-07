import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

import { FoodService } from '../../services/food';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonModal,
  IonButtons,
  IonButton,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonBadge   // 👈 IMPORTANTE
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonModal,
    IonButtons,
    IonButton,
    IonInput,
    IonFab,
    IonFabButton,
    IonIcon,
    IonBadge,
    CommonModule,
    FormsModule
  ]
})
export class CategoriasPage implements OnInit {

  private foodService = inject(FoodService);

  isModalOpen = false;
  nuevaCategoria = '';

  // 🔥 AQUÍ está el cambio clave
  conteoCategorias: any = {};

  categorias: string[] = [
    'Lácteos',
    'Frutas',
    'Verduras',
    'Carnes y Proteínas',
    'Granos'
  ];

  constructor() {
    addIcons({ add });
  }

  ngOnInit() {
    this.cargarConteo();
  }

  ionViewWillEnter() {
    this.cargarConteo();
  }

  // 🔥 CARGA DATOS DEL INVENTARIO
  cargarConteo() {
    this.conteoCategorias = this.foodService.getConteoPorCategoria();
  }

  abrirModal() {
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  guardarCategoria() {
    if (this.nuevaCategoria.trim()) {
      this.categorias.push(this.nuevaCategoria);
      this.nuevaCategoria = '';
      this.cerrarModal();
    }
  }
}