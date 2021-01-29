import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../Services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    
    dish?: Dish;
    constructor(private dishService:DishService,
      private route: ActivatedRoute,
      private location:Location) { }

    ngOnInit(): void {
      let id = this.route.snapshot.params['id'];
      this.dish = this.dishService.getDish(id);
    }
    goBack():void {
      this.location.back();
    }
}
