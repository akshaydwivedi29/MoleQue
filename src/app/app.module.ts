import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { StatutoryComplianceComponent } from './pages/statutory-compliance/statutory-compliance.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';
import { BookTestComponent } from './book-test/book-test.component';
import { ProfileComponent } from './profile/profile.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { AddressComponent } from './address/address.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentComponent } from './payment/payment.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    TestDetailsComponent,
    LoginComponent,
    DashboardComponent,
    CartComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ContactUsComponent,
    PrivacyPolicyComponent,
    StatutoryComplianceComponent,
    TermsConditionsComponent,
    BookTestComponent,
    ProfileComponent,
    CartModalComponent,
    AddressComponent,
    OrderSummaryComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CarouselModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
