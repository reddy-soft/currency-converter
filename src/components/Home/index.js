import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

const codeToCountry = {
  AED: 'United Arab Emirates',
  AFN: 'Afghanistan',
  ALL: 'Albania',
  AMD: 'Armenia',
  ANG: 'Netherlands Antilles',
  AOA: 'Angola',
  ARS: 'Argentina',
  AUD: 'Australia',
  AWG: 'Aruba',
  AZN: 'Azerbaijan',
  BAM: 'Bosnia and Herzegovina',
  BBD: 'Barbados',
  BDT: 'Bangladesh',
  BGN: 'Bulgaria',
  BHD: 'Bahrain',
  BIF: 'Burundi',
  BMD: 'Bermuda',
  BND: 'Brunei',
  BOB: 'Bolivia',
  BOV: 'Bolivia',
  BRL: 'Brazil',
  BSD: 'Bahamas',
  BTN: 'Bhutan',
  BWP: 'Botswana',
  BYR: 'Belarus',
  BZD: 'Belize',
  CAD: 'Canada',
  CDF: 'Democratic Republic of Congo',
  CHE: 'Switzerland',
  CHF: 'Switzerland, Liechtenstein',
  CHW: 'Switzerland',
  CLF: 'Chile',
  CLP: 'Chile',
  CNY: 'Mainland China',
  COP: 'Colombia',
  COU: 'Colombia',
  CRC: 'Costa Rica',
  CUP: 'Cuba',
  CVE: 'Cape Verde',
  CYP: 'Cyprus',
  CZK: 'Czech Republic',
  DJF: 'Djibouti',
  DKK: 'Denmark, Faroe Islands, Greenland',
  DOP: 'Dominican Republic',
  DZD: 'Algeria',
  EEK: 'Estonia',
  EGP: 'Egypt',
  ERN: 'Eritrea',
  ETB: 'Ethiopia',
  EUR: 'European Union',
  FJD: 'Fiji',
  FKP: 'Falkland Islands',
  GBP: 'United Kingdom',
  GEL: 'Georgia',
  GHS: 'Ghana',
  GIP: 'Gibraltar',
  GMD: 'Gambia',
  GNF: 'Guinea',
  GTQ: 'Guatemala',
  GYD: 'Guyana',
  HKD: 'Hong Kong Special Administrative Region',
  HNL: 'Honduras',
  HRK: 'Croatia',
  HTG: 'Haiti',
  HUF: 'Hungary',
  IDR: 'Indonesia',
  ILS: 'Israel',
  INR: 'India',
  IQD: 'Iraq',
  IRR: 'Iran',
  ISK: 'Iceland',
  JMD: 'Jamaica',
  JOD: 'Jordan',
  JPY: 'Japan',
  KES: 'Kenya',
  KGS: 'Kyrgyzstan',
  KHR: 'Cambodia',
  KMF: 'Comoros',
  KPW: 'North Korea',
  KRW: 'South Korea',
  KWD: 'Kuwait',
  KYD: 'Cayman Islands',
  KZT: 'Kazakhstan',
  LAK: 'Laos',
  LBP: 'Lebanon',
  LKR: 'Sri Lanka',
  LRD: 'Liberia',
  LSL: 'Lesotho',
  LTL: 'Lithuania',
  LVL: 'Latvia',
  LYD: 'Libya',
  MAD: 'Morocco, Western Sahara',
  MDL: 'Moldova',
  MGA: 'Madagascar',
  MKD: 'Former Yugoslav Republic of Macedonia',
  MMK: 'Myanmar',
  MNT: 'Mongolia',
  MOP: 'Macau Special Administrative Region',
  MRO: 'Mauritania',
  MTL: 'Malta',
  MUR: 'Mauritius',
  MVR: 'Maldives',
  MWK: 'Malawi',
  MXN: 'Mexico',
  MXV: 'Mexico',
  MYR: 'Malaysia',
  MZN: 'Mozambique',
  NAD: 'Namibia',
  NGN: 'Nigeria',
  NIO: 'Nicaragua',
  NOK: 'Norway',
  NPR: 'Nepal',
  NZD: 'New Zealand',
  OMR: 'Oman',
  PAB: 'Panama',
  PEN: 'Peru',
  PGK: 'Papua New Guinea',
  PHP: 'Philippines',
  PKR: 'Pakistan',
  PLN: 'Poland',
  PYG: 'Paraguay',
  QAR: 'Qatar',
  RON: 'Romania',
  RSD: 'Serbia',
  RUB: 'Russia, Abkhazia, South Ossetia',
  RWF: 'Rwanda',
  SAR: 'Saudi Arabia',
  SBD: 'Solomon Islands',
  SCR: 'Seychelles',
  SDG: 'Sudan',
  SEK: 'Sweden',
  SGD: 'Singapore',
  SHP: 'Saint Helena',
  SKK: 'Slovakia',
  SLL: 'Sierra Leone',
  SOS: 'Somalia',
  SRD: 'Suriname',
  STD: 'São Tomé and Príncipe',
  SYP: 'Syria',
  SZL: 'Swaziland',
  THB: 'Thailand',
  TJS: 'Tajikistan',
  TMM: 'Turkmenistan',
  TND: 'Tunisia',
  TOP: 'Tonga',
  TRY: 'Turkey',
  TTD: 'Trinidad and Tobago',
  TWD: 'Taiwan',
  TZS: 'Tanzania',
  UAH: 'Ukraine',
  UGX: 'Uganda',
  USD: 'United States',
  USN: 'United States',
  USS: 'United States',
  UYU: 'Uruguay',
  UZS: 'Uzbekistan',
  VEB: 'Venezuela',
  VND: 'Vietnam',
  VUV: 'Vanuatu',
  WST: 'Samoa',
  XAF: 'Central African Republic',
  XCD: 'Anguilla, Antigua and Barbuda,',
  XDR: 'International Monetary Fund',
  XFO: 'Bank for International Settlements',
  XFU: 'International Union of Railways',
  XOF: 'Benin, Togo',
  XPD: 'XPD',
  XPF: 'French Polynesia',
  XPT: 'XPT',
  XTS: 'XTS',
  XXX: 'XXX',
  YER: 'Yemen',
  ZAR: 'South Africa',
  ZMK: 'Zambia',
  ZWD: 'Zimbabwe',
}

class Home extends Component {
  state = {
    currenciesList: [],
    currentCurrencyVal: '1',
    initialCurrency: 'USD',
    targetCurrency: 'INR',
    targetCurrencyVal: '',
  }

  componentDidMount() {
    this.getCurrencies()
    this.getTargetCurrency()
  }

  getTargetCurrency = async () => {
    const {initialCurrency, targetCurrency} = this.state
    const apiUrl = `https://free.currconv.com/api/v7/convert?q=${initialCurrency}_${targetCurrency}&compact=ultra&apiKey=1e3231e2cc1ecebda241`
    const response = await fetch(apiUrl)
    const data = await response.json()
    this.setState({
      targetCurrencyVal: data[`${initialCurrency}_${targetCurrency}`],
    })
  }

  getCurrencies = () => {
    const currencyCodesList = Object.keys(codeToCountry)
    const updatesCurrencies = currencyCodesList.map(currency => ({
      id: currency,
      currencyName: codeToCountry[currency],
    }))
    this.setState({currenciesList: updatesCurrencies})
  }

  onChangeCurrentCurrency = event => {
    this.setState(
      {currentCurrencyVal: event.target.value},
      this.getTargetCurrency,
    )
  }

  onChangeCurrentCountry = event => {
    this.setState({initialCurrency: event.target.value}, this.getTargetCurrency)
  }

  onChangeTargetCurrency = event => {
    this.setState({targetCurrency: event.target.value}, this.getTargetCurrency)
  }

  getCurrentCurrencies = () => {
    const {currenciesList, currentCurrencyVal, initialCurrency} = this.state

    return (
      <div className="currencies-container">
        <input
          type="text"
          className="form-control input-text"
          placeholder="currency value"
          value={currentCurrencyVal}
          onChange={this.onChangeCurrentCurrency}
        />
        <select
          className="form-control input-text2"
          value={initialCurrency}
          onChange={this.onChangeCurrentCountry}
        >
          {currenciesList.map(currency => (
            <option value={currency.id} key={currency.id}>
              {currency.currencyName}
            </option>
          ))}
        </select>
      </div>
    )
  }

  getTargetCurrencies = () => {
    const {
      currenciesList,
      targetCurrency,
      targetCurrencyVal,
      currentCurrencyVal,
    } = this.state

    return (
      <div className="currencies-container">
        <input
          type="text"
          className="form-control input-text"
          value={targetCurrencyVal * currentCurrencyVal}
          onChange={this.getTargetCurrency}
        />
        <select
          className="form-control input-text2"
          value={targetCurrency}
          onChange={this.onChangeTargetCurrency}
        >
          {currenciesList.map(currency => (
            <option value={currency.id} key={currency.id}>
              {currency.currencyName}
            </option>
          ))}
        </select>
      </div>
    )
  }

  submitForm = event => {
    event.preventDefault()
  }

  onClickLogout = () => {
    localStorage.clear()
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {
      currentCurrencyVal,
      initialCurrency,
      targetCurrency,
      targetCurrencyVal,
    } = this.state

    const storedDetails = localStorage.getItem('userDetails')

    if (storedDetails === null) {
      return <Redirect to="/login" />
    }

    return (
      <div className="app-container">
        <h1 className="home-heading">Currency Converter</h1>
        <div className="app-sub-container">
          <form className="app-converter-container" onSubmit={this.submitForm}>
            {this.getCurrentCurrencies()}
            {this.getTargetCurrencies()}
          </form>
          <p className="result-currency">
            {currentCurrencyVal} {codeToCountry[initialCurrency]} currency is
            equals to {targetCurrencyVal * currentCurrencyVal}{' '}
            {codeToCountry[targetCurrency]} currency
          </p>
        </div>
        <button
          type="button"
          className="logout-btn"
          onClick={this.onClickLogout}
        >
          Logout
        </button>
      </div>
    )
  }
}

export default Home
