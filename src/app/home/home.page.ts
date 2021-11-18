import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

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
    const dados: NavigationExtras = {
      queryParams:{
        categoriaID: categoria.id
      }
    };

    this.router.navigate(['category'], dados);
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
