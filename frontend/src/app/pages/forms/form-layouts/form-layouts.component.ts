import { ModelConfig } from './../../../models/model-config';
import { ModelConfigService } from './../../../services/model-config.service';
import { ToasterConfig } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService
} from '@nebular/theme';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./form-layouts.component.scss'],
  templateUrl: './form-layouts.component.html'
})
export class FormLayoutsComponent implements OnInit {
  modelConfigs: ModelConfig[];
  modelConfig = new ModelConfig();
  modelConfigForm: FormGroup;
  loadingButton = false;

  constructor(
    private modelConfigService: ModelConfigService,
    private formBuilder: FormBuilder,
    private toastrService: NbToastrService
  ) {
    this.modelConfigForm = this.formBuilder.group({
      reviewPeriod: ['', [Validators.required]],
      deliveryTime: ['', [Validators.required]],
      lastDelivery: [''],
      id: ['1']
    });
  }

  ngOnInit() {
    this.modelConfigService.getAll().subscribe(data => {
      this.modelConfigs = data as ModelConfig[];
      this.modelConfig = this.modelConfigs[0] as ModelConfig;
      this.mapInputs(this.modelConfig);
    });
  }

  private mapInputs(modelConfig: ModelConfig) {
    const date = new Date(modelConfig.lastDelivery);
    this.modelConfigForm.setValue({
      reviewPeriod: modelConfig.reviewPeriod,
      deliveryTime: modelConfig.deliveryTime,
      lastDelivery: date, // expects a Date type
      id: modelConfig.id
    });

    // this.modelConfigForm.patchValue({ id: modelConfig.id });
  }

  selectChange(id: number) {
    console.log(id);
    console.log('changed select');
    this.modelConfigs.forEach(modelConfig => {
      if (modelConfig.id === id) {
        this.mapInputs(modelConfig);
      }
    });
  }

  modify() {
    this.loadingButton = true;

    const values = Object.assign({}, this.modelConfigForm.value); // Map form values to object
    const id = values.id;
    delete values.id;
    console.log(values);

    this.modelConfigService.patch(id, values).subscribe(
      response => {
        this.showToast('Proveedor modificado exitosamente', 1);
        setTimeout(() => (this.loadingButton = false), 1000);
      },
      err => {
        this.showToast('Error al modificar proveedor', 4);
        this.loadingButton = false;
        console.log(err);
      }
    );
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
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_LEFT,
      preventDuplicates: true
    };

    this.toastrService.show(body, title, config);
  }

  get reviewPeriod() {
    return this.modelConfigForm.get('reviewPeriod');
  }
  get deliveryTime() {
    return this.modelConfigForm.get('deliveryTime');
  }
  get lastDelivery() {
    return this.modelConfigForm.get('lastDelivery');
  }
  get id() {
    return this.modelConfigForm.get('id');
  }
}
