import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { debounceTime } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export interface DealFilters {
  search: string;
  operator: 'greater' | 'less';
  purchasePrice: number | null;
}

@Component({
  selector: 'app-deal-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './deal-filters.component.html',
  styleUrl: './deal-filters.component.scss',
})
export class DealFiltersComponent {
  @Output()
  filtersChanged = new EventEmitter<DealFilters>();

  form = this.fb.group({
    search: [''],
    operator: ['greater' as 'greater' | 'less'],
    purchasePrice: [null as number | null],
  });

  constructor(private fb: FormBuilder) {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.filtersChanged.emit({
        search: value.search ?? '',
        operator: value.operator ?? 'greater',
        purchasePrice: value.purchasePrice ?? null,
      });
    });
  }
}
