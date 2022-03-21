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
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise<void>((resolve, reject) => {
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
          resolve();
        });
    });
  }

  getProducto(id: string) {
    return this.http.get<ProductoDescripcion>(
      `https://angular-html-3686c-default-rtdb.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (!this.productos.length) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar despues de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar filtro
      this.filtrarProductos(termino);
    }
    

    console.log(this.productosFiltrado);
  }

  private filtrarProductos(termino: string) {
    // this.productosFiltrado = this.productos.filter((producto) => {
    //   return true;
    // });
    console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    })
  }
}
