import { Injectable } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import {Query,ExchangeRate, Province} from '../viewModels/smartGapModels';

const EXCHANGE= gql`
{
  rates(currency: "USD") {
    currency
    rate
    name
  }
}
`;

const PROVINCE=gql`
{
  provinceList {
    city
  }
}
`
@Injectable({
    providedIn:'root',
})
export class ProvinceService{
  exchage:Observable<Province[]>;
    constructor(private apollo:Apollo){}
    getProvince(){
        return this.apollo.use('second').watchQuery<Query>({
            query:PROVINCE,
        }).valueChanges;
    }
}


@Injectable({
  providedIn:'root',
})
export class ExchangeService{
  exchage:Observable<ExchangeRate[]>;
    constructor(private apollo:Apollo){}
    getExchangeRates(){
        return this.apollo.watchQuery<Query>({
            query:EXCHANGE,
        }).valueChanges;
    }
}


