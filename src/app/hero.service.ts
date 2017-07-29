import { Injectable } from '@angular/core';

import { Hero } from './shared/hero.model';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  getHeroes(): Promise<Hero[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(HEROES), 2000);
    });
  }
}
