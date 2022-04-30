import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '../../../shared/components/base.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  private returnUrl?: string;
  public loginForm?: FormGroup;
  public submitted: boolean = false;
  public loading: boolean = false;
  public message: string | undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
    this.activatedRoute.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: ParamMap) =>
        (this.returnUrl = value.get('returnUrl') || '/'),
    });
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: [, [Validators.required]],
      password: [, Validators.required],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value;
      this.loading = true;
      this.authService
        .login(email, password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
          },
          error: (err: any) => {
            this.loading = false;
            this.handleError(err);
          },
        });
    }
  }

  private handleError(err: any): void {
    switch (err.status) {
      case 400:
        this.message = 'Email or password is incorrect.';
        break;

      default:
        break;
    }
  }
}
