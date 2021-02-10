import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Dish } from '../shared/dish';
import { DishService } from '../Services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../Services/promotion.service';
import { Leader } from '../shared/leader';
import { CorporateService } from '../Services/corporate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: Leader;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private corporateService: CorporateService) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish);
    this.promotionService.getFeaturedPromotion().subscribe((promotion) => this.promotion = promotion);
    this.corporateService.getFeaturedLeader().subscribe((leader) => this.leader = leader);
  }

}
