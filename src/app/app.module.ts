import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppRoutingModule } from './app-routing.module';
import { MailingSubscribersComponent } from './mailing-subscribers/mailing-subscribers.component';
import { MailingTemplatesComponent } from './mailing-templates/mailing-templates.component';
import { MailingSendComponent } from './mailing-send/mailing-send.component';
import { TriggersComponent } from './triggers/triggers.component';
import { ActionsComponent } from './actions/actions.component';
import { MailingTemplateEditComponent } from './mailing-template-edit/mailing-template-edit.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MailingSubscribersComponent,
    MailingTemplatesComponent,
    MailingSendComponent,
    TriggersComponent,
    ActionsComponent,
    MailingTemplateEditComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
