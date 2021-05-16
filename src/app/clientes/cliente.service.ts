import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';
import  swal from 'sweetalert2';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
private urlEndPoint:string  = 'http://localhost:8080/api/clientes';
private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient,private router:Router) { }

  getClientes():Observable<Cliente[]>{
     return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[]
      )
    )
  }

// crear registro en abase de datos esto se realiza con un objeto cliente
  create (cliente:Cliente):Observable<Cliente>{
    return this.http.post(this.urlEndPoint,cliente,{headers:this.httpHeaders}).pipe(
      map( (response : any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        // swal.fire('error al agregar registro a la bdd',e.error.mensaje,'error');
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }

  // listar registro en base de datos esto se realiza con un objeto any funciona de la misma manera que el anterior
  // pero luego en el front se debe transormar para que se visualice el mensaje ambos mensajes  
  getCliente(id: any):Observable<any>{
    return this.http.get<any>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
      swal.fire(e.error.mensaje,e.error.error,'error');
      return throwError(e);
      })
    );
  }


// modificar registro en base de datos
  update (cliente:Cliente): Observable <any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
  }


// eliminar registro en base de datos
  delete (id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e=>{
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');
        return throwError(e);
      })
    );
    }
}
