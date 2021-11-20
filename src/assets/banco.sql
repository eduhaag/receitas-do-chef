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
    '["Unte e polvilhe com farinha um tabuleiro médio (23×35), ou uma fôrma de buraco no meio","Em uma tigela grande, peneirar a farinha e o açúcar. Juntar os demais ingredientes secos. Reservar","Descascar as maçãs, reservando as cascas. Picar em cubinhos","Bater no liquidificador os ovos, o óleo e as cascas da maçã","Juntar essa mistura na tigela com os ingredientes secos e misturar delicadamente","Junte as maçãs picadas, misture e despeje na assadeira","Asse por cerca de 40 a 50 minutos em forno médio","Depois de pronto polvilhar açúcar e canela"]',
    1
  ),
  (
    2, 'BOLO DE FUBÁ COM GOIABADA', '/assets/receitas/bolo_fuba.jpg', 40,
    10, 'Fácil',
    '[{"nome":"ovo","quantidade":1,"unidade":"unidade(s)"},{"nome":"fubá","quantidade":1,"unidade":"copo(s)"},{"nome":"açúcar","quantidade":1,"unidade":"copo(s)"},{"nome":"óleo","quantidade":0.5,"unidade":"copo(s)"},{"nome":"farinha de trigo","quantidade":1,"unidade":"copo(s)"},{"nome":"fermento em pó","quantidade":1,"unidade":"cl. sopa"},{"nome":"goiabada em pedaços","quantidade":1,"unidade":"xícara(s)"},{"nome":"erva-doce a gosto","quantidade":1,"unidade":"unidade(s)"}]',
    '["Misture no liquidificador o ovo, o leite, o óleo, o açúcar, o fubá e bata bem","Despeje a mistura em uma tigela, e misture com a farinha e o fermento em pó","espeje a massa em uma forma untada com manteiga e farinha, e acrescente uma camada de goiabada. Repita este processo até preencher toda a forma","Leve ao forno médio (180° C), preaquecido, por 40 minutos"]',
    1
  ),
  (
    3, 'BIFE À PARMEGIANA', '/assets/receitas/bife.jpg', 90,
    6, 'Médio',
    '[{"nome":"carne para bife","quantidade":1,"unidade":"kilo(s)"},{"nome":"dentes de alho","quantidade":3,"unidade":"unidade(s)"},{"nome":"sal","quantidade":2,"unidade":"pitada(s)"},{"nome":"ovo","quantidade":1,"unidade":"unidade(s)"},{"nome":"farinha de rosca","quantidade":1,"unidade":"xícara(s)"},{"nome":"óleo","quantidade":1,"unidade":"cl. sopa"},{"nome":"cebola picada","quantidade":0.5,"unidade":"unidade(s)"},{"nome":"molho de tomate","quantidade":1,"unidade":"copo(s)"},{"nome":"catchup","quantidade":1,"unidade":"cl. café"},{"nome":"mostarda","quantidade":1,"unidade":"cl. chá"},{"nome":"salsinha e cebolinha","quantidade":0.5,"unidade":"xícara(s)"},{"nome":"queijo mussarela","quantidade":1,"unidade":"xícara(s)"}]',
    '["Tempere os bifes com alho e sal e reserve.","Bata o ovo inteiro e passe os bifes pelo ovo e pela farinha de rosca","Aqueça em uma frigideira o óleo e frite os bifes, escorra-os em papel-toalha e vá dispondo em um refratário","Refogue a cebola no óleo, junte o molho de tomate, o catchup, a mostarda, o sal, salsinha e cebolinha, abaixe o fogo e deixe o molho apurar","Despeje o molho pronto sobre os bifes e distribua queijo mussarela sobre os bifes","Salpique delicadamente um pouco de orégano por cima do queijo e leve ao forno até derreter o queijo"]',
    2
  ),
  (
    4, 'COSTELINHA AO MOLHO BARBECUE (OUTBACK)', '/assets/receitas/costelinha.jpg', 70,
    5, 'Difícil',
    '[{"nome":"costelinhas de porco aferventadas em água quente","quantidade":2,"unidade":"kilo(s)"},{"nome":"óleo","quantidade":1,"unidade":"cl. sopa"},{"nome":"cebola picada","quantidade":2,"unidade":"cl. sopa"},{"nome":"açúcar mascavo","quantidade":0.5,"unidade":"cl. chá"},{"nome":"vinagre branco","quantidade":0.5,"unidade":"xícara(s)"},{"nome":"molho inglês","quantidade":2,"unidade":"cl. sopa"},{"nome":"catchup","quantidade":2,"unidade":"xícara(s)"},{"nome":"folha de louro","quantidade":1,"unidade":"unidade(s)"},{"nome":"chilli em pó","quantidade":1,"unidade":"cl. sopa"},{"nome":"água","quantidade":0.5,"unidade":"xícara(s)"}]',
    '["Espalhe sal por toda a carne e coloque para ferver por 10 minutos em um panela com bastante água quente","Escorra a água, arrume as costelinhas em uma assadeira, cubra com papel alumínio e leve ao forno baixo ( 180º) por 40 minutos","Em uma panela, refogue a cebola no óleo, acrescente o açúcar mascavo e o vinagre e deixe o açúcar dissolver","Acrescente o molho inglês, o catchup, o louro, o chilli em pó e a água e cozinhe por 30 minutos em fogo baixo ou até o molho engrossar","Tempere com sal e pimenta-do-reino, coe e reserve","Após os 40 minutos retire as costelinhas do forno, retire o papel alumínio e pincele com o molho","Aumente a temperatura do forno, asse as costelinhas por mais 10 minutos, pincele novamente com o molho, asse mais 5 minutos e repita mais uma vez esta operação","Sirva com mais molho à parte"]',
    2
  ),
  (
    5, 'SALADA DE MACARRÃO COM ATUM', '/assets/receitas/salada_atum.jpg', 30,
    6, 'Médio',
    '[{"nome":"macarrão parafuso","quantidade":250,"unidade":"grama(s)"},{"nome":"cebola bem picadinha","quantidade":0.5,"unidade":"unidade(s)"},{"nome":"tomates sem sementes cortados em cubinhos","quantidade":2,"unidade":"unidade(s)"},{"nome":"milho verde","quantidade":1,"unidade":"copo(s)"},{"nome":"mostarda","quantidade":2,"unidade":"cl. sopa"},{"nome":"atum ralado sem o óleo da conserva","quantidade":2,"unidade":"copo(s)"},{"nome":"maionese","quantidade":1,"unidade":"xícara(s)"}]',
    '["Em uma panela ferva a água para cozinhar o macarrão","Cozinhe da forma tradicional deixando o macarrão al dente","Enquanto isso prepare a mistura para temperar o macarrão","Coloque em uma vasilha grande as 2 latas de atum, a cebola, os tomates, o milho, a maionese, a mostarda, sal, pimenta do reino e o cheiro verde","Cuidadosamente misture bem","Depois que o macarrão estiver cozido, colque em um refratário e adicione a mistura mexendo levemente para não quebrar o macarrão","Quando a mistura estiver bem incorporada ao macarrão leve para a geladeira por no mínimo 1 hora e meia","Eu prefiro fazer com de um dia para o outro,pois o sabor fica bem mais apurado","Sirva como prato principal em dias quentes acompanhado de um frango grelhado"]',
    3
  ),
  (
    6, 'MOLHO BRANCO SIMPLES', '/assets/receitas/molho_branco.jpg', 15,
    4, 'Fácil',
    '[{"nome":"leite frio","quantidade":2,"unidade":"xícara(s)"},{"nome":"manteiga ou margarina","quantidade":2,"unidade":"cl. sopa"},{"nome":"dentes de alho picados","quantidade":2,"unidade":"unidade(s)"},{"nome":"cebola média picada","quantidade":0.5,"unidade":"unidade(s)"},{"nome":"de farinha de trigo (ou maisena)","quantidade":2,"unidade":"cl. sopa"},{"nome":"tablete de caldo de legumes","quantidade":1,"unidade":"unidade(s)"}]',
    '["Dissolva a farinha de trigo em 1/2 xícara de leite e reserve","Em uma panela, doure o alho e a cebola na margarina","Adicione o leite com a farinha, mexa um pouco e acrescente o restante do leite","Após fervura, adicione o caldo de legumes","Mexa, constantemente, até ficar cremoso"]',
    3
  ),
  (
    7, 'PAVÊ DE MARACUJÁ COM PANETONE', '/assets/receitas/pave.jpg', 25,
    5, 'Médio',
    '[{"nome":"panetone de frutas ou chocolate","quantidade":500,"unidade":"grama(s)"},{"nome":"leite condensado","quantidade":1,"unidade":"copo(s)"},{"nome":"suco de maracujá puro (in natura)","quantidade":1,"unidade":"xícara(s)"},{"nome":" chocolate meio amargo","quantidade":180,"unidade":"grama(s)"},{"nome":"creme de leite com soro","quantidade":2,"unidade":"copo(s)"}]',
    '["Com uma faca de serra corte em cubos o panetone e reserve","Bata no liquidificador o leite condensado com o suco de maracujá e o creme de leite","Em um refratário ou taças individuais distribua cubos de panetone, metade do creme, cubos de panetone novamente e o creme restante","Reserve","Misture o chocolate meio amargo picado com o creme de leite e leve ao micro-ondas ou fogo baixo, mexendo até dissolver por completo","Deixe esfriar e espalhe delicadamente sobre o pavê","Leve para gelar por no mínimo 6 horas","Decore com raspas de chocolate no momento de servir"]',
    5
  ),
  (
    8, 'SEX ON THE BEACH', '/assets/receitas/drink.jpg', 5,
    1, 'Fácil',
    '[{"nome":"Vodka","quantidade":1,"unidade":"dose(s)"},{"nome":" Licor de pêssego ","quantidade":0.5,"unidade":"dose(s)"},{"nome":"Suco de Laranja","quantidade":1,"unidade":"dose(s)"},{"nome":"Xarope de Groselha","quantidade":7,"unidade":"pitada(s)"},{"nome":"Pedras de Gelo","quantidade":2,"unidade":"unidade(s)"}]',
    '["Misturar as três primeiras bebidas em uma coqueteleira","Colocar em um copo e adicionar um pouco de groselha"]',
    6
  )
  ;

