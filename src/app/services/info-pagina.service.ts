import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoPaginaService {

  info: any = {};
  loading = false;

  constructor(private http: HttpClient) {
    console.log('info pagina service');
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((resp) => {
        this.loading = true;
        this.info = resp;
        console.log(resp)
        // console.log(resp.twitter);
        
      });
  }
}
