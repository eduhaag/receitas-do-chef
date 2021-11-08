import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DatabaseService, Ingrediente, Receita } from '../services/database.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  ingrediente: Ingrediente={
    nome:undefined,
    quantidade:undefined,
    unidade:undefined
  };
  preparo: string;
  receita: Receita={
    id:undefined,
    nome:undefined,
    img:undefined,
    minutos: undefined,
    porcoes:undefined,
    preparo:[],
    ingredientes: [],
    dificuldade:undefined,
    categoriaID: undefined
  };

  constructor(
    private database: DatabaseService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      const getNav = this.router.getCurrentNavigation();
      const {state} = getNav.extras;
      if(state){
        if(state.receita){
          this.receita=state.receita;
        }
        if(state.categoriaID){
          this.receita.categoriaID=state.categoriaID;
        }
      }
    });
  }

  async exibeToast() {
    const toast = await this.toastCtrl.create({
      message: 'Receita salva com sucesso.',
      duration: 2000
    });
    toast.present();
  }

  async exibeAlert(message){
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  adicionarIngrediente(){
    const{nome,quantidade,unidade} = this.ingrediente;

    if(nome &&  quantidade && unidade){
      this.receita.ingredientes.push(this.ingrediente);

      this.ingrediente={
      nome:undefined,
      quantidade:undefined,
      unidade: undefined
    };
    }
  }

  removeIngrediente(ingrediente){
    const ingredienteIndex = this.receita.ingredientes.findIndex(item => item.nome===ingrediente);
    this.receita.ingredientes.splice(ingredienteIndex,1);
  }

  adicionaPreparo(){
    if(this.preparo.trim()){
      this.receita.preparo.push(this.preparo.trim());
      this.preparo=undefined;
    }
  }

  removePreparo(preparo){
    const preparoIndex = this.receita.preparo.findIndex(item=>item===preparo);
    this.receita.preparo.splice(preparoIndex,1);
  }

  salvarReceita(){
    for(const prop in this.receita){
      if((prop!=='id' && prop!=='img' && !this.receita[prop])||this.receita.ingredientes.length===0|| this.receita.preparo.length===0){
        return this.exibeAlert('Todos os campos devem ser preenchidos.');
      }
    }


    {this.database.salvarReceita(this.receita).then(_=>{
      this.exibeToast();
      this.location.back();
    }).catch(e=>{
      this.exibeAlert(e.message);
    });}

  }

  adicionarFoto(){}

  voltar(){
    this.location.back();
  }

}
