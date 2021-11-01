import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import {DatabaseService, Categoria} from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  categorias: Categoria[]=[];

  constructor(
    private router: Router,
    private db: DatabaseService
  ) { }


  ionViewDidEnter(){
    this.db.getStatus().subscribe(rdy=>{
      if(rdy){
        this.db.getCategorias().subscribe(result=>{
          this.categorias=result;
        });
      }
    });
  }

  acessarCategoria(categoria: Categoria){
    const dadosCategoria = {
      state:{
        categoria
      }
    };
    this.router.navigate([`category`],dadosCategoria);
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
