import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {OrderManagementService} from "./order-management.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthCheckGuard implements CanActivate {
    constructor( private router: Router,
                private ordermgmtService: OrderManagementService) {}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.ordermgmtService.getLoggedInStatus()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
