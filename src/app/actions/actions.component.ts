import { Component, OnInit } from '@angular/core';
import {Action} from '../../model/action';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  private actions: Action[] = [];
  private isLoading: boolean;

  constructor() { }

  ngOnInit() {
    this.actions = [
      {
        id: '1',
        title: 'Mail versturen',
        description: 'Met deze actie kan een mail verzonden worden.'
      },
    ];
  }

}
