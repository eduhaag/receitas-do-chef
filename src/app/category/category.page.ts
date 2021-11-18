import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import {Categoria, Receita, DatabaseService} from '../services/database.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage {
  receitas: Receita []=[];
  categoria: Categoria={
    id:undefined,
    img:undefined,
    nome:undefined,
    qtdReceitas:0
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private db: DatabaseService,
  ) {
    this.route.queryParams.subscribe(params =>{
      if(params && params.categoriaID){
        this.inicializa(params.categoriaID);
      }
    });
  }

  async inicializa(categoriaID){
    this.categoria= await this.db.getCategoriaByID(categoriaID);

  }

  async ionViewDidEnter(){
    if(this.categoria.id){
      this.receitas= await this.db.getReceitasByCategoriaID(this.categoria.id);
    }
  }

  voltar(){
    this.router.navigate(['home']);
  }

  adicionarReceita(){
    const dados = {
      state: {
        categoriaID: this.categoria.id,
        origem: 'category'
      }
    };
    this.router.navigate(['edit-recipe'], dados);
  }

  selecionaReceita(receita){
    const dados = {
      state:{
        receita
      }
    };
    this.router.navigate(['recipe'], dados);
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
  };

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
