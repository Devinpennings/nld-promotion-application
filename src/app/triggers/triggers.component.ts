import { Component, OnInit } from '@angular/core';
import {Trigger} from '../../model/trigger';

@Component({
  selector: 'app-triggers',
  templateUrl: './triggers.component.html',
  styleUrls: ['./triggers.component.css']
})
export class TriggersComponent implements OnInit {
  
  private availableTriggers: Trigger[] = [];
  private isLoading: boolean;

  constructor() { }

  ngOnInit() {
    this.availableTriggers = [
      {
        id: '1',
        title: 'Betaling geslaagd',
        description: 'Deze trigger wordt uitgevoerd wanneer een betaling geslaagd is.'
      },
      {
        id: '2',
        title: 'Aanmelding nieuwsbrief',
        description: 'Deze trigger wordt uitgevoerd wanneer er een nieuwe aanmelding op de nieuwwsbrief plaatsvind.'
      },
    ];
  }

}
