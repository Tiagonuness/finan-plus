import { Component, OnInit } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PrimeNG } from 'primeng/config';
import { FloatLabelModule } from 'primeng/floatlabel';

interface Meses {
    name: string;
    code: string;
}
@Component({
    selector: 'app-profileFinancial',
    templateUrl: './profileFinancial.html',
})
export class profileFinancial implements OnInit {

    constructor(private PrimeNG: PrimeNG) {}

    ngOnInit() {
    };
}