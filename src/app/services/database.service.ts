import { Injectable } from '@angular/core';
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
  preparo?: string;
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

  getReceitasByCategoriaID(id: number): Receita[]{
    const receitas: Receita[]=[];

    this.database.executeSql(
      `SELECT id, nome, img, minutos, porcoes, dificuldade FROM receitas WHERE categoriaId=${id}`,[]
    ).then(data=>{
      if(data.rows.length > 0){
        for(let i=0; i<data.rows.length; i++){
          receitas.push({
            id: data.rows.item(i).id,
            nome: data.rows.item(i).nome,
            img:data.rows.item(i).img,
            minutos: data.rows.item(i).minutos,
            dificuldade: data.rows.item(i).dificuldade,
            porcoes:data.rows.item(i).porcoes
          });
        }
      }
    }).catch(e=>console.log(e));

    return receitas;
  }

}
