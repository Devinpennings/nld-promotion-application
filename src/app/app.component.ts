import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private breadcrumbs: string[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .forEach(() => {
        this.breadcrumbs = [];
        this.buildBreadCrumb(this.activatedRoute.root);
      }
    );

  }

  buildBreadCrumb(route: ActivatedRoute): void {

    if (route.routeConfig && route.routeConfig.data) {
      this.breadcrumbs = [ ...this.breadcrumbs, route.routeConfig.data.title ];
    }
    if (route.firstChild) {
      this.buildBreadCrumb(route.firstChild);
    }

  }
}
