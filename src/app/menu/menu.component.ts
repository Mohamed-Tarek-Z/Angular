import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../Services/dish.service';
import { publish } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes!: Dish[];

  constructor(private dishService: DishService, @Inject('BaseURL') public BaseURL:string ) { }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => this.dishes = dishes) ;
  }

}
