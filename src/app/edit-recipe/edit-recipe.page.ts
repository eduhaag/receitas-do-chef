import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController, ActionSheetController, Platform } from '@ionic/angular';
import { DatabaseService, Ingrediente, Receita } from '../services/database.service';
import {Camera,CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File} from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  origem='';
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
  fotoAtual: string=undefined;

  constructor(
    private database: DatabaseService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private webview: WebView
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      const getNav = this.router.getCurrentNavigation();
      const {state} = getNav.extras;
      if(state){
        if(state.receita){
          this.receita=state.receita;
          this.fotoAtual=this.receita.img;
        }
        if(state.categoriaID){
          this.receita.categoriaID=state.categoriaID;
        }
        this.origem=state.origem;
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

    this.receita.img=this.fotoAtual;

    {this.database.salvarReceita(this.receita).then(_=>{
      this.exibeToast();

      const dados = {
        state:{
          receita: this.receita,
          categoria: this.receita.categoriaID
        }
      };

      this.router.navigate([this.origem], dados);

    }).catch(e=>{
      this.exibeAlert(e.message);
    });}
  }

  async adicionarFoto(){
    const actionSheet = await this.actionSheetController.create({
      header:'Selecione uma imagem:',
      buttons:[
        {
          text:'Galeria',
          handler:()=>{
            this.obtemImagem(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text:'Câmera',
          handler:()=>{
            this.obtemImagem(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role:'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  obtemImagem(sourceType: PictureSourceType){
    const options: CameraOptions={
      quality:100,
      sourceType,
      saveToPhotoAlbum:false,
      correctOrientation:true,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(pathImage=>{
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(pathImage).then(filePath=>{
          const correctPath = filePath.substr(0,filePath.lastIndexOf('/')+1);
          const currentName = pathImage.substring(pathImage.lastIndexOf('/') + 1, pathImage.lastIndexOf('?'));

          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
      }
      else{
        const currentName = pathImage.substr(pathImage.lastIndexOf('/') + 1);
        const correctPath = pathImage.substr(0, pathImage.lastIndexOf('/') + 1);

        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      };
    });
  }

  createFileName() {
    const d = new Date();
    const n = d.getTime();
    const newFileName = n + '.jpg';
    return newFileName;
  }

  async copyFileToLocalDir(namePath, currentName, newFileName) {
    const imgData= await this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName);

    this.fotoAtual=this.pathImage(imgData.nativeURL);
  }

  voltar(){
    this.location.back();
  }

  pathImage(img){
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

}
