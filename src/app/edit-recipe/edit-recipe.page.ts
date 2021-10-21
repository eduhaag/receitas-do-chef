import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {

  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  adicionarIngrediente(){}

  adicionarPasso(){}

  salvarReceita(){}

  adicionarFoto(){}

  voltar(){
    this.location.back();
  }

}
