import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { CorporateService } from '../Services/corporate.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: { '[@flyInOut]': 'true', 'style': 'display: block;'},
  animations: [
    flyInOut(), expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  errMess!: string;
  constructor(private corporateService: CorporateService, @Inject('BaseURL') public BaseURL:string, @Inject('ext') public ext:string ) { }

  ngOnInit(): void {
    this.corporateService.getLeaders().subscribe((leaders) => this.leaders = leaders, errmess => this.errMess = <any>errmess);
  }

}
