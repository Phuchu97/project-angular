declare var window: any;
export class DynamicEnvironment {
  public get baseUrl() {
    return window.config;
  }
}

export class Environment extends DynamicEnvironment {
  public production: boolean;
  public apiKey: "AIzaSyAyhMma19E2U3IE0tLXeCt9AzQxTT95GkA";
  public authDomain: "testfb-1028e.firebaseapp.com";
  public databaseURL: "https://testfb-1028e.firebaseio.com";
  public projectId: "testfb-1028e";
  public storageBucket: "testfb-1028e.appspot.com";
  public messagingSenderId: "1030940414643";
  constructor(isProduction: boolean) {
    super();
    this.production = isProduction;
  }
}
