import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {OrderManagementService} from "../../services/order-management.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-authenticate-customer',
    templateUrl: './authenticate-customer.component.html'
})

export class AuthenticateCustomerComponent implements OnInit, OnDestroy, AfterViewInit {
    public authenticateForm: FormGroup;
    public loadingFlag = false;
    public dataFlag: boolean;
    public data: any;
    public loginDataExists: boolean;
    public isError: boolean;

    constructor(private router: Router,
                /*private formService: FormService,*/
                private fb: FormBuilder,
                private titleService: Title,
                private ordermgmtService: OrderManagementService,
                private http: HttpClient) {
    }
    async ngOnInit() {
        if(this.ordermgmtService.getLoggedInStatus() === 'true') {
            this.router.navigate(['/order-management'], {replaceUrl: true});
        }
        try {
            this.createForm();
            this.setTitleMsg();
            this.dataFlag = true;
        } catch (e) {
            if (e) {
                console.error('error while loading authenticate component--' + e.toString());
            }
        }
    }

    ngAfterViewInit(): void {
        this.ordermgmtService.handle_stylings();
    }

    createForm() {
        // this.authenticateForm = this.fb.group({});
        this.authenticateForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl('true')
        });
    }

    getUsernameValidationErrorMessage(field) {
        if (this.authenticateForm.get(field) && this.authenticateForm.get(field).touched && this.authenticateForm.get(field).dirty && this.authenticateForm.get(field).invalid) {
            return this.authenticateForm.get(field).hasError('required') ? 'Username is required' : '';
        }
        return '';
    }
    getPasswordValidationErrorMessage(field) {
        if (this.authenticateForm.get(field) && this.authenticateForm.get(field).touched && this.authenticateForm.get(field).dirty && this.authenticateForm.get(field).invalid) {
            return this.authenticateForm.get(field).hasError('required') ? 'Password is required' : '';
        }
        return '';
    }
    /* add form controls as part of form creation based on corresponding pagelabel and auth field existence */

    submitLoginData() {
        this.loadingFlag = true;
        const loginData = this.authenticateForm.value;
        console.log(loginData);
        this.loginDataExists = this.ordermgmtService.getAuthenticateData(loginData);
        console.log(this.loginDataExists);
        if (this.loginDataExists) {
            this.loadingFlag = false;
            this.router.navigate(['/order-management'], {replaceUrl: true});
        } else {
            this.loadingFlag = false;
            this.isError = true;
            this.authenticateForm.reset();
        }
    }

    private setTitleMsg() {
      this.titleService.setTitle('Login Page');
    }

    ngOnDestroy(): void {
    }
}

