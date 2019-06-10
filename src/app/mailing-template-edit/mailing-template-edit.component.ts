import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Template} from '../../model/template';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-mailing-template-edit',
  templateUrl: './mailing-template-edit.component.html',
  styleUrls: ['./mailing-template-edit.component.css']
})
export class MailingTemplateEditComponent implements OnInit {

  private template: Template;
  private validateForm: FormGroup;
  private editor = ClassicEditor;
  private requiredFields: string[] = [];
  private isSubmitting: boolean;
  private isLoading: boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.isLoading = true;
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      html: [null, [Validators.required]]
    });
  }

  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id') !== 'new') {

      this.http.get<Template>(environment.api + '/mail/templates/' + this.route.snapshot.paramMap.get('id')).subscribe(result => {

        this.template = result;

        this.validateForm.reset({
          title: result.title,
          description: result.description,
          subject: result.subject,
          html: result.html
        });

        this.validateForm.get('html').valueChanges.subscribe(val => {
          this.onHtmlChange(val);
        });

        this.isLoading = false;

      });

    } else {
      this.isLoading = false;
    }

    this.validateForm.get('html').valueChanges.subscribe(val => {
      this.onHtmlChange(val);
    });

  }

  submitForm() {

    this.isSubmitting = true;
    if (this.route.snapshot.paramMap.get('id') === 'new') {
      this.http.post(environment.api + '/mail/templates', {
        ...this.validateForm.getRawValue(),
        requiredFields: this.requiredFields
      }).subscribe(() => {
        this.isSubmitting = false;
        this.router.navigate(['/mailing/templates']);
      });
    }

  }

  private onHtmlChange(val: string) {

    if (!val) { return; }

    this.requiredFields = [];
    const result = val.match('{{.*}}');

    if (result) {
      for (const found of result) {
        const value = found.replace('{{', '').replace('}}', '').replace(/&nbsp;/g, '').trim();
        this.requiredFields = [...this.requiredFields, value];
      }
    }
  }
}
