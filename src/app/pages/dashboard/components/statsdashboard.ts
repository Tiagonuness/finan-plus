import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    selector: 'app-stats-dashboard',
    imports: [CommonModule, CardModule],
    templateUrl: './html/statsdashboard.html',
    styleUrls: ['./html/statsdashboard.scss'],
})
export class StatsDashboard {}
