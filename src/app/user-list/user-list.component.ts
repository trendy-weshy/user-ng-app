import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, PaginationData, User } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private userlistSub = Subscription.EMPTY;

  public pages: number[];
  public users: User[];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getlistOfUsers();
  }

  ngOnDestroy(): void {
    this.userlistSub.unsubscribe();
  }

  public getlistOfUsers(page = 1) {
    this.userlistSub = this.apiService.getUsers(page).subscribe(res => {
      this.users = res.data;
      this.pages = new Array(res.total_pages);
    });
  }

}
