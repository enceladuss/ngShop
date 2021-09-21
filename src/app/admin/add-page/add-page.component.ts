import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/product.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {
  files: File[] = [];
  form: FormGroup;
  submitted = false;
  productID;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      // photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      sold: new FormControl(null, Validators.required)
    });
  }

  onSelect(event) {
    console.log(this.files);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
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

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      this.submitted = false;
      return;
    }

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.files,
      info: this.form.value.info,
      price: this.form.value.price,
      sold: this.form.value.sold,
      date: new Date()
    };

    this.submitted = false;
    console.log(product);
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.productService.create(product)
      .subscribe((res) => {
        this.files = [];
        this.form.reset();
        this.productID = res.id;
        setTimeout(() => {
          this.productID = '';
        }, 5000);
      });
  }
}
