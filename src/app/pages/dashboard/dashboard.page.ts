import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { FoodService } from '../../services/food';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  // Dejamos solo los componentes de Ionic que realmente usas en tu HTML
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class DashboardPage implements OnInit {
  
  private foodService = inject(FoodService);

  public totalProductos: number = 0;
  public pocasUnidades: number = 0;
  public proximosVencer: number = 0;

  constructor() { }

  ngOnInit() {
    this.cargarResumen();
  }

  ionViewWillEnter() {
    this.cargarResumen();
  }

  cargarResumen() {
    this.totalProductos = this.foodService.getTotalAlmacenados();
    this.pocasUnidades = this.foodService.getProductosPocasUnidades().length;
    this.proximosVencer = this.foodService.getProductosProximosAVencer().length;
  }
}