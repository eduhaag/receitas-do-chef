import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  receita={};

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  selecionaCorDificuldade(dificuldade: string){
    let cor;

    switch(dificuldade){
      case 'Fácil':
        return '#1A9F2F';
      case 'Médio':
        return '#FFB629';
      case 'Difícil':
        return '#EE5248';
    }
  }

  voltar(){
    this.location.back();
  }

  compartilhar(){
  }

  editar(){
    this.router.navigate(['edit-recipe']);
  }

  excluir(){
  }
}
