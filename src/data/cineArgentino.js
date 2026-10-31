// Recorrido por el cine argentino: épocas con una intro corta y,
// para cada película, una línea de por qué verla.

export const EPOCAS = [
  {
    id: "pioneros",
    titulo: "Los pioneros",
    desde: 1900, hasta: 1932,
    intro:
      "Cine mudo, cámaras traídas de Europa y un público que llenaba salas de barrio. " +
      "Los primeros éxitos ya contaban lo que iba a ser un tema eterno: el campo contra la ciudad.",
  },
  {
    id: "estudios",
    titulo: "Los estudios y la época de oro",
    desde: 1933, hasta: 1955,
    intro:
      "Con el sonido llegan Argentina Sono Film y Lumiton, el tango entra a la pantalla y nace un " +
      "star system que exporta películas a toda Latinoamérica. Comedia popular, melodrama y, " +
      "de a poco, un cine social que mira el interior del país.",
  },
  {
    id: "sesenta",
    titulo: "La ruptura y la Generación del 60",
    desde: 1956, hasta: 1966,
    intro:
      "Caídos los grandes estudios, aparecen directores jóvenes influidos por la Nouvelle Vague y el " +
      "neorrealismo. Torre Nilsson abre el camino; Birri funda el documental social en Santa Fe; " +
      "Kuhn, Murúa y Favio filman con poca plata y mucha libertad.",
  },
  {
    id: "politico",
    titulo: "Cine político y años de plomo",
    desde: 1967, hasta: 1982,
    intro:
      "El cine se vuelve herramienta de lucha: militante, clandestino o de gran público. " +
      "Después de 1976 llegan la censura, las listas negras, el exilio y los desaparecidos; " +
      "lo que se puede decir se dice con metáforas.",
  },
  {
    id: "democracia",
    titulo: "La vuelta de la democracia",
    desde: 1983, hasta: 1995,
    intro:
      "Se termina la censura y el cine se pone a contar lo que pasó. Llegan el primer Óscar, " +
      "los premios en festivales y también la comedia que se ríe de la familia argentina.",
  },
  {
    id: "nuevo",
    titulo: "El Nuevo Cine Argentino",
    desde: 1996, hasta: 2008,
    intro:
      "Egresados de escuelas de cine, presupuestos mínimos, actores no profesionales y la calle como " +
      "escenario. Una generación que cambió la forma de filmar el país, entre la crisis de 2001 y los " +
      "festivales internacionales.",
  },
  {
    id: "hoy",
    titulo: "El cine de hoy",
    desde: 2009, hasta: 2100,
    intro:
      "Conviven los éxitos masivos que ganan Óscar y Globos de Oro con un cine de autor arriesgado, " +
      "de películas largas y producción independiente, que se ve en los festivales del mundo.",
  },
];

export function epocaDe(anio) {
  return EPOCAS.find(e => anio >= e.desde && anio <= e.hasta) || EPOCAS[EPOCAS.length - 1];
}

// Clave: el título tal como está en el catálogo.
export const POR_QUE_VERLA = {
  "Nobleza gaucha":
    "Uno de los primeros grandes éxitos del cine mudo argentino: un gaucho, un patrón abusador y el contraste entre la estancia y Buenos Aires.",
  "Los tres berretines":
    "De las primeras sonoras de Lumiton. Los tres berretines porteños —fútbol, tango y cine— en una comedia familiar con Luis Sandrini.",
  "Los muchachos de antes no usaban gomina":
    "Manuel Romero retrata la Buenos Aires del Novecientos, entre cabarets, compadritos y tango. Un clásico que dejó frase hecha.",
  "Prisioneros de la tierra":
    "Mario Soffici lleva a Horacio Quiroga a los yerbatales de Misiones. La explotación de los mensúes en una de las mejores películas argentinas de todos los tiempos.",
  "La guerra gaucha":
    "Basada en Leopoldo Lugones: las guerrillas de Güemes contra los realistas. Una superproducción épica que fue un fenómeno de público.",
  "Dios se lo pague":
    "Melodrama de la época de oro con Arturo de Córdova y Zully Moreno: un mendigo que esconde una doble vida. Puro star system de los estudios.",
  "Pelota de trapo":
    "Leopoldo Torres Ríos filma el fútbol de potrero y la infancia de barrio con una ternura que anticipa el neorrealismo.",
  "Las aguas bajan turbias":
    "Hugo del Carril dirige y protagoniza la vida de los mensúes en el Alto Paraná. Cine social potente, basado en la novela de Alfredo Varela.",
  "La casa del ángel":
    "Leopoldo Torre Nilsson y Beatriz Guido: el despertar de una adolescente en una familia católica y asfixiante. Acá empieza el cine moderno argentino.",
  "Shunko":
    "Lautaro Murúa sigue a un maestro rural en Santiago del Estero, con chicos que hablan quichua. Sencilla, humana y adelantada a su época.",
  "Tire dié":
    "Fernando Birri y sus alumnos filman a los chicos que corren junto al tren pidiendo monedas. Documental fundador del nuevo cine latinoamericano.",
  "Los jóvenes viejos":
    "Rodolfo Kuhn retrata el aburrimiento de tres jóvenes de clase media en Mar del Plata. Manifiesto de la Generación del 60.",
  "Crónica de un niño solo":
    "El debut de Leonardo Favio: un chico que escapa de un reformatorio. Seca, dolorosa, inolvidable.",
  "La hora de los hornos":
    "Fernando Solanas y Octavio Getino hacen un documental-ensayo militante que se proyectaba a escondidas. Pieza clave del 'tercer cine'.",
  "Juan Moreira":
    "Favio vuelve al gaucho perseguido por la ley y lo convierte en mito popular. Uno de los mayores éxitos de taquilla del cine argentino.",
  "Los traidores":
    "Raymundo Gleyzer denuncia la burocracia sindical en una ficción hecha en la clandestinidad. Gleyzer fue desaparecido en 1976.",
  "La Patagonia rebelde":
    "Héctor Olivera y Osvaldo Bayer cuentan el fusilamiento de los peones huelguistas de 1921. Fue prohibida apenas se estrenó.",
  "La tregua":
    "Sergio Renán adapta a Mario Benedetti con Héctor Alterio. Fue la primera película argentina nominada al Óscar.",
  "Nazareno Cruz y el lobo":
    "Favio lleva al cine la leyenda del lobizón: una fábula visual, exagerada y hermosa que llenó salas en todo el país.",
  "Tiempo de revancha":
    "Adolfo Aristarain y Federico Luppi: un obrero que se finge mudo para cobrarle a una minera. Una metáfora de la dictadura filmada en plena dictadura.",
  "Plata dulce":
    "Fernando Ayala retrata la época de la 'plata dulce' y la especulación financiera, con Luppi y Julio De Grazia. Para entender la economía argentina riéndose.",
  "No habrá más penas ni olvido":
    "Héctor Olivera adapta a Osvaldo Soriano: peronistas contra peronistas en un pueblo de provincia. Grotesca y trágica a la vez.",
  "Camila":
    "María Luisa Bemberg cuenta el amor prohibido de Camila O'Gorman y un cura en la época de Rosas. Nominada al Óscar y un hito del cine hecho por mujeres.",
  "La historia oficial":
    "Luis Puenzo y Norma Aleandro: una profesora descubre que su hija adoptiva puede ser hija de desaparecidos. El primer Óscar del cine argentino.",
  "Esperando la carroza":
    "Comedia de culto de Alejandro Doria, con China Zorrilla y Antonio Gasalla como Mamá Cora. Una familia argentina en su versión más delirante.",
  "Hombre mirando al sudeste":
    "Eliseo Subiela: un paciente psiquiátrico dice venir de otro planeta. Ciencia ficción íntima y una de las películas argentinas más queridas afuera.",
  "Sur":
    "Fernando Solanas filma el regreso de un preso político al final de la dictadura, con tango y niebla. Premio a la mejor dirección en Cannes.",
  "Un lugar en el mundo":
    "Adolfo Aristarain con Luppi y Cecilia Roth: una familia que eligió un pueblo de San Luis para resistir. Concha de Oro en San Sebastián.",
  "Pizza, birra, faso":
    "Adrián Caetano y Bruno Stagnaro siguen a pibes que roban en Buenos Aires. La película que arrancó el Nuevo Cine Argentino.",
  "Mundo grúa":
    "Pablo Trapero, en blanco y negro y con un actor no profesional: un tipo grande que aprende a manejar una grúa. El trabajo y la crisis sin discursos.",
  "Nueve reinas":
    "Fabián Bielinsky y dos estafadores en un día por Buenos Aires, con Darín y Pauls. Un guion de relojería que copiaron en todo el mundo.",
  "La ciénaga":
    "El debut de Lucrecia Martel: una familia en decadencia durante un verano en Salta. Hay que escucharla tanto como verla.",
  "La libertad":
    "Lisandro Alonso sigue un día en la vida de un hachero de La Pampa, casi sin diálogos. Cine contemplativo que hizo escuela.",
  "Historias mínimas":
    "Carlos Sorín cruza tres historias por la ruta patagónica con actores no profesionales. Pequeña, cálida y muy graciosa.",
  "Los rubios":
    "Albertina Carri, hija de desaparecidos, hace un documental que discute cómo se construye la memoria. Polémica y fundamental.",
  "El secreto de sus ojos":
    "Juan José Campanella y Ricardo Darín: un crimen sin resolver de los años 70. El segundo Óscar del cine argentino.",
  "Relatos salvajes":
    "Damián Szifron arma seis cuentos sobre gente que explota. Nominada al Óscar y uno de los mayores éxitos de taquilla del país.",
  "El ciudadano ilustre":
    "Mariano Cohn y Gastón Duprat: un Nobel de Literatura vuelve a su pueblo. Oscar Martínez ganó la Copa Volpi en Venecia.",
  "Zama":
    "Lucrecia Martel adapta a Antonio Di Benedetto: un funcionario colonial que espera un traslado que nunca llega. Hipnótica.",
  "Argentina, 1985":
    "Santiago Mitre y Ricardo Darín como el fiscal Strassera en el Juicio a las Juntas. Ganó el Globo de Oro y fue nominada al Óscar.",
  "Trenque Lauquen":
    "Laura Citarella y El Pampero Cine: una mujer desaparece en un pueblo de la provincia y la película se convierte en misterio, en dos partes.",
};
