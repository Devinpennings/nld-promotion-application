import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MailingSubscribersComponent} from './mailing-subscribers/mailing-subscribers.component';
import {MailingTemplatesComponent} from './mailing-templates/mailing-templates.component';
import {MailingSendComponent} from './mailing-send/mailing-send.component';
import {TriggersComponent} from './triggers/triggers.component';
import {ActionsComponent} from './actions/actions.component';
import {MailingTemplateEditComponent} from './mailing-template-edit/mailing-template-edit.component';

const routes: Routes = [
  { path: '' , redirectTo: 'mailing/subscribers', pathMatch: 'full' },
  { path: 'mailing', children: [
      { path: 'subscribers' , component : MailingSubscribersComponent, data: { title: 'Abonnees'} },
      { path: 'send' , component : MailingSendComponent, data: { title: 'Verzenden'}},
      { path: 'templates', data: { title: 'Templates'}, children: [
          { path: '', component : MailingTemplatesComponent },
          { path: ':id', component: MailingTemplateEditComponent, data: { title: 'Bewerken'}}
        ]},
    ],
    data: {
      title: 'Mailing'
    }
  },
  { path: 'triggers', component : TriggersComponent, data: { title: 'Triggers'}},
  { path: 'actions', component : ActionsComponent, data: { title: 'Acties'}},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
