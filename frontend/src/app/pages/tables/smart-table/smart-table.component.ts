import { ArticlePq } from './../../../models/article-pq';
import { ArticlesService } from './../../../services/articles.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class SmartTableComponent implements OnInit {
  settingsQ = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    actions: {
      add: false,
      edit: false
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
      supplier: {
        title: 'Proveedor',
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
      stock: {
        title: 'Stock',
        type: 'number'
      },
      securityReserve: {
        title: 'Reserva de seguridad',
        type: 'number'
      },
      optimalLot: {
        title: 'Lote Optimo',
        type: 'number'
      },
      reorderPoint: {
        title: 'Punto de reorden',
        type: 'number'
      },
      annualManteinanceCost: {
        title: 'Coste de mantenimiento anual',
        valuePrepareFunction: value => {
          // Set $ to column
          return value === 'Total'
            ? value
            : Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value);
        }
      }
    }
  };

  settingsP = {
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    actions: {
      add: false,
      edit: false
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
      supplier: {
        title: 'Proveedor',
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
      stock: {
        title: 'Stock',
        type: 'number'
      },
      securityReserve: {
        title: 'Reserva de seguridad',
        type: 'number'
      },
      optimalLot: {
        title: 'Lote Optimo',
        type: 'number'
      },
      nextRevition: {
        title: 'Próxima Revisión',
        type: 'Date'
      },
      annualManteinanceCost: {
        title: 'Coste de mantenimiento anual',
        valuePrepareFunction: value => {
          // Set $ to column
          return value === 'Total'
            ? value
            : Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(value);
        }
      }
    }
  };

  sourceQ = [];
  sourceP = [];

  constructor(private service: ArticlesService) {}

  ngOnInit() {
    this.service.getAllModelQ().subscribe(data => {
      this.sourceQ = data as ArticlePq[];
    });
    this.service.getAllModelP().subscribe(data => {
      this.sourceP = data as ArticlePq[];
    });
  }

  onDeleteConfirmP(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirmQ(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
