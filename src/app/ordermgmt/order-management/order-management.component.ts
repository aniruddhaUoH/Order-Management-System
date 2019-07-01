import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {OrderManagementService} from "../../services/order-management.service";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html'
})

export class OrderManagementComponent implements OnInit, OnDestroy {
  public loadingFlag = false;
  public dataFlag: boolean;
  public ordersdetails: any;
  p: number = 1;
  public showMsg = false;
  public message: any;
  public updateOrderDetailsForm: FormGroup;
  public addOrderDetailsForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private titleService: Title,
              private ordermgmtService: OrderManagementService) {
  }
  async ngOnInit() {
    try {
      this.loadData();
    } catch (e) {
      if (e) {
        console.error('error while loading authenticate component--' + e.toString());
      }
    }
  }
  async loadData() {
    this.setTitleMsg();
    this.ordermgmtService.getOrderDetails().subscribe(data => {
      if (data && data.orders) {
        this.ordersdetails = data.orders;
        console.log(this.ordersdetails);
      }
    });
    this.createUpdateForm();
    this.createAddForm();
    this.dataFlag = true;
  }
  createUpdateForm() {
    this.updateOrderDetailsForm = new FormGroup({
      dueDate: new FormControl('', Validators.required),
      custName: new FormControl('', Validators.required),
      custAddress: new FormControl('', Validators.required),
      custPhone: new FormControl('', Validators.required),
      orderTotal: new FormControl('', Validators.required)
    });
  }
  createAddForm(){
    this.addOrderDetailsForm = new FormGroup({
      orderNo: new FormControl('', Validators.required),
      dueDate: new FormControl('', Validators.required),
      custName: new FormControl('', Validators.required),
      custAddress: new FormControl('', Validators.required),
      custPhone: new FormControl('', Validators.required),
      orderTotal: new FormControl('', Validators.required)
    })
  }
  private setTitleMsg() {
    this.titleService.setTitle('Order Management Page');
  }
  updateOrderDetails() {
    console.log('order to be updated: ', this.updateOrderDetailsForm.value);
    this.showMsg = true;
    this.message = 'The order details has been updated successfully.';
    setTimeout(()=> {
      this.showMsg = false;
    }, 5000);
  }
  deleteOrderDetails(orderNo) {
    console.log('orderNo to be deleted: ', orderNo);
    this.showMsg = true;
    this.message = 'The order details has been deleted successfully.';
    setTimeout(()=> {
      this.showMsg = false;
    }, 5000);
  }
  addNewOrderDetails() {
    console.log('orderNo to be added: ', this.addOrderDetailsForm.value);
    this.showMsg = true;
    this.message = 'The order details has been added successfully.';
    this.addOrderDetailsForm.reset();
    setTimeout(()=> {
      this.showMsg = false;
    }, 5000);
  }
  ngOnDestroy(): void {
  }
}

