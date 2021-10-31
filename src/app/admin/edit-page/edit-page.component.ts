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

  files = [];
  postMultimedias = [];
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

    function dataURLtoFile(dataurl, filename): File {

      let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while(n--){
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, {type: mime});
    }

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

      if (this.product.photo) {
        this.product.photo.forEach((item) => {
          this.files.push(dataURLtoFile(item.content, item.name));
        });

        this.postMultimedias = this.product.photo;
      }

      this.form = new FormGroup({
        type: new FormControl(this.product.type, Validators.required),
        title: new FormControl(this.product.title, Validators.required),
        info: new FormControl(this.product.info, Validators.required),
        price: new FormControl(this.product.price, Validators.required),
        sold: new FormControl(this.product.sold)
      });
    });

  }


  onSelect(event) {
    this.postMultimedias = [];
    this.files.push(...event.addedFiles);
    if (this.files && this.files[0]) {
      for (let i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i])
          .then(result => {
            this.postMultimedias.push({
              name: this.files[i].name, content:
              result
            });
          });
      }
    }
  }

  fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });
  };

  onRemove(event) {
    const position = this.files.indexOf(event);
    this.postMultimedias.splice(position, 1);
    this.files.splice(position, 1);
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
        photo: this.postMultimedias,
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
