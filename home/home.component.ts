import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../src/app/shared/dish';
import { DishService } from '../src/app/Services/dish.service';
import { Promotion } from '../src/app/shared/promotion';
import { PromotionService } from '../src/app/Services/promotion.service';
import { Leader } from '../src/app/shared/leader';
import { CorporateService } from '../src/app/Services/corporate.service';
import { flyInOut, expand } from '../src/app/animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  promotion!: Promotion;
  leader!: Leader;
  dishErrMess!: string;
  promoErrMess!: string;
  leaderErrMess!: string;

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderservice: CorporateService,
    @Inject('BaseURL') public BaseURL:string, @Inject('ext') public ext:string ) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => this.dish = dish,
        errmess => this.dishErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promoErrMess = <any>errmess);
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess);
  }

}
