import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import { FoodService, Alimento } from '../../services/food';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonBadge,
    CommonModule,
    FormsModule,
  ],
})
export class AlertasPage implements OnInit {
  private foodService = inject(FoodService);

  public productosAlertas: Alimento[] = [];
  public today = new Date();

  constructor() {
    addIcons({ warningOutline, checkmarkCircleOutline, alertCircleOutline });
  }

  ngOnInit() {
    this.cargarAlertas();
  }

  ionViewWillEnter() {
    this.cargarAlertas();
  }

  cargarAlertas() {
    const proximosAVencer = this.foodService.getProductosProximosAVencer();
    const vencidos = this.foodService.getProductosVencidos();
    const listaConDuplicados = [...proximosAVencer, ...vencidos];

    const mapaUnicos = new Map();
    
    listaConDuplicados.forEach(alimento => {
      const llaveUnica = alimento.id || `${alimento.nombre.toLowerCase()}-${alimento.fechaVencimiento}`;
      
      if (!mapaUnicos.has(llaveUnica)) {
        mapaUnicos.set(llaveUnica, alimento);
      }
    });

    this.productosAlertas = Array.from(mapaUnicos.values());
  }
}
