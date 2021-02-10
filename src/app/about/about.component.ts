import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { CorporateService } from '../Services/corporate.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders?: Leader[];
  constructor(private corporateService: CorporateService) { }

  ngOnInit(): void {
    this.corporateService.getLeaders().subscribe((leaders) => this.leaders = leaders);
  }

}
