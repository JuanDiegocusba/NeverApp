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
  IonButtons,     
  IonMenuButton,   
  IonIcon         // <-- Agregado para los iconos de las tarjetas estilizadas
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
    IonButtons,     
    IonMenuButton,   
    IonIcon       // <-- Agregado en los imports del componente
  ]
})
export class DashboardPage implements OnInit {
  
  private foodService = inject(FoodService);

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
    // Obtenemos el arreglo base con todos los productos registrados (filas)
    const inventario = this.foodService.getInventario();
    
    // Configuración de fechas para la evaluación de vencimientos
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const limiteProximos = new Date();
    limiteProximos.setDate(hoy.getDate() + 3);
    limiteProximos.setHours(23, 59, 59, 999);

    this.totalProductos = inventario.length;

    this.pocasUnidades = inventario.filter(alimento => alimento.cantidad <= 2).length;

    this.proximosVencer = inventario.filter(alimento => {
      const fechaVence = new Date(alimento.fechaVencimiento);
      return fechaVence >= hoy && fechaVence <= limiteProximos;
    }).length;

    this.productosVencidos = inventario.filter(alimento => {
      const fechaVence = new Date(alimento.fechaVencimiento);
      return fechaVence < hoy;
    }).length;
  }
}