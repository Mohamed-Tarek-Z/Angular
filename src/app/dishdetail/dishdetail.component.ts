import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../Services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core/testing';
import { visibility, flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: { '[@flyInOut]': 'true', 'style': 'display: block;'},
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {

  validationMessages = {
    author: {
      required: 'author Name is required.',
      minlength: 'author Name must be at least 2 characters long.',
      maxlength: 'author Name cannot be more than 25 characters long.'
    },
    comment: {
      required: 'comment is required.',
      minlength: 'comment must be at least 2 characters long.'
    }
  };
    @ViewChild('cform') commentFormDirective: any;
    dish!: Dish | any;
    dishIds!: string[];
    prev!: string;
    next!: string;
    commentForm!: FormGroup;
    comment!: Comment;
    errMess!: string;
    dishcopy!: Dish | any;
    visibility = 'shown';

    constructor(private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location,
                private fb: FormBuilder,
                @Inject('BaseURL') public BaseURL:string,
                @Inject('ext') public ext:string
                ) {}

    createForm(): void {
      this.commentForm = this.fb.group({
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        rating: 5,
        comment: ['', [Validators.required, Validators.minLength(2)]]
      });
      this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
    }

    onSubmit(): void {
      this.comment = this.commentForm?.value;
      this.comment.date = new Date().toISOString();
      console.log(this.comment);
      this.dishcopy.comments.push(this.comment);
      this.dishService.putDish(this.dishcopy).subscribe(dish => {
         this.dish = dish;
         this.dishcopy = dish;},
         errmess => {
            this.dish = null;
            this.dishcopy = null;
            this.errMess = <any>errmess;
          });

      this.commentFormDirective.resetForm();
      this.commentForm?.reset({
        author: '',
        rating: 5,
        comment: ''
      });
    }


    ngOnInit(): void {
      this.createForm();
      this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishService.getDish(params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
        errmess => this.errMess = <any>errmess);
    }

    setPrevNext(dishId: string): void {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
      this.location.back();
    }

    onValueChanged(data?: any): void {
      if (!this.commentForm) { return; }
      const form = this.commentForm;
    }
}
