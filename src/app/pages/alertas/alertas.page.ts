import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  warningOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import { FoodService, Alimento } from '../../services/food';
import { NotificacionesService } from '../../services/notificaciones.service';
import { TranslateService } from '../../services/translate.service';

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
    IonButtons,
    IonMenuButton,
    CommonModule,
    FormsModule,
  ],
})
export class AlertasPage implements OnInit {
  private foodService = inject(FoodService);
  private notificacionesService = inject(NotificacionesService);
  private cdr = inject(ChangeDetectorRef);
  translateService = inject(TranslateService);

  public productosAlertas: Alimento[] = [];
  public today = new Date();

  constructor() {
    addIcons({ warningOutline, checkmarkCircleOutline, alertCircleOutline });
    this.translateService.langChanged.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.cargarAlertas();
  }

  ionViewWillEnter() {
    this.cargarAlertas();
    this.notificacionesService.verificarYNotificarAlertas(this.foodService.getInventario());
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
