import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];
  constructor(private ClienteService: ClienteService) { }

  ngOnInit() {
     this.ClienteService.getClientes().subscribe(
       clientes => this.clientes = clientes
   );
  }
  delete(cliente:Cliente):void{
    Swal.fire({
      title: 'Esta Seguro?',
      text: `Seguro desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText:'No, Cancelar'
    }).then((result) => {
      if (result.value) {
        this.ClienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)

            Swal.fire(
              'Eliminado!',
              'Su registro a sido correctamente Eliminado.',
              'success'
            )
          }
        )

      }
    })
  }

}
