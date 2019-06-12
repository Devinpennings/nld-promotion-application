import { Component, OnInit } from '@angular/core';
import {Trigger} from '../../model/trigger';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-triggers',
  templateUrl: './triggers.component.html',
  styleUrls: ['./triggers.component.css']
})
export class TriggersComponent implements OnInit {
  
  private availableTriggers: Trigger[] = [];
  private isLoading: boolean;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.http.get<Trigger[]>(environment.api + '/triggers').subscribe(result => {
      setTimeout(() => {
        this.availableTriggers = result;
        this.isLoading = false;
      }, 1000);
    });
  }

}
