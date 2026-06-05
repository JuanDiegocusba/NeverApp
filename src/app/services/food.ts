import { Injectable } from '@angular/core';

// 1. Interfaz actualizada con la propiedad opcional para la alerta visual
export interface Alimento {
  id: number;
  nombre: string;
  cantidad: number;
  fechaVencimiento: Date;
  pendienteRevisar?: boolean; // <-- Identifica productos que necesitan revisión de fecha
}

// Nueva interfaz adaptada para la lista de compras
export interface ItemCompra {
  id: number;
  nombre: string;
  comprado: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  // Tus datos de prueba originales intactos
  private inventario: Alimento[] = [
    { id: 1, nombre: 'Leche Alquería', cantidad: 1, fechaVencimiento: new Date('2026-06-06') },
    { id: 2, nombre: 'Huevos A', cantidad: 3, fechaVencimiento: new Date('2026-06-12') },
    { id: 3, nombre: 'Pechuga de Pollo', cantidad: 2, fechaVencimiento: new Date('2026-06-05') },
    { id: 4, nombre: 'Yogurt Griego', cantidad: 5, fechaVencimiento: new Date('2026-06-20') },
    { id: 5, nombre: 'Tomates', cantidad: 1, fechaVencimiento: new Date('2026-06-07') }
  ];

  // Nueva lista en memoria para artículos agregados a mano
  private listaCompras: ItemCompra[] = [
    { id: 1, nombre: 'Arroz', comprado: false },
    { id: 2, nombre: 'Aceite', comprado: true }
  ];

  constructor() { }

  // --- TUS FUNCIONES ORIGINALES (INTACTAS) ---
  getInventario(): Alimento[] {
    return this.inventario;
  }

  agregarAlimento(alimento: Omit<Alimento, 'id'>) {
    const nuevoAlimento: Alimento = {
      ...alimento,
      id: this.inventario.length > 0 ? Math.max(...this.inventario.map(a => a.id)) + 1 : 1
    };
    this.inventario.push(nuevoAlimento);
  }

  getTotalAlmacenados(): number {
    return this.inventario.reduce((total, producto) => total + producto.cantidad, 0);
  }

  getProductosPocasUnidades(): Alimento[] {
    return this.inventario.filter(producto => producto.cantidad <= 2);
  }

  getProductosProximosAVencer(): Alimento[] {
    const hoy = new Date();
    const tresDiasDespues = new Date();
    tresDiasDespues.setDate(hoy.getDate() + 3);

    return this.inventario.filter(producto => {
      return producto.fechaVencimiento >= hoy && producto.fechaVencimiento <= tresDiasDespues;
    });
  }

  // --- NUEVOS MÉTODOS ADAPTADOS PARA LA LISTA DE COMPRAS ---

  getListaCompras(): ItemCompra[] {
    // 1. Buscamos de forma inteligente si hay alimentos en el inventario con cantidad igual a 0
    const agotadosDelInventario: ItemCompra[] = this.inventario
      .filter(producto => producto.cantidad === 0)
      .map((producto, index) => ({
        id: 999 + index, 
        nombre: `${producto.nombre} (Agotado en nevera)`,
        comprado: false
      }));

    // 2. Unimos los artículos manuales con los automáticamente agotados
    return [...this.listaCompras, ...agotadosDelInventario];
  }

  agregarItemCompra(nombre: string) {
    const nuevoItem: ItemCompra = {
      id: this.listaCompras.length > 0 ? Math.max(...this.listaCompras.map(i => i.id)) + 1 : 1,
      nombre,
      comprado: false
    };
    this.listaCompras.push(nuevoItem);
  }

  alternarEstadoCompra(id: number) {
    const item = this.listaCompras.find(i => i.id === id);
    if (item) {
      item.comprado = !item.comprado;
    }
  }

  procesarCompra() {
    // 1. Filtramos solo los artículos manuales que fueron chuleados
    const comprados = this.listaCompras.filter(item => item.comprado);

    comprados.forEach(item => {
      // 2. Buscamos si el alimento ya existe en el inventario
      const alimentoExistente = this.inventario.find(
        a => a.nombre.toLowerCase() === item.nombre.toLowerCase()
      );

      if (alimentoExistente) {
        // Si ya existe, le sumamos la unidad y lo marcamos para revisar su nueva fecha
        alimentoExistente.cantidad += 1;
        alimentoExistente.pendienteRevisar = true; 
      } else {
        // Si no existe, lo creamos con la fecha de hoy provisional y activamos la alerta de revisión
        this.agregarAlimento({
          nombre: item.nombre,
          cantidad: 1,
          fechaVencimiento: new Date(), // Fecha actual temporal
          pendienteRevisar: true       // <-- Marca activada
        });
      }
    });

    // 3. Limpiamos de la lista de compras los artículos que ya procesamos
    this.listaCompras = this.listaCompras.filter(item => !item.comprado);
  }

  // 3. NUEVO MÉTODO: Para remover la alerta cuando el usuario actualice la fecha desde el inventario
  quitarMarcaRevision(id: number) {
    const alimento = this.inventario.find(a => a.id === id);
    if (alimento) {
      alimento.pendienteRevisar = false;
    }
  }
}