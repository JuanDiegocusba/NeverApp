import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle,
} from '@ionic/angular/standalone';
import { FoodService } from '../../services/food';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCardTitle,
  ]
})
export class DashboardPage implements OnInit {
  
  private foodService = inject(FoodService);

  // Variables mapped con los nombres que usaremos en la interfaz
  public totalProductos: number = 0;
  public pocasUnidades: number = 0;
  public proximosVencer: number = 0;
  public productosVencidos: number = 0; 

  constructor() { }

  ngOnInit() {
    this.cargarResumen();
  }

  ionViewWillEnter() {
    this.cargarResumen();
  }
  cargarResumen() {
    const inventario = this.foodService.getInventario();
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Normalizar fecha de control actual

    // 1. Obtener los totales procesados por tus métodos del servicio
    this.totalProductos = this.foodService.getTotalAlmacenados();
    this.pocasUnidades = this.foodService.getProductosPocasUnidades().length;
    this.proximosVencer = this.foodService.getProductosProximosAVencer().length;

    this.productosVencidos = inventario.filter(alimento => {
      const fechaVence = new Date(alimento.fechaVencimiento);
      return fechaVence < hoy;
    }).length;
  }
}