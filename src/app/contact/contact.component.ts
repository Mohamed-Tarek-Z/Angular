import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flyInOut, expand } from '../animations/app.animations';
import { ContactType, Feedback } from '../shared/feedback';
import { FeedbackService } from '../Services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: { '[@flyInOut]': 'true', 'style': 'display: block;'},
  animations: [
    flyInOut(), expand()
  ]
})
export class ContactComponent implements OnInit {

  formErrors = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: ''
  };

  validationMessages = {
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.'
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.'
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.'
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.'
    },
  };

  feedbackForm!: FormGroup;
  errMess!: string;
  feedback!: Feedback | any;
  copy!: Feedback | any;
  spin=false;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective: any;


  constructor(private fb: FormBuilder, private feedservice: FeedbackService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['' , [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any): void {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
  }

  onSubmit(): void {
    this.spin = true;
    this.feedback = this.feedbackForm?.value;
    this.feedservice.submitFeedback(this.feedback).subscribe(feedback => {
      this.feedback = feedback;
      this.copy = feedback;
      this.spin = false;
    }, errmess => {
        this.feedback = null;
        this.copy = null;
        this.spin = false;
        this.errMess = <any>errmess; });
    setTimeout(() => {this.copy = null;}, 5000);
    this.feedbackForm?.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackFormDirective.resetForm();
  }

}
