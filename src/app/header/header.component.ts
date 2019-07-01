import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input()
  public publicHeader: boolean;
  public username: any;
  constructor(private router: Router) {
  }

  async ngOnInit() {
    if (localStorage.getItem('username')) {
      this.username = localStorage.getItem('username');
    }
  }

  clearLocalStorage() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
  }
}
