import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { CorporateService } from '../Services/corporate.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
export class AboutComponent implements OnInit {

  leaders!: Leader[];
  errMess!: string;

  constructor(private leaderservice: CorporateService,
    @Inject('BaseURL') public BaseURL:string, @Inject('ext') public ext:string ) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
  }

}
