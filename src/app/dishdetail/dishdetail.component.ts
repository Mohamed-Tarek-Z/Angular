import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../Services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
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
    dish!: Dish;
    dishIds!: string[];
    prev!: string;
    next!: string;
    commentForm!: FormGroup;
    coment!: Comment;
    errMess!: string;

    constructor(private dishService: DishService,
                private route: ActivatedRoute,
                private location: Location,
                private fb: FormBuilder,
                @Inject('BaseURL') public BaseURL:string,
                @Inject('ext') public ext:string
                ) {
      this.createForm();
    }

    createForm(): void {
      this.commentForm = this.fb.group({
        rating: [2],
        comment: ['', [Validators.required, Validators.minLength(2)]],
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
        date: new Date().toISOString()
      });
    }

    onSubmit(): void {
      this.coment = this.commentForm?.value;
      console.log(this.coment);
      // this.dish.comments.push(this.coment);a7a
      this.commentForm?.reset({
        rating: 5,
        comment: '',
        author: '',
        date: new Date().toISOString()
      });
    }


    ngOnInit(): void {
      this.dishService.getDishIds().subscribe((dishIds) => this.dishIds = dishIds, errmess => this.errMess = <any>errmess);
      this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params.id))).subscribe((dish) => {
          this.dish = dish;
          this.setPrevNext(dish.id);
        }, errmess => this.errMess = <any>errmess
      );
    }

    setPrevNext(dishId: string): void {
      const index = this.dishIds.indexOf(dishId);
      this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
      this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    }

    goBack(): void {
      this.location.back();
    }
}
