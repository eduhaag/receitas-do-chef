import { ComponentFactoryResolver, Injectable } from '@angular/core';
import {SQLiteObject, SQLite} from '@ionic-native/sqlite/ngx';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {SQLitePorter} from '@ionic-native/sqlite-porter/ngx';
import {HttpClient} from '@angular/common/http';

export interface Receita{
  id: number;
  nome: string;
  img: string;
  minutos: number;
  porcoes: number;
  dificuldade: string;
  preparo?: string[];
  ingredientes?: Ingrediente[] ;
  categoriaID?: number;
}

export interface Ingrediente{
  nome: string;
  quantidade: number;
  unidade: string;
}

export interface Categoria{
  id: number;
  nome: string;
  img: string;
  qtdReceitas: number;
}

interface ReceitaPageDTO{
  receitas: Receita[];
  qtdReceitas: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  categorias= new BehaviorSubject([]);

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
    //cria o banco de dados
    this.plt.ready().then(()=>{
      this.sqlite.create({
        name: 'receitas.db',
        location: 'default'
      })
      .then((db: SQLiteObject)=>{
        this.database=db;
        this.inicializaBanco();
      });
    });
  };

  inicializaBanco(){
    this.http.get('assets/banco.sql', {responseType: 'text'})
    .subscribe(sql=>{
      this.sqlitePorter.importSqlToDb(this.database, sql)
      .then(_=>{
        this.loadCategorias();
        this.dbReady.next(true);
      })
      .catch(e=>{
        console.error(e);
      });
    });
  };

  //observables
  getStatus(){
    return this.dbReady.asObservable();
  };

  getCategorias(){
    return this.categorias.asObservable();
  };

  //carrega categorias
  async loadCategorias(){
    // eslint-disable-next-line max-len
    const query = 'SELECT categorias.*, (SELECT count(receitas.categoriaId) FROM receitas WHERE receitas.categoriaId = categorias.id) AS qtd_receitas FROM categorias';

    const data = await this.database.executeSql(query, []);
    const categorias: Categoria[] = [];
    if (data.rows.length > 0) {
      for (let i = 0; i < data.rows.length; i++) {
        categorias.push({
          id: data.rows.item(i).id,
          nome: data.rows.item(i).nome,
          img: data.rows.item(i).img,
          qtdReceitas: data.rows.item(i).qtd_receitas
        });
      }
    }
    this.categorias.next(categorias);
  };

  async getCategoriaByID(id: number): Promise<Categoria>{
    const data = await this.database.executeSql(
      // eslint-disable-next-line max-len
      `SELECT categorias.*, (SELECT count(receitas.categoriaId) FROM receitas WHERE receitas.categoriaId = categorias.id) AS qtd_receitas FROM categorias WHERE id=${id}`,
      []
    );

    const categoria: Categoria={
      id: data.rows.item(0).id,
      nome: data.rows.item(0).nome,
      img: data.rows.item(0).img,
      qtdReceitas: data.rows.item(0).qtd_receitas
    };

    return categoria;

  }

  async getReceitasByCategoriaID(id: number): Promise<ReceitaPageDTO>{
    const receitas: Receita[]=[];

    const data = await this.database.executeSql(
      `SELECT receitas.* FROM receitas WHERE categoriaId=${id}`,[]
    );

    if(data.rows.length > 0){
        for(let i=0; i<data.rows.length; i++){
          receitas.push({
            id: data.rows.item(i).id,
            nome: data.rows.item(i).nome,
            img:data.rows.item(i).img,
            minutos: data.rows.item(i).minutos,
            dificuldade: data.rows.item(i).dificuldade,
            porcoes:data.rows.item(i).porcoes,
            ingredientes:JSON.parse(data.rows.item(i).ingredientes),
            preparo: JSON.parse(data.rows.item(i).preparo),
            categoriaID:data.rows.item(i).categoriaId
          });
        }
      }

    return {
      qtdReceitas:receitas.length,
      receitas
    };
  }

  salvarReceita({id, nome,dificuldade,img,minutos,preparo,porcoes,categoriaID,ingredientes}: Receita){
    const dados = [
      nome, dificuldade, img,
      minutos, JSON.stringify(preparo),
      porcoes, categoriaID, JSON.stringify(ingredientes)];

    console.log({ingredientes, preparo});
    let query;
    if(id){
      query=
      `UPDATE receitas SET nome=?, dificuldade=?, img=?, minutos=?, preparo=?, porcoes=?, categoriaId=?, ingredientes=? WHERE id=${id}`;
    }else{
      query=
      'INSERT INTO receitas (nome, dificuldade, img, minutos, preparo, porcoes, categoriaId, ingredientes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    }

    return this.database.executeSql(query,dados).then(_=>{this.loadCategorias();});
  }
}
