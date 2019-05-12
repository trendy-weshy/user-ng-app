import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, User } from '../api.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {

  public user: User;

  private userDetailsSub = Subscription.EMPTY;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userDetailsSub = this.route.params.
      pipe(
        switchMap((params: Params) => this.apiService.getUser(params.id))
      ).
      subscribe(res => {
        this.user = {...res.data};
      });
  }

  ngOnDestroy(): void {
    this.userDetailsSub.unsubscribe();
  }

  private getUserDetails(id) {

  }

}
