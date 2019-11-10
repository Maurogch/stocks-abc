import { ArticlesMean } from './../../../models/articles-mean';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../services/articles.service';

@Component({
  selector: 'ngx-smart-table-arts1',
  templateUrl: './smart-table-arts1.component.html',
  styleUrls: ['./smart-table-arts1.component.scss']
})
export class SmartTableArts1Component implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      code: {
        title: 'Código',
        type: 'number'
      },
      name: {
        title: 'Nombre',
        type: 'string'
      },
      price: {
        title: 'Precio',
        valuePrepareFunction: value => {
          // Set $ to column
          return value === 'Total'
            ? value
            : Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value);
        }
      },
      supplier: {
        title: 'Demanda promedio',
        type: 'number'
      },
      mean: {
        title: 'Demanda promedio',
        type: 'number'
      },
      stock: {
        title: 'Stock',
        type: 'number'
      },
      zone: {
        title: 'Zona',
        type: 'string'
      }
    }
  };

  source = [];

  constructor(private service: ArticlesService) {}

  ngOnInit() {
    this.service.getAll().subscribe(data => {
      this.source = data as ArticlesMean[];
    });
  }

  onEditConfirm(event): void {
    console.log(event);
    const values = {};
    const zone = event.newData.zone;

    if (zone === 'A' || zone === 'B' || zone === 'C') {
      values['zone'] = zone;

      this.service.patchZone(event.newData.id, values).subscribe(
        response => {
          event.confirm.resolve();
        },
        err => {
          console.log(err);
          window.confirm('Error al modificar');
          event.confirm.reject();
        }
      );
    } else {
      window.confirm('Caracter inválido, debe ser A, B o C');
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      console.log('entre');
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
