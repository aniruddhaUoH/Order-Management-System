import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {
    constructor(private titleService: Title) {
    }

    async ngOnInit() {
        this.setTitle('404 - Page Not Found');
    }
    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
