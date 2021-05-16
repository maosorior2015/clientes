import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Router,ActivatedRoute } from '@angular/router';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: String ="Crear Clientes"

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.cargarCliente()
  }
  cargarCliente():void{
      this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if (id){
        this.clienteService.getCliente(id).subscribe((cliente=> this.cliente = cliente))
      }
    })
  }

   create(): void{
   this.clienteService.create(this.cliente).subscribe(
     cliente => {
       this.router.navigate(['/clientes'])
       Swal.fire('Nuevo Cliente',`el cliente ${cliente.nombre} ${cliente.apellido} ha sido creado con exito` ,'success')
     }
   )
 }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado',`${json.mensaje} ${json.cliente.nombre} ${json.cliente.apellido}` ,'success')
    })
  }

}
