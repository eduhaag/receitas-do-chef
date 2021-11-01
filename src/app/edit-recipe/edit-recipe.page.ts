import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Ingrediente, Receita } from '../services/database.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  listaIngredientes: Ingrediente [] = [];
  ingrediente: Ingrediente={
    nome:undefined,
    quantidade:undefined,
    unidade:undefined
  };
  listaPreparo: string[]=[];
  preparo: string;
  receita: Receita={
    id:undefined,
    nome:undefined,
    img:undefined,
    minutos: undefined,
    porcoes:undefined,
    dificuldade:undefined,
    categoriaID: undefined
  };

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  adicionarIngrediente(){
    const{nome,quantidade,unidade} = this.ingrediente;

    if(nome &&  quantidade && unidade){
      this.listaIngredientes.push(this.ingrediente);

      this.ingrediente={
      nome:undefined,
      quantidade:undefined,
      unidade: undefined
    };
    }
  }

  removeIngrediente(ingrediente){
    const ingredienteIndex = this.listaIngredientes.findIndex(item => item.nome===ingrediente);
    this.listaIngredientes.splice(ingredienteIndex,1);
  }

  adicionaPreparo(){
    if(this.preparo.trim()){
      this.listaPreparo.push(this.preparo.trim());
      this.preparo=undefined;
    }
  }

  removePreparo(preparo){
    const preparoIndex = this.listaPreparo.findIndex(item=>item===preparo);
    this.listaPreparo.splice(preparoIndex,1);
  }

  salvarReceita(){}

  adicionarFoto(){}

  voltar(){
    this.location.back();
  }

}
