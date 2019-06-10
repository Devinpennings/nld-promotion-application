import { Component, OnInit } from '@angular/core';
import {Template} from '../../model/template';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-mailing-templates',
  templateUrl: './mailing-templates.component.html',
  styleUrls: ['./mailing-templates.component.css']
})
export class MailingTemplatesComponent implements OnInit {

  private templates: Template[];
  private isLoading: boolean;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.isLoading = true;
    this.http.get<Template[]>(environment.api + '/mail/templates').subscribe(result => {
      this.templates = result;
    });
    this.isLoading = false;

  }

}
