import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit {
  nome='Bolos e tortas';
  imagem='/assets/categorias/bolos_e_tortas.png';
  receitas: [];

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {}

  voltar(){
    this.location.back();
  }

  adicionarReceita(){
    this.router.navigate(['edit-recipe']);
  }

  selecionaReceita(){
    this.router.navigate(['recipe']);
  }

  selecionaCorDificuldade(dificuldade: string){
    switch(dificuldade){
      case 'Fácil':
        return '#1A9F2F';
      case 'Médio':
        return '#FFB629';
      case 'Difícil':
        return '#EE5248';
    }
  }

  qtdeReceitas(qtde: number){
    switch(qtde){
      case 0 :
        return 'sem receitas';
      case 1 :
        return '1 receita';
      default:
        return `${qtde} receitas`;
    }
  }

}
