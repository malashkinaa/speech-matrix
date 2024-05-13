import { Component } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  isLoading$ = this.spinnerService.loading$;
  constructor(public spinnerService: SpinnerService) {}
}





