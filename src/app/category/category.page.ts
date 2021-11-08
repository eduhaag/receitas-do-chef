import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';

import {Categoria, Receita, DatabaseService} from '../services/database.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})

export class CategoryPage implements OnInit {
  receitas: Receita []=[];
  categoria: Categoria;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params=>{
      const getNav= this.router.getCurrentNavigation();
      if(getNav.extras.state.categoria){
        this.categoria=getNav.extras.state.categoria;
        this.loadReceitas();
      }
    });
  }

  async loadReceitas(){
    const {receitas, qtdReceitas} = await this.db.getReceitasByCategoriaID(this.categoria.id);
    this.receitas=receitas;
    this.categoria.qtdReceitas=qtdReceitas;
  }

  voltar(){
    this.location.back();
  }

  adicionarReceita(){
    const dados = {
      state: {
        categoriaID: this.categoria.id
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
