export type ExchangeRate ={
    currency: String
    rate: String
    name: String
  }

  export type Province ={
    city: String
    provinceid: String
  }

 export type Query= {
    rates(currency: string): [ExchangeRate]
    provinceList: [Province]

  }
