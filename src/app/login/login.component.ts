import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'; // Crucial for returnUrl
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Handles queryParams

  private returnUrl: string = '/';

  ngOnInit() {
    // Catch the returnUrl set by the Guard
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async loginWithGoogle() {
    try {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);
      this.authService.login();
    } catch (err) {
      console.error("Login failed", err);
    }
  }
}