import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoDescripcion } from '../interfaces/producto-descriipcion.interface';
import { Producto } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    this.http
      .get<Producto[]>(
        'https://angular-html-3686c-default-rtdb.firebaseio.com/productos_idx.json'
      )
      .subscribe((resp) => {
        // console.log(resp);
        this.productos = resp;
        setTimeout(() => {
          this.cargando = false;
        }, 2000);
      });
  }

  getProducto(id: string) {
    return this.http.get<ProductoDescripcion>(`https://angular-html-3686c-default-rtdb.firebaseio.com/productos/${id}.json`)
  }
}
