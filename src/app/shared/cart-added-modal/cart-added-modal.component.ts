import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-cart-added-modal',
  templateUrl: './cart-added-modal.component.html',
  styleUrls: ['./cart-added-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartAddedModalComponent {

  constructor() {
  }

  public openModal(): void {
    document.querySelectorAll('.modal-bg').forEach(elem => {
      elem.classList.add('active');
    });

    document.querySelectorAll('.modal').forEach(elem => {
      elem.classList.add('active');
    });
  }

  public closeModal(): void {
    document.querySelectorAll('.modal-bg').forEach(elem => {
      elem.classList.remove('active');
    });

    document.querySelectorAll('.modal').forEach(elem => {
      elem.classList.remove('active');
    });
  }

}
