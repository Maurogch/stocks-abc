import { ArticlesMean } from './../../../models/articles-mean';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
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
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number'
      },
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
        type: 'string'
      },
      mean: {
        title: 'Venta promedio',
        type: 'number'
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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
