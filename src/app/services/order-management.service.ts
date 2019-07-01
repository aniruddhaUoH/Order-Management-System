import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import * as $ from 'jquery';

@Injectable()
export class OrderManagementService {

    private userInfo: any;
    private userdetails: any[];
    private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

    constructor(private http: HttpClient) {
        this.getUserDetails().subscribe(data => {
            if (data && data.users) {
                this.userdetails = data.users;
            }
        });
        this.init();
    }
    private init() {

    }

    public getUserDetails(): Observable<any> {
        return this.http.get("assets/user-info.json");
    }

    public getOrderDetails(): Observable<any> {
        return this.http.get('assets/orders-details.json');
    }

    getLoggedInStatus() {
        return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString())
    }

    getAuthenticateData(loginData) {
        console.log('this.usernameExist: ', this.userdetails);
        let usernameExist = this.userdetails.filter(m => m.username === loginData.username);
        if (usernameExist.length > 0) {
            if (usernameExist[0].password === loginData.password) {
                if (loginData.rememberMe === 'true') {
                    localStorage.setItem('username', loginData.username);
                    localStorage.setItem('password', loginData.password);
                    localStorage.setItem('loggedIn', 'true');
                    this.loggedInStatus = 'true';
                    return true;
                }
            }
        }
        return false;
    }

    public handle_stylings() {
        $('.form-control').focusin(function () {
            $(this).closest('.hinttext').find('.ValidationErrors').css('display', 'none');
            $(this).closest('.hinttext').find('.message').css({'visibility': 'visible', 'height': 'auto'});
            $(this).closest('.hinttext').find('.ClientErrors').css('display', 'none');
            $(this).closest('.hinttext').find('.message-checkbox').css('height', 'auto');
            $(this).closest('.dropdown').find('.open').css('display', 'block');
            $(this).closest('.dropdownlist').find('.display-none').css('display', 'block');
        });
        $('.form-control').focusout(function () {
            $(this).closest('.hinttext').find('.ValidationErrors').css('display', 'block');
            $(this).closest('.hinttext').find('.ClientErrors').css('display', 'block');
            $(this).closest('.hinttext').find('.message').css({'visibility': 'hidden', 'height': '14px'});
            $(this).closest('.hinttext').find('.message-checkbox').css('height', '0px');
            $(this).closest('.dropdown').find('.open').css('display', 'none');
            $(this).closest('.dropdownlist').find('.display-none').css('display', 'none');
        });
        $('.form-control').closest('.hinttext').find('.message').css({'visibility': 'hidden', 'height': '14px'});
    }
}