import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../shared/product.service';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  files: File[] = [];
  form: FormGroup;
  noProduct;
  product;
  submitted = false;
  showSuccessAlert = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.route.params.pipe(
      switchMap(params => {
        return this.productService.getById(params['id']);
      })
    ).subscribe(product => {

      if (!product) {
        this.noProduct = true;
        return;
      }

      this.product = product;

      console.log(this.product.type);

      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        // photo: new FormControl(null, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
        sold: new FormControl(this.product.sold, Validators.required)
      });
    });

  }

  onSelect(event): void {
    console.log(this.files);
    this.files.push(...event.addedFiles);
  }

  onRemove(event): void {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  submit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    this.showSuccessAlert = true;
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.productService.update({
        ...this.product,
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.files,
        info: this.form.value.info,
        price: this.form.value.price,
        sold: this.form.value.sold,
        date: new Date()
      }
    ).subscribe((res) => {
      this.submitted = false;
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 5000);
    });
  }
}
