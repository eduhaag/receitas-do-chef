import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingrediente, Receita } from '../services/database.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  receita: Receita;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params=>{
      const getNav= this.router.getCurrentNavigation();
      if(getNav.extras.state.receita){
        this.receita=getNav.extras.state.receita;
      }
    });
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

  handleImg(){
    if (this.receita.img){
      return this.receita.img;
    }
    else{
      return '/assets/no_image_receita.png';
    }
  }

  voltar(){
    this.router.navigate(['category']);
  }

  compartilhar(){
  }

  editar(){
    const dados = {
      state:{
        receita: this.receita,
        origem: 'recipe'
      }
    };
    this.router.navigate(['edit-recipe'], dados);
  }

  excluir(){
  }
}
