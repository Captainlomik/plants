import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../../interfaces';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.css']
})
export class ProductsCatalogComponent implements OnInit {
  @Input() product: Product;
  closeResult = '';
  buyForm:  FormGroup;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.buyForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        count: new FormControl('', Validators.required)
      }
    )

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
