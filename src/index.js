import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListElement = document.querySelector('.country-list');
const countryInfoElemnet = document.querySelector('.country-info');

const onInput = debounce(evt => {
  const name = evt.target.value.trim();
  if (!name) {
    countryInfoElemnet.innerHTML = '';
    countryListElement.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(renderCountry)
    .catch(error => console.log(error));
}, DEBOUNCE_DELAY);

function renderCountry(countries) {
  const inputLength = countries.length;
  if (inputLength > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryListElement.innerHTML = '';
    countryInfoElemnet.innerHTML = '';
    return;
  }
  if (inputLength === 1) {
    countryListElement.innerHTML = '';
    return renderCountryList(countries);
  }
  if (inputLength > 1) {
    countryInfoElemnet.innerHTML = '';
    return renderCountries(countries);
  }
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<div class="country">
    <img src="${country.flags.svg}" alt= "National flag of ${
        country.name.official
      }" width ="100">
    <h2 class="country-info">${country.name.official}</h2></div>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${Object.values(country.languages)}</p>`;
    })
    .join('');
  countryListElement.innerHTML = markup;
}

function renderCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li>
        <img src="${country.flags.svg}" alt= "National flag of ${country.name.official}" width ="70" hight="20">
        <p>${country.name.official}</p>
        </li>`;
    })
    .join('');
  countryListElement.innerHTML = markup;
}
inputEl.addEventListener('input', onInput);
