import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  customers: any = [];
  searchedCustomer: any;
  permission: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.permission = true;
    console.log("Hola");
    this.getCustomers().subscribe(res => {
      console.log("Res", res)
      this.customers = res;
      this.searchedCustomer = this.customers;
    });
  }

  gotoHome() {
    this.router.navigate(['/home'])
  }

  getCustomers() {
    return this.http
      .get("assets/files/customers.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
  }

  searchCustomer(event) {
    const text = event.target.value;
    this.searchedCustomer = this.customers;
    if (text && text.trim() != '') {
      this.searchedCustomer = this.searchedCustomer.filter((customer: any) => {
        return (customer.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }
}