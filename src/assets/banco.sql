CREATE TABLE IF NOT EXISTS categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, img TEXT);

INSERT or IGNORE INTO categorias (id, nome, img) VALUES (1, 'Bolos e tortas', '/assets/categorias/bolos_e_tortas.png');
INSERT or IGNORE INTO categorias (id, nome, img) VALUES (2, 'Carnes', '/assets/categorias/carnes.jpg');
INSERT or IGNORE INTO categorias (id, nome, img) VALUES (3, 'Saladas e molhos', '/assets/categorias/saladas_e_molhos.jpg');
INSERT or IGNORE INTO categorias (id, nome, img) VALUES (4, 'Massas', '/assets/categorias/massas.jpg');
INSERT or IGNORE INTO categorias (id, nome, img) VALUES (5, 'Doces e sobremesas', '/assets/categorias/doces_e_sobremesas.jpg');
INSERT or IGNORE INTO categorias (id, nome, img) VALUES (6, 'Drinks', '/assets/categorias/drinks.png');

CREATE TABLE IF NOT EXISTS receitas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  img TEXT,
  minutos INTEGER,
  porcoes INTEGER,
  dificuldade TEXT,
  ingredientes TEXT,
  preparo TEXT,
  categoriaId INTEGER
);

INSERT or IGNORE INTO receitas (id, nome, img, minutos, porcoes, dificuldade, ingredientes, preparo, categoriaId)
  VALUES (1, 'BOLO DE MAÇÃ DE LIQUIDIFICADOR', '/assets/receitas/bolo_maca.png', 40, 25, 'Fácil', 'ingredientes', 'preparooo', 1);

CREATE TABLE IF NOT EXISTS receita_ingredientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  quantidade INTEGER,
  unidade TEXT,
  receita_id INTEGER
);

