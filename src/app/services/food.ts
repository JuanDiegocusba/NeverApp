import { Injectable } from '@angular/core';

export interface Alimento {
  id: number;
  nombre: string;
  cantidad: number;
  fechaVencimiento: Date;
  categoria?: string;
  pendienteRevisar?: boolean;
}

export interface ItemCompra {
  id: number;
  nombre: string;
  comprado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private inventario: Alimento[] = [
    {
      id: 1,
      nombre: 'Leche Alquería',
      cantidad: 1,
      fechaVencimiento: new Date('2026-06-06'),
      categoria: 'Lácteos',
    },
    {
      id: 2,
      nombre: 'Huevos A',
      cantidad: 3,
      fechaVencimiento: new Date('2026-06-12'),
      categoria: 'Carnes y Proteínas',
    },
    {
      id: 3,
      nombre: 'Pechuga de Pollo',
      cantidad: 2,
      fechaVencimiento: new Date('2026-06-05'),
      categoria: 'Carnes y Proteínas',
    },
    {
      id: 4,
      nombre: 'Yogurt Griego',
      cantidad: 5,
      fechaVencimiento: new Date('2026-06-20'),
      categoria: 'Lácteos',
    },
    {
      id: 5,
      nombre: 'Tomates',
      cantidad: 1,
      fechaVencimiento: new Date('2026-06-07'),
      categoria: 'Verduras',
    },
  ];

  private listaCompras: ItemCompra[] = [
    { id: 1, nombre: 'Arroz', comprado: false },
    { id: 2, nombre: 'Aceite', comprado: true },
  ];

  constructor() {}

  getInventario(): Alimento[] {
    return this.inventario;
  }

  agregarAlimento(alimento: Omit<Alimento, 'id'>) {
    const nuevoAlimento: Alimento = {
      ...alimento,
      id:
        this.inventario.length > 0
          ? Math.max(...this.inventario.map((a) => a.id)) + 1
          : 1,
    };

    this.inventario.push(nuevoAlimento);
  }

  getTotalAlmacenados(): number {
    return this.inventario.reduce((total, p) => total + p.cantidad, 0);
  }

  getProductosPocasUnidades(): Alimento[] {
    return this.inventario.filter((p) => p.cantidad <= 2);
  }

  getProductosProximosAVencer(): Alimento[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const limiteTresDias = new Date(hoy);
    limiteTresDias.setDate(hoy.getDate() + 3);

    return this.inventario.filter((p) => {
      if (!p.fechaVencimiento) return false;

      const vencimiento = new Date(p.fechaVencimiento);
      vencimiento.setHours(0, 0, 0, 0);
      return vencimiento.getTime() <= limiteTresDias.getTime();
    });
  }

  getProductosVencidos(): Alimento[] {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.inventario.filter((p) => {
      if (!p.fechaVencimiento) return false;
      
      const vencimiento = new Date(p.fechaVencimiento);
      vencimiento.setHours(0, 0, 0, 0);
      
      return vencimiento.getTime() < hoy.getTime();
    });
  }

  getConteoPorCategoria() {
    const conteo: { [key: string]: number } = {};

    this.inventario.forEach((alimento) => {
      const cat = (alimento.categoria || 'Sin categoría').trim();

      if (!conteo[cat]) {
        conteo[cat] = 0;
      }

      conteo[cat]++;
    });

    return conteo;
  }

  getListaCompras(): ItemCompra[] {
    const agotados = this.inventario
      .filter((p) => p.cantidad === 0)
      .map((p, i) => ({
        id: 999 + i,
        nombre: `${p.nombre} (Agotado en nevera)`,
        comprado: false,
      }));

    return [...this.listaCompras, ...agotados];
  }

  agregarItemCompra(nombre: string) {
    const nuevo: ItemCompra = {
      id:
        this.listaCompras.length > 0
          ? Math.max(...this.listaCompras.map((i) => i.id)) + 1
          : 1,
      nombre,
      comprado: false,
    };

    this.listaCompras.push(nuevo);
  }

  alternarEstadoCompra(id: number) {
    const item = this.listaCompras.find((i) => i.id === id);
    if (item) item.comprado = !item.comprado;
  }

 procesarCompra() {
    const comprados = this.listaCompras.filter((i) => i.comprado);

    comprados.forEach((item) => {
      const existente = this.inventario.find(
        (a) => a.nombre.toLowerCase() === item.nombre.toLowerCase(),
      );

      if (existente) {
        existente.cantidad += 1;
        existente.pendienteRevisar = true;
      } else {
        this.agregarAlimento({
          nombre: item.nombre,
          cantidad: 1,
          fechaVencimiento: new Date(),
          categoria: 'Sin categoría', 
          pendienteRevisar: true,
        });
      }
    });

    this.listaCompras = this.listaCompras.filter((i) => !i.comprado);
  }

  quitarMarcaRevision(id: number) {
    const alimento = this.inventario.find((a) => a.id === id);
    if (alimento) {
      alimento.pendienteRevisar = false;
    }
  }
}