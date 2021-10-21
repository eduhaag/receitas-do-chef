import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  categorias: [];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){}

  acessarCategoria(){
    this.router.navigate(['category']);
  }

  qtdeReceitas(qtde){
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
