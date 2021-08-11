import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-city',
  templateUrl: './city.page.html',
  styleUrls: ['./city.page.scss'],
})
export class CityPage implements OnInit {

  id: any;
  finalId: any;
  cities: any = [];
  name:string;
  img:string;
  description:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.finalId = this.id - 1;
    console.log("id", this.id);
    this.getCities().subscribe(res => {
      console.log("Res", res);
      this.cities = res;
      this.name = this.cities[this. finalId].name;
      this.img = this.cities[this. finalId].img;
      this.description = this.cities[this. finalId].description;
      console.log("Name", this.name);
    })

  }

  getCities() {
    return this.http
      .get("assets/files/cities.json")
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )

  }

}
