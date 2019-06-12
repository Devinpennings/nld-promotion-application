import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Trigger} from '../../model/trigger';
import {Action} from "../../model/action";

@Component({
  selector: 'app-trigger-detail',
  templateUrl: './trigger-detail.component.html',
  styleUrls: ['./trigger-detail.component.css']
})
export class TriggerDetailComponent implements OnInit {

  private isLoading: boolean;
  private trigger: Trigger;
  private actions: Action[];
  private addNewPanel: any = {
    active: false,
    title: 'Voeg toe'
  };
  expectedResponse: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.isLoading = true;
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id') !== 'new') {

      this.http.get<Trigger>(environment.api + '/triggers/' + this.route.snapshot.paramMap.get('id')).subscribe(result => {

        this.trigger = result;
        this.expectedResponse = this.convertToJson(result.expectedResponse);

      });

      this.http.get<Action[]>(environment.api + '/triggers/' + this.route.snapshot.paramMap.get('id') + '/actions').subscribe(actions => {

        this.actions = actions;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);

      });

    } else {

      this.isLoading = false;

    }

  }

  submitForm() {

  }

  convertToJson(expectedResponse: any): string {
    let value = '{\n';
    expectedResponse.fields.forEach(field => {
      value += '\t"' + field + '"\n';
    });
    value += '}';
    return value;
  }
}
