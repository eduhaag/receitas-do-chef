import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { DatabaseService, Receita } from '../services/database.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  receita: Receita;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private db: DatabaseService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(_=>{
      const getNav= this.router.getCurrentNavigation();
      if(getNav.extras.state.receita){
        this.receita=getNav.extras.state.receita;
      }
    });
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

  async exibeToastDelete(){
    const toast = await this.toastCtrl.create({
      message: 'Receita excluida com sucesso.',
      duration:3000
    });

    await toast.present();
  }

  async exibeAlertDelete(){
    const alert = await this.alertCtrl.create({
      message:'Tem certeza que deseja excluir esta receita?',
      buttons:[
        {
          text:'sim',
          handler:()=>{
            this.excluir();
          }
        },
          {
            text:'cancelar',
            role: 'cancel'
          }
      ]
    });

    await alert.present();
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
    const dados: NavigationExtras = {
      queryParams:{
        categoriaID: this.receita.categoriaID
      }
    };

    this.router.navigate(['category'], dados);
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

  async excluir(){
    {this.db.excluiReceita(this.receita.id).then(_=>{

      const dados: NavigationExtras = {
        queryParams:{
          categoriaID: this.receita.categoriaID
        }
      };

      this.router.navigate(['category'], dados);
      this.exibeToastDelete();
    });
    }
  }
}
