import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/Dishes';
import { DishService } from '../Services/dish.service';
import { BaseURL,ext } from '../shared/baseurl';
import { Observable, of } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';



describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    const dishServiceStub = {
      getDishes: function(): Observable<Dish[]> {
        return of(DISHES);
      }
    };
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }]),
        MatProgressSpinnerModule,
        MatGridListModule
      ],
      declarations: [ MenuComponent ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseURL', useValue: BaseURL },
        { provide: 'ext', useValue: ext },
      ]
    })
    .compileComponents();

    const dishservice = TestBed.inject(DishService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Dishes items are 6 ', () => {
    expect(component.dishes.length).toBe(6);
  });

  it('use dishes in HTML', () => {
    fixture.detectChanges();
    let de: DebugElement;
    let el: HTMLElement;

    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
    
    expect(el.textContent).toContain(DISHES[0].name.toUpperCase());
  });
});
