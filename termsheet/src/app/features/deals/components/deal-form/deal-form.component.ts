import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { combineLatest, startWith } from 'rxjs';
import { DealService } from '../../../../core/services/deals.service';

@Component({
  selector: 'app-deal-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './deal-form.component.html',
  styleUrl: './deal-form.component.scss',
})
export class DealFormComponent {
  form = this.fb.group({
    dealName: ['', Validators.required],
    address: ['', Validators.required],

    purchasePrice: [null, [Validators.required, Validators.min(1)]],

    noi: [null, [Validators.required, Validators.min(1)]],

    capRate: [{ value: 0, disabled: true }],
  });

  constructor(
    private fb: FormBuilder,
    private dealService: DealService,
    private dialogRef: MatDialogRef<DealFormComponent>,
  ) {
    this.listenToCapRateChanges();
  }

  private listenToCapRateChanges(): void {
    const noi$ = this.form.controls.noi.valueChanges.pipe(startWith(0));

    const purchasePrice$ = this.form.controls.purchasePrice.valueChanges.pipe(
      startWith(0),
    );

    combineLatest([noi$, purchasePrice$]).subscribe(([noi, purchasePrice]) => {
      const capRate = purchasePrice ? ((noi ?? 0) / purchasePrice) * 100 : 0;

      this.form.patchValue(
        {
          capRate: Number(capRate.toFixed(2)),
        },
        {
          emitEvent: false,
        },
      );
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    const rawValue = this.form.getRawValue();

    this.dealService.addDeal({
      id: Date.now(),

      dealName: rawValue.dealName ?? '',

      address: rawValue.address ?? '',

      purchasePrice: Number(rawValue.purchasePrice),

      noi: Number(rawValue.noi),

      capRate: Number(rawValue.capRate),
    });

    this.dialogRef.close();
  }
}
