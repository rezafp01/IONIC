import { Component } from '@angular/core';
/** [3]
 * @param HttpClient buat load data dari json
 * @param Observable, @param throwError buat fetch data dari Api ke variabel
 * @param map untuk menampung list data
 */
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //[4]
  //varibel untuk menyimpan data cuaca
  private forecastData: any;
  //varibel untuk menyimpan data error
  private errMsg: any;
  //menyimpan list negara
  private countryList: any;
  //menyimpan negara yang di pilih
  private selectedCountry: string;
  //menyimpan list provinsi sesuai dengan negara
  private stateList: any;
  //menyimpan provinsi yang di pilih
  private selectedState: string;
  //menyimpan list kota sesuai dengan provinsi
  private cityList: any;
  //menyimpan kota yang dipilih
  private selectedCity: string;

  constructor(private http: HttpClient) {
    //[5]
    //ketika app dibuat akan memanggil method getCountry
    this.getCountry();
  }


  /**[6]
   * mendapatkan list negara
   * @param countryList adalah data yang direturn jika sukses
   * @param errMsg adalah data yang direturn jika error
   */
  getCountry() {
    let urlCountryList = 'https://api.airvisual.com/v2/countries?';
    this.callForecastApi(urlCountryList).subscribe((data) => {
      if (data) {
        this.countryList = data.data
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  /**[7]
   * mendapatkan nama negara yang dipilih dengan memanggil @param callForecastApi
   * @param stateList mengembalikan list dari provinsi sesaui dengan @param selectCountry
   * 
   */
  selectCountry() {
    console.log(this.selectedCountry)
    let urlStateList = `https://api.airvisual.com/v2/states?country=${this.selectedCountry}`;
    this.callForecastApi(urlStateList).subscribe((data) => {
      if (data) {
        this.stateList = data.data
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  /**[8]
   * mendapatkan nama provinsi yang dipilih dengan memamggil @param callForecastApi
   * @param cityList mengembalikan list dari kota sesuai dengan @param selectCountry
   */
  selectState() {
    console.log(this.selectedState)
    let urlStateList = `https://api.airvisual.com/v2/cities?state=${this.selectedState}&country=${this.selectedCountry}`;
    this.callForecastApi(urlStateList).subscribe((data) => {
      if (data) {
        this.cityList = data.data
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  /**[9]
   * mendapatkan list semua data cuaca kota , provinsi dan negara
   * @param forecastData mengembalikan list data cuaca
   */
  getforecastData() {
    let urlCityWeather = `https://api.airvisual.com/v2/city?city=${this.selectedCity}&state=${this.selectedState}&country=${this.selectedCountry}`;
    this.callForecastApi(urlCityWeather).subscribe((data) => {
      if (data) {
        this.forecastData = data.data
        console.log(this.forecastData)
      }
    }, (error) => {
      console.log(error, 'subs')
      this.errMsg = error
    });
  }

  /**[10]
   *  memanggil data api berdasarkan url
   */
  callForecastApi(url): Observable<any> {
    return this.http.get(`${url}&key=83d60b33-fc09-4fbd-a5ab-1d4cd7e2e76b`)
      .pipe(catchError(res => this.handleError(res)))
  }

  /**
   * [11]
   * kalo ada data error
   */
  handleError(error: Response | any) {
    let errorFromServer = error.error.data.message;
    return throwError(errorFromServer);
  }
}

