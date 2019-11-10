import { ArticlePq } from './../../../models/article-pq';
import { ArticlesService } from './../../../services/articles.service';
import { Component, OnInit } from '@angular/core';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService
} from '@nebular/theme';
import 'style-loader!angular2-toaster/toaster.css';

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

  constructor(
    private service: ArticlesService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.service.getAllModelQ().subscribe(data => {
      this.sourceQ = data as ArticlePq[];
      this.sourceQ.forEach((article: ArticlePq) => {
        if (article.stock - article.securityReserve <= article.reorderPoint) {
          this.ShowArticleQToast(article);
        }
      });
    });
    this.service.getAllModelP().subscribe(data => {
      this.sourceP = data as ArticlePq[];
    });
  }

  ShowArticleQToast(article: ArticlePq) {
    const title = `Stock del artículo Cod: ${article.code}, cerca del punto de reorden`;
    const body = `Considere realizar un pedido de ${article.optimalLot} unidades`;
    this.showToast(title, 0, body);
  }

  onUserRowSelect(event): void {
    console.log(event);
    this.ShowArticleQToast(event.data);
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

  showToast(title: string, stat: number, body = '') {
    const types: NbComponentStatus[] = [
      'primary',
      'success',
      'info',
      'warning',
      'danger'
    ];

    const status: NbComponentStatus = types[stat];

    const config = {
      status: status,
      destroyByClick: true,
      duration: 0,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true
    };

    this.toastrService.show(body, title, config);
  }
}
