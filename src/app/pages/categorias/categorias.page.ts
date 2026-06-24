import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

import { FoodService } from '../../services/food';
import { TranslateService } from '../../services/translate.service';

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
  IonMenuButton,
  IonButton,
  IonInput,
  IonFab,
  IonFabButton,
  IonIcon,
  IonBadge
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
    IonMenuButton,
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
  private cdr = inject(ChangeDetectorRef);
  translateService = inject(TranslateService);

  isModalOpen = false;
  nuevaCategoria = '';

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
    this.translateService.langChanged.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.cargarConteo();
  }

  ionViewWillEnter() {
    this.cargarConteo();
  }

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
