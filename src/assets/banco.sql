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
  VALUES (
    1, 'BOLO DE MAÇÃ DE LIQUIDIFICADOR', '/assets/receitas/bolo_maca.png', 40,
    25, 'Fácil',
    '[{"nome":"farinha de trigo","quantidade":2,"unidade":"xícara(s)"},{"nome":"açúcar","quantidade":2,"unidade":"xícara(s)"},{"nome":"fermento em pó","quantidade":1,"unidade":"cl. sopa"},{"nome":"canela em pó","quantidade":1,"unidade":"cl. sopa"},{"nome":"sal","quantidade":1,"unidade":"pitada(s)"},{"nome":"ovos","quantidade":3,"unidade":"unidade(s)"},{"nome":"maçãs grandes","quantidade":3,"unidade":"unidade(s)"},{"nome":"óleo vegetal","quantidade":1,"unidade":"xícara(s)"}]',
    '["Unte e polvilhe com farinha um tabuleiro médio (23×35), ou uma fôrma de buraco no meio.","Em uma tigela grande, peneirar a farinha e o açúcar. Juntar os demais ingredientes secos. Reservar.","Descascar as maçãs, reservando as cascas. Picar em cubinhos.","Bater no liquidificador os ovos, o óleo e as cascas da maçã.","Juntar essa mistura na tigela com os ingredientes secos e misturar delicadamente.","Junte as maçãs picadas, misture e despeje na assadeira.","Asse por cerca de 40 a 50 minutos em forno médio.","Depois de pronto polvilhar açúcar e canela."]',
    1
  );

CREATE TABLE IF NOT EXISTS receita_ingredientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  quantidade INTEGER,
  unidade TEXT,
  receita_id INTEGER
);

