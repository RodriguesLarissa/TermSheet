import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  PercentPipe,
} from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { map, Observable } from 'rxjs';

import { Deal } from '../../../../core/models/deals';
import { AuthService } from '../../../../core/services/auth.service';
import { DealService } from '../../../../core/services/deals.service';
import { HighlightPipe } from '../../../../shared/pipes/highlight.pipe';
import {
  DealFilters,
  DealFiltersComponent,
} from '../../components/deal-filters/deal-filters.component';
import { DealFormComponent } from '../../components/deal-form/deal-form.component';

@Component({
  selector: 'app-deal-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    PercentPipe,
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    DealFiltersComponent,
    HighlightPipe,
  ],
  templateUrl: './deal-list.component.html',
  styleUrl: './deal-list.component.scss',
})
export class DealListComponent {
  displayedColumns: string[] = [
    'dealName',
    'address',
    'purchasePrice',
    'noi',
    'capRate',
  ];

  filteredDeals$: Observable<Deal[]> = this.dealService.deals$.pipe(
    map((deals) => {
      return deals.filter((deal) => {
        const matchesSearch = deal.dealName
          .toLowerCase()
          .includes(this.filters.search.toLowerCase());

        const purchasePrice = this.filters.purchasePrice;

        if (!purchasePrice) {
          return matchesSearch;
        }

        const matchesPrice =
          this.filters.operator === 'greater'
            ? deal.purchasePrice > purchasePrice
            : deal.purchasePrice < purchasePrice;

        return matchesSearch && matchesPrice;
      });
    }),
  );

  isLoading = true;
  filters: DealFilters = {
    search: '',
    operator: 'greater',
    purchasePrice: null,
  };

  constructor(
    private dealService: DealService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    setTimeout(() => {
      this.isLoading = false;
    }, 600);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCapRateClass(capRate: number): string {
    if (capRate < 5) {
      return 'low-cap-rate';
    }

    if (capRate <= 12) {
      return 'healthy-cap-rate';
    }

    return 'high-cap-rate';
  }

  openAddDealDialog(): void {
    this.dialog.open(DealFormComponent, {
      width: '500px',
    });
  }

  updateFilters(filters: DealFilters): void {
    this.filters = filters;

    this.filteredDeals$ = this.dealService.deals$.pipe(
      map((deals) => {
        return deals.filter((deal) => {
          const matchesSearch = deal.dealName
            .toLowerCase()
            .includes(filters.search.toLowerCase());

          const purchasePrice = filters.purchasePrice;

          if (!purchasePrice) {
            return matchesSearch;
          }

          const matchesPrice =
            filters.operator === 'greater'
              ? deal.purchasePrice > purchasePrice
              : deal.purchasePrice < purchasePrice;

          return matchesSearch && matchesPrice;
        });
      }),
    );
  }
}
