import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(
    public authService: AuthService) {
    this.authService.isUserLoggedIn.subscribe((value: boolean) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
  }
  logout(): void {
    this.authService.doLogout(); 
    this.authService.isUserLoggedIn.next(false);
  }
}
