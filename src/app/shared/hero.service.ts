import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Hero } from './hero.model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  searchHeroes(term: string): Observable<Hero[]> {
    return this.http.get(`${this.heroesUrl}/?name=${term}`)
      .map(response => response.json().data as Hero[]);
  }

  addHero(name: string): Promise<Hero> {
    return this.http.post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  deleteHero(id: number): Promise<void> {
    return this.http.delete(`${this.heroesUrl}/${id}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.http.get(`${this.heroesUrl}/${id}`)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }

  updateHero(hero: Hero): Promise<Hero> {
    return this.http.put(`${this.heroesUrl}/${hero.id}`, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
