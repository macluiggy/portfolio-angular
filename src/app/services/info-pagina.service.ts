import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {

  info: InfoPagina = {}
  loading = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) {
    console.log('info pagina service');
    this.cargarEquipo();
    this.cargarInfo();
  }

  private cargarInfo() {
    // leer el archivo JSON
    this.http
      .get<InfoPagina>('assets/data/data-pagina.json')
      .subscribe((resp) => {
        this.loading = true;
        this.info = resp;
        // console.log(resp)
        // console.log(resp.twitter);
        
      });
  }

  private cargarEquipo() {
    this.http
      .get<any[]>('https://angular-html-3686c-default-rtdb.firebaseio.com/equipo.json')
      .subscribe((resp) => {
        this.equipo = resp;
        // console.log(resp);
      });
  }
}
