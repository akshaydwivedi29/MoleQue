import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { BookTestComponent } from './book-test/book-test.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { StatutoryComplianceComponent } from './pages/statutory-compliance/statutory-compliance.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { TestListComponent } from './test-list/test-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'test-details',
    component: TestDetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'statutory-compliance',
    component: StatutoryComplianceComponent,
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent,
  },
  {
    path: 'test-list',
    component: TestListComponent,
  },
  {
    path: 'book-test',
    component: BookTestComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'cart-modal',
    component: CartModalComponent,
  },
  {
    path: 'cart/address',
    component: AddressComponent,
  },
  {
    path: 'cart/order-summary',
    component: OrderSummaryComponent,
  },
  {
    path: 'cart/payment',
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
