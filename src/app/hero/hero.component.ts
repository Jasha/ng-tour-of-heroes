import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../shared/hero.model';
import { HeroService } from '../shared/hero.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  goToDetail() {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  onAdd(name: string): void {
    this.heroService.addHero(name.trim())
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  onDelete(hero: Hero): void {
    this.heroService.deleteHero(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);

        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
