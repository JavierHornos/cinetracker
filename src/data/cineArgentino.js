// "Historia del cine argentino": el libro en nueve capítulos que arma la sección Cine argentino.
// Los textos usan un markdown mínimo (### subtítulo, - lista, 1. lista, | tabla |, **negrita**,
// *itálica*, [link](url)) que dibuja components/TextoMd.jsx. Cada capítulo lista, en `peliculas`,
// los títulos del catálogo que se marcan como vistas debajo de su texto.

export const HISTORIA_INTRO = `El cine argentino tiene más de 125 años. Empezó con una proyección de los Lumière en 1896, fue el primer productor de cine en castellano en 1939 y ganó dos Oscar (1986 y 2010). Este recorrido lo cuenta en nueve épocas, cada una con su contexto, sus directores, sus actores y las películas para ver.

Una idea atraviesa toda la historia: el cine argentino siempre dependió del Estado y de la política. Cada golpe militar, cada ley de cine y cada crisis económica cambió qué se filmaba y quién podía filmar. Esa tensión vuelve a estar en primer plano hoy, en 2026.`;

export const CAPITULOS = [
  {
    id: "mudo", numero: 1, titulo: "El cine mudo", desde: 1896, hasta: 1932,
    texto: `El 18 de julio de 1896 se proyectaron en el Teatro Odéon de Buenos Aires los cortos de los hermanos Lumière, siete meses después del estreno en París. Al público lo acompañó el presidente Carlos Pellegrini. Desde ahí, el cine se armó con inmigrantes, fotógrafos y comerciantes.

### Los pioneros

- **Henri Lepage** y **[Max Glücksmann](#/persona/1920262)** importaron cámaras y proyectores. Glücksmann sería después el gran distribuidor y exhibidor del país.
- **[Eugenio Py](#/persona/1266997)**, fotógrafo francés, filmó *La bandera argentina* (1897), considerado el primer corto filmado en el país.
- **[Mario Gallo](#/persona/1037358)**, italiano, dirigió *El fusilamiento de Dorrego* (1908) y *La Revolución de Mayo*, estrenada el 23 de mayo de 1909. Esa fecha es hoy el Día del Cine Nacional.

### Del corto al largometraje

*Amalia* (1914), basada en la novela de José Mármol, es el largometraje argentino más antiguo que se conserva. Al año siguiente llegó el primer gran éxito: *Nobleza gaucha* (1915), un drama rural de Humberto Cairo, Eduardo Martínez de la Pera y Ernesto Gunche. Estuvo en cartel más de veinte años y mostró que el cine local podía ser negocio.

En 1917 el italiano **Quirino Cristiani** hizo *El Apóstol*, una sátira política sobre el presidente Yrigoyen. Es el primer largometraje animado de la historia del cine, anterior a Disney. No se conserva ninguna copia. De Cristiani sobrevivió un solo corto, *El mono relojero* (1938): está en la lista de abajo.

### El Negro Ferreyra y el tango

**José Agustín Ferreyra** fue el director más importante de los años 20. Filmaba en el arrabal, con actores no profesionales y sin guion cerrado, mucho antes del neorrealismo. Sus melodramas de tango, como *La muchacha del arrabal* (1922), inventaron un Buenos Aires de conventillos y milongas que el cine sonoro iba a heredar.

![El equipo de *La muchacha del arrabal* (José A. Ferreyra, 1922), una de las películas perdidas del cine mudo. Foto vía [cinenacional.com](https://cinenacional.com/pelicula/la-muchacha-del-arrabal).](/img/muchacha-del-arrabal-1922.webp)

Casi todo el cine mudo argentino se perdió: sobreviven muy pocas películas. Por eso esta época se conoce más por libros que por películas. *El Apóstol* y *La muchacha del arrabal* están perdidas; de las que sí se conservan, *Amalia* (1914), *Nobleza gaucha* (1915) y *Perdón viejita* (1927), de Ferreyra, se pueden ver completas acá abajo.`,
    peliculas: ["Nobleza gaucha"],
  },
  {
    id: "sonoro", numero: 2, titulo: "Llega el sonido y nacen los estudios", desde: 1933, hasta: 1945,
    texto: `En 1933 se estrenaron con tres semanas de diferencia las dos primeras películas sonoras argentinas: *¡Tango!* (27 de abril) y *Los tres berretines* (19 de mayo). Con ellas nació una industria que en 1939 ya era la mayor productora de cine en castellano del mundo.

### Dos estudios, dos estilos

- **Argentina Sono Film**, de Ángel Mentasti, nació para estrenar *¡Tango!*, dirigida por Luis Moglia Barth. Se vendía como "una película hablada como hablamos nosotros". Reunía a Libertad Lamarque, Tita Merello, Azucena Maizani, Pepe Arias y un joven Luis Sandrini.
- **Lumiton**, en Munro, fue el primer estudio con equipamiento de Hollywood. *Los tres berretines* retrata a una familia porteña dividida entre tres pasiones: el fútbol, el tango y el cine.

Después llegaron Estudios Río de la Plata (1934), EFA y Pampa Film (1936) y Estudios San Miguel (1939), el más grande del país. La producción pasó de 6 películas en 1933 a unas 50 en 1939 y 56 en 1942.

### Gardel

Carlos Gardel filmó sus películas más famosas para Paramount, en Francia y Nueva York: *Luces de Buenos Aires* (1931), *Cuesta abajo* (1934) y *El día que me quieras* (1935). Gardel murió en Medellín en 1935, pero sus películas demostraron que el tango vendía en toda América Latina.

### Los directores de la época

- **Manuel Romero**, el más prolífico, hizo comedias y melodramas de tango a ritmo de fábrica: *Los muchachos de antes no usaban gomina* (1937), *La rubia del camino* (1938).
- **Mario Soffici** llevó la cámara al interior y a los conflictos sociales. *Prisioneros de la tierra* (1939), sobre los mensualíes de la yerba mate en Misiones, es para muchos la mejor película argentina de su tiempo.
- **Leopoldo Torres Ríos**, **Luis Saslavsky** (*Historia de una noche*, 1941) y **Francisco Mugica** (*Los martes, orquídeas*, 1941, con Mirtha Legrand) completaron un cine de géneros variado.
- **Lucas Demare** fundó con actores la cooperativa Artistas Argentinos Asociados en 1941. Su *La guerra gaucha* (1942), con guion de Homero Manzi y Ulyses Petit de Murat, fue el mayor éxito de taquilla de la época.

### El freno de 1943

Argentina se mantuvo neutral en la Segunda Guerra. En respuesta, Estados Unidos restringió la venta de película virgen al país y apoyó al cine mexicano. México pasó a liderar el mercado en castellano y el cine argentino no recuperó ese lugar.`,
    peliculas: ["Los tres berretines", "Los muchachos de antes no usaban gomina", "Prisioneros de la tierra", "La guerra gaucha"],
  },
  {
    id: "oro", numero: 3, titulo: "La época de oro y el star system", desde: 1945, hasta: 1955,
    texto: `Entre 1945 y 1955 el cine argentino vivió de sus estrellas. El público iba a ver a Sandrini, a Lamarque o a Tita Merello más que a un director. El peronismo protegió la industria con leyes y créditos, pero también la controló.

### Las estrellas

| Figura | Por qué importa | Una película |
| Libertad Lamarque | "La novia de América", el melodrama cantado. En 1946 se fue a México, donde siguió su carrera. | *Ayúdame a vivir* (1936) |
| Niní Marshall | Comediante y autora de sus personajes (Catita, Cándida). También trabajó años en México. | *Mujeres que trabajan* (1938) |
| Luis Sandrini | El cómico tierno y torpe que el público adoró por décadas. | *Cuando los duendes cazan perdices* (1955) |
| Tita Merello | La mujer de arrabal, dura y popular. | *Mercado de abasto* (1955) |
| Hugo del Carril | Cantor, galán y después director. | *Las aguas bajan turbias* (1952) |
| Mirtha Legrand y Zully Moreno | Las damas del cine de teléfonos blancos, la comedia elegante de clase alta. | *Los martes, orquídeas* (1941) |

### El peronismo y el cine

La ley de 1947 obligó a los cines a pasar películas argentinas y el Estado dio créditos a los estudios. La producción volvió a 56 películas en 1950. El costo fue la censura: había listas negras de actores y temas que no se podían tocar. Eva Duarte había sido actriz de cine antes de 1945, y varias figuras enfrentadas con el gobierno trabajaron afuera.

### Los directores

- **Luis César Amadori**, el director comercial más exitoso: *Dios se lo pague* (1948), con Arturo de Córdova y Zully Moreno.
- **Carlos Hugo Christensen**, el más audaz con el erotismo y el policial: *El ángel desnudo* (1946), *No abras nunca esa puerta* (1952).
- **Daniel Tinayre**, el policial y el melodrama oscuro: *A sangre fría* (1947).
- **Leopoldo Torres Ríos**, el cine de barrio y de pibes: *Pelota de trapo* (1948).
- **Hugo del Carril** dirigió *Las aguas bajan turbias* (1952), sobre los trabajadores de los yerbales. Es la película social más importante de la época.

En 1955 cayó Perón, se cortaron los créditos y los grandes estudios entraron en crisis. Lumiton ya había cerrado en 1952 y el resto fue cayendo en los años siguientes.`,
    peliculas: ["Dios se lo pague", "Pelota de trapo", "Las aguas bajan turbias"],
  },
  {
    id: "sesenta", numero: 4, titulo: "Torre Nilsson y la Generación del 60", desde: 1955, hasta: 1966,
    texto: `Con los estudios en caída apareció el cine de autor. El director dejó de ser un empleado de la fábrica y pasó a firmar una mirada propia, como en la Nouvelle Vague francesa que nació en los mismos años.

### Leopoldo Torre Nilsson

Hijo de Leopoldo Torres Ríos, **Torre Nilsson** fue el primer director argentino reconocido en los grandes festivales. *La casa del ángel* (1957) se presentó en Cannes y lo hizo conocido en Europa. Escribía con su mujer, la novelista Beatriz Guido, y retrató una clase alta encerrada, culposa y en decadencia: *La caída* (1959), *La mano en la trampa* (1961). Después hizo cine histórico de gran público, como *Martín Fierro* (1968).

### Fernando Birri y el documental social

En 1956 **Fernando Birri** fundó en la Universidad del Litoral la Escuela Documental de Santa Fe. Su corto *Tire dié* (1960) filma a los chicos que corrían junto al tren pidiendo monedas. Es el punto de partida del documental político latinoamericano. Después hizo la ficción *Los inundados* (1962).

### La Generación del 60

Un grupo de directores jóvenes, que venían del cortometraje y los cineclubes, filmó la vida urbana de la clase media con un lenguaje moderno:

- **Simon Feldman**: *El negoción* (1959).
- **Lautaro Murúa**: *Shunko* (1960), sobre un maestro rural en Santiago del Estero, y *Alias Gardelito* (1961).
- **David José Kohon**: *Tres veces Ana* (1961).
- **Rodolfo Kuhn**: *Los jóvenes viejos* (1962).
- **Manuel Antín**: *La cifra impar* (1962), sobre un cuento de Cortázar.

En paralelo, **Fernando Ayala** y **Héctor Olivera** fundaron en 1956 Aries Cinematográfica, que fue durante décadas la productora comercial más fuerte del país.

### Leonardo Favio, el outsider

Actor de Torre Nilsson, **Leonardo Favio** debutó como director con *Crónica de un niño solo* (1965), sobre un chico internado en un reformatorio. Está filmada en blanco y negro, casi sin diálogo, y suele aparecer entre las mejores películas argentinas. Es el puente hacia el cine popular de los 70.`,
    peliculas: ["La casa del ángel", "Tire dié", "Shunko", "Los jóvenes viejos", "Crónica de un niño solo"],
  },
  {
    id: "politico", numero: 5, titulo: "Cine político y cine popular", desde: 1966, hasta: 1976,
    texto: `Del golpe de Onganía (1966) al de Videla (1976), el cine argentino se partió en dos. De un lado, un cine militante que se filmaba y se exhibía a escondidas. Del otro, el mayor éxito de público del cine nacional hasta entonces.

### Cine Liberación y el Tercer Cine

**Fernando "Pino" Solanas** y **Octavio Getino** filmaron en secreto *La hora de los hornos* (1968), un documental-ensayo de más de cuatro horas sobre el neocolonialismo y el peronismo proscripto. Se pasaba en sindicatos y casas, y la proyección se cortaba para debatir. En 1969 publicaron el manifiesto *Hacia un tercer cine*: ni el cine de Hollywood ni el de autor europeo, sino un cine para la liberación. El texto influyó en todo el Tercer Mundo.

### Raymundo Gleyzer y el Cine de la Base

**Raymundo Gleyzer** formó el grupo Cine de la Base, ligado a la izquierda no peronista. Su ficción *Los traidores* (1973) cuenta la historia de un dirigente sindical corrupto. Gleyzer fue secuestrado en mayo de 1976 y sigue desaparecido.

### Favio, el cine que llenó las salas

**Leonardo Favio** mezcló lo popular con una puesta muy personal. *Juan Moreira* (1973), sobre el gaucho perseguido, y *Nazareno Cruz y el lobo* (1975), una leyenda del lobizón hecha radioteatro, fueron enormes éxitos de taquilla.

### El breve verano de 1973-1974

Con la vuelta del peronismo hubo un año de cine libre y ambicioso:

- *La Patagonia rebelde* (1974), de **Héctor Olivera**, sobre las huelgas rurales de Santa Cruz de 1921, con guion basado en Osvaldo Bayer. Fue un éxito y poco después la prohibieron.
- *La tregua* (1974), de **Sergio Renán**, sobre la novela de Mario Benedetti. Fue la primera película argentina nominada al Oscar.
- *Boquitas pintadas* (1974), de Torre Nilsson, sobre la novela de Manuel Puig.
- *La Raulito* (1975), de Lautaro Murúa, con Marilina Ross.

Desde 1974 la Triple A amenazó a actores y directores, y muchos se fueron del país antes del golpe.`,
    peliculas: ["La hora de los hornos", "Los traidores", "Juan Moreira", "La Patagonia rebelde", "La tregua", "Nazareno Cruz y el lobo"],
  },
  {
    id: "dictadura", numero: 6, titulo: "La dictadura", desde: 1976, hasta: 1983,
    texto: `La última dictadura militar fue el período más oscuro del cine argentino. En 1976 se estrenaron apenas 16 películas nacionales. Hubo cineastas desaparecidos, como Raymundo Gleyzer y Pablo Szir, y muchos otros se exiliaron.

### La censura

El Ente de Calificación Cinematográfica estaba a cargo de **Miguel Paulino Tato**, a quien apodaban "el señor Tijeras". Cortaba escenas, prohibía películas extranjeras enteras y vetaba temas. Existían listas negras: actores como Norma Aleandro, Héctor Alterio y Federico Luppi no podían trabajar o tuvieron que irse. Solanas y Getino filmaron desde el exilio.

### El cine permitido

Lo que llegaba a las salas era sobre todo entretenimiento: comedias de Alberto Olmedo y Jorge Porcel, las películas de Los Superagentes, los musicales con cantantes de moda. Era un cine de evasión, sin conflicto social a la vista.

### Hablar entre líneas

Desde 1978, con la censura un poco más floja, algunos directores contaron el clima de la época con el género como coartada:

- **Adolfo Aristarain**: *La parte del león* (1978) y sobre todo *Tiempo de revancha* (1981), con Federico Luppi. Un obrero se finge mudo para demandar a una empresa minera. Es una metáfora clara del silencio impuesto.
- **Fernando Ayala**: *Plata dulce* (1982), sobre la especulación financiera de la "tablita" de Martínez de Hoz.
- **María Luisa Bemberg**, que empezó a dirigir pasados los 50 años: *Momentos* (1981) y *Señora de nadie* (1982), con una mirada feminista inédita en el cine argentino.
- **Héctor Olivera**: *No habrá más penas ni olvido* (1983), sobre la novela de Osvaldo Soriano, una sátira sobre la violencia interna del peronismo. Se estrenó en el fin de la dictadura.`,
    peliculas: ["Tiempo de revancha", "Plata dulce", "No habrá más penas ni olvido"],
  },
  {
    id: "democracia", numero: 7, titulo: "La vuelta de la democracia", desde: 1983, hasta: 1994,
    texto: `En diciembre de 1983 asumió Raúl Alfonsín y se terminó la censura previa. El cine se dedicó a contar lo que no se había podido contar, y en 1986 llegó el primer Oscar.

### El primer Oscar

*La historia oficial* (1985), de **Luis Puenzo**, con **Norma Aleandro** y **Héctor Alterio**. Una profesora de historia empieza a sospechar que su hija adoptiva es hija de desaparecidos. Ganó el Oscar a la mejor película extranjera en 1986, el primero de América Latina, y Aleandro se llevó el premio a mejor actriz en Cannes.

El año anterior, *Camila* (1984), de **María Luisa Bemberg**, había sido nominada al Oscar. Cuenta el romance prohibido entre Camila O'Gorman y un sacerdote en tiempos de Rosas.

### Las películas de la memoria

- *La noche de los lápices* (1986), de Héctor Olivera, sobre los estudiantes secundarios secuestrados en La Plata en 1976.
- *Tangos, el exilio de Gardel* (1985) y *Sur* (1988), de Pino Solanas, sobre el exilio y el regreso. Solanas ganó el premio a mejor director en Cannes por *Sur*.

### Otros caminos

- **Alejandro Doria**: *Esperando la carroza* (1985), con China Zorrilla y Antonio Gasalla. Una comedia sobre una familia que no quiere cuidar a la madre. Con los años se volvió una película de culto que se cita de memoria.
- **Eliseo Subiela**: *Hombre mirando al sudeste* (1986), sobre un paciente de un neuropsiquiátrico que dice venir de otro planeta. Su argumento es muy parecido al de la norteamericana *K-PAX*.
- **Adolfo Aristarain**: *Un lugar en el mundo* (1992), con Federico Luppi y Cecilia Roth, en un pueblo de San Luis.

### La crisis

La hiperinflación de 1989 hundió la producción: los estrenos nacionales cayeron a mínimos históricos a comienzos de los 90. La salida llegó con una ley nueva, que se cuenta en el próximo capítulo.`,
    peliculas: ["Camila", "La historia oficial", "Esperando la carroza", "Hombre mirando al sudeste", "Sur", "Un lugar en el mundo"],
  },
  {
    id: "nuevo", numero: 8, titulo: "El Nuevo Cine Argentino", desde: 1995, hasta: 2008,
    texto: `Una ley, las escuelas de cine y un festival hicieron nacer la generación más influyente desde los años 60. Con poca plata, actores desconocidos y la calle como escenario, el cine argentino volvió a los grandes festivales.

### Las tres condiciones

1. **La Ley de Cine 24.377 (1994)** creó el INCAA tal como lo conocemos y un Fondo de Fomento que se nutre de un porcentaje de las entradas, del video y de la TV. Por primera vez hubo plata estable para producir.
1. **Las escuelas**: la Universidad del Cine (FUC), fundada por Manuel Antín en 1991, la ENERC y las carreras universitarias formaron a miles de estudiantes a lo largo de los 90.
1. **El BAFICI**, el festival de cine independiente de Buenos Aires, nació en 1999 y fue la vidriera de esta generación.

### El punto de partida

*Historias breves* (1995) juntó los cortos ganadores de un concurso del INCAA. Ahí debutaron Adrián Caetano, Bruno Stagnaro, Lucrecia Martel, Daniel Burman y Sandra Gugliotta. Antes, **Martín Rejtman** había filmado *Rapado* (1992), una película seca y minimalista que anticipó el tono del movimiento.

### Las películas clave

| Año | Película | Director | Por qué importa |
| 1998 | *Pizza, birra, faso* | Caetano y Stagnaro | Pibes de la calle, actores no profesionales, el manifiesto del movimiento |
| 1999 | *Mundo grúa* | Pablo Trapero | Un gruista desocupado; el trabajo en crisis de los 90 |
| 2001 | *La ciénaga* | Lucrecia Martel | Una familia en decadencia en Salta; para muchos, la mejor película argentina |
| 2001 | *La libertad* | Lisandro Alonso | Un hachero solo en el monte, casi sin diálogo |
| 2001 | *Bolivia* | Adrián Caetano | Un inmigrante boliviano en un bar porteño |
| 2002 | *Historias mínimas* | Carlos Sorín | Tres viajes por la ruta patagónica |
| 2003 | *Los rubios* | Albertina Carri | Documental sobre sus padres desaparecidos, que discute cómo se cuenta la memoria |
| 2004 | *El abrazo partido* | Daniel Burman | El barrio del Once; Oso de Plata en Berlín |

### El cine de industria

Al mismo tiempo creció un cine de género con estrellas, que llevó mucho público a las salas:

- *Nueve reinas* (2000), de **Fabián Bielinsky**, con Ricardo Darín y Gastón Pauls. Un thriller de estafadores en plena crisis.
- *El hijo de la novia* (2001), de **Juan José Campanella**, con Darín y Norma Aleandro, nominada al Oscar.

La crisis de 2001 se volvió tema de muchas de estas películas. **Ricardo Darín** se convirtió en esos años en la cara del cine argentino en el mundo.`,
    peliculas: ["Pizza, birra, faso", "Mundo grúa", "Nueve reinas", "La ciénaga", "La libertad", "Historias mínimas", "Los rubios"],
  },
  {
    id: "hoy", numero: 9, titulo: "Del segundo Oscar a hoy", desde: 2009, hasta: 2026,
    texto: `En los últimos quince años el cine argentino ganó su segundo Oscar, tuvo récords de producción y llegó a las plataformas globales. Desde 2024 atraviesa su peor crisis de financiamiento desde la vuelta de la democracia.

### El cine de gran público

- *El secreto de sus ojos* (2009), de **Juan José Campanella**, con Ricardo Darín y Soledad Villamil. Un empleado judicial revisa un crimen de los años 70. Ganó el Oscar a la mejor película extranjera en 2010.
- *Relatos salvajes* (2014), de **Damián Szifron**: seis historias de gente que explota. Nominada al Oscar y uno de los mayores éxitos de taquilla del cine argentino.
- *El clan* (2015), de **Pablo Trapero**, sobre la familia Puccio. León de Plata a la mejor dirección en Venecia.
- *El ciudadano ilustre* (2016), de **Mariano Cohn y Gastón Duprat**. Un Nobel de literatura vuelve a su pueblo. Oscar Martínez ganó la Copa Volpi en Venecia.
- *Argentina, 1985* (2022), de **Santiago Mitre**, con Darín y Peter Lanzani, sobre el Juicio a las Juntas. Ganó el Globo de Oro y fue nominada al Oscar. Es la octava nominación argentina, récord en América Latina.

### El cine de autor

- **Lucrecia Martel**: *Zama* (2017), sobre la novela de Antonio Di Benedetto, un funcionario colonial esperando un traslado que nunca llega. En 2025 presentó en Venecia el documental *Nuestra tierra*, sobre el asesinato del dirigente diaguita Javier Chocobar.
- **Mariano Llinás** y el colectivo **El Pampero Cine** hicieron un cine de producción propia y sin apuro: *Historias extraordinarias* (2008, cuatro horas) y *La flor* (2018, más de trece horas). *Trenque Lauquen* (2022), de Laura Citarella, salió del mismo grupo.
- **Rodrigo Moreno**, **Lisandro Alonso** y **Matías Piñeiro** siguieron circulando por los grandes festivales.

### Las plataformas

Las series cambiaron dónde se hace la ficción argentina. *El Eternauta* (2025), de Bruno Stagnaro para Netflix, con Darín, adaptó la historieta de Oesterheld. En los primeros días fue lo más visto de Netflix en más de 20 países.

### La crisis actual

Desde que asumió Javier Milei, en diciembre de 2023, el gobierno recortó fuerte el presupuesto del INCAA:

- El gasto del INCAA cayó 49,1% real en 2024 y otro 28,7% en 2025. El fomento a la producción cayó 81,8% entre 2023 y 2025.
- El decreto 662/2024 eliminó la cuota de pantalla. La reforma laboral de marzo de 2026 deroga el régimen de fomento desde el 1° de enero de 2028; después el INCAA dependerá del presupuesto anual.
- Hasta el 20 de marzo de 2026 se estrenaron 26 películas argentinas, contra 34 en el mismo período de 2025. En 2026 podrían quedar por debajo de 100 estrenos por primera vez desde 2009.
- El cine nacional tuvo entre 13% y 14,7% de las entradas vendidas entre 2015 y 2018. Hoy ronda el 3%.

Los datos son de [Chequeado (marzo de 2026)](https://chequeado.com/el-explicador/radiografia-del-cine-argentino-en-la-era-milei-4-datos-para-entender-el-tema/). El gobierno defiende los recortes como un ajuste del gasto y un fin de los subsidios. El sector audiovisual, en cambio, habla de una parálisis de la producción. Las películas argentinas que llegaron a Venecia en 2025 eran casi todas coproducciones con financiamiento externo ([Buenos Aires Times](https://www.batimes.com.ar/news/culture/argentine-cinema-enjoys-a-moment-at-venice-despite-cuts.phtml)).`,
    peliculas: ["El secreto de sus ojos", "Relatos salvajes", "El ciudadano ilustre", "Zama", "Argentina, 1985", "Trenque Lauquen"],
  },
];

export function capituloDe(titulo) {
  return CAPITULOS.find(c => c.peliculas.includes(titulo)) || null;
}

// "Qué aprendés" con cada una de las 41 películas.
export const QUE_APRENDES = {
  "Nobleza gaucha": "El primer gran éxito del cine mudo",
  "Los tres berretines": "El nacimiento del sonoro y de Lumiton",
  "Los muchachos de antes no usaban gomina": "El melodrama de tango de estudio",
  "Prisioneros de la tierra": "El cine social del interior",
  "La guerra gaucha": "La épica nacional y la cooperativa AAA",
  "Dios se lo pague": "El star system y el melodrama elegante",
  "Pelota de trapo": "El cine de barrio",
  "Las aguas bajan turbias": "La denuncia social en pleno peronismo",
  "La casa del ángel": "El primer cine de autor",
  "Tire dié": "El origen del documental político",
  "Shunko": "La Generación del 60 en el interior",
  "Los jóvenes viejos": "La modernidad urbana del 60",
  "Crónica de un niño solo": "Un debut que cambió el lenguaje",
  "La hora de los hornos": "El cine militante y el Tercer Cine",
  "Los traidores": "El Cine de la Base",
  "Juan Moreira": "Lo popular hecho autor",
  "La Patagonia rebelde": "La historia que se quiso callar",
  "La tregua": "La primera nominación al Oscar",
  "Nazareno Cruz y el lobo": "El mito popular en la pantalla",
  "Tiempo de revancha": "Cómo hablar bajo censura",
  "Plata dulce": "La economía de la dictadura",
  "No habrá más penas ni olvido": "La sátira política",
  "Camila": "La mirada de una directora",
  "La historia oficial": "El primer Oscar",
  "Esperando la carroza": "La comedia de costumbres",
  "Hombre mirando al sudeste": "Lo fantástico en clave argentina",
  "Sur": "El regreso del exilio",
  "Un lugar en el mundo": "El cine de actores de los 90",
  "Pizza, birra, faso": "El manifiesto del Nuevo Cine Argentino",
  "Mundo grúa": "El realismo con actores no profesionales",
  "Nueve reinas": "El género bien hecho",
  "La ciénaga": "El sonido y el fuera de campo",
  "La libertad": "El cine contemplativo",
  "Historias mínimas": "La ruta y los actores naturales",
  "Los rubios": "El documental en primera persona",
  "El secreto de sus ojos": "El segundo Oscar",
  "Relatos salvajes": "La comedia negra de gran público",
  "El ciudadano ilustre": "La sátira del mundo cultural",
  "Zama": "El cine histórico de autor",
  "Argentina, 1985": "La memoria contada para todos",
  "Trenque Lauquen": "El cine de El Pampero",
};

export const HISTORIA_CIERRE = `Si te interesa el montaje, mirá con atención *Crónica de un niño solo*, *La hora de los hornos*, *La ciénaga* y *Los rubios*. Son cuatro formas muy distintas de pensarlo.`;

export const HISTORIA_FUENTES = `**Fuentes consultadas**

- [23 de mayo, Día del Cine Nacional – Argentina.gob.ar](https://www.argentina.gob.ar/noticias/23-de-mayo-dia-del-cine-nacional): primeras proyecciones, Py, Gallo.
- [Golden Age of Argentine cinema – Wikipedia](https://en.wikipedia.org/wiki/Golden_Age_of_Argentine_cinema): estudios, producción anual, boicot de 1943.
- [Cinema of Argentina – Wikipedia](https://en.wikipedia.org/wiki/Cinema_of_Argentina): cine mudo, censura, nominaciones al Oscar.
- [La aventura del primer film sonoro del país – Infobae](https://www.infobae.com/sociedad/2026/04/27/una-pelicula-hablada-como-hablamos-nosotros-actores-de-teatro-problemas-tecnicos-y-la-aventura-del-primer-film-sonoro-del-pais/): *¡Tango!*.
- [Radiografía del cine argentino en la era Milei – Chequeado](https://chequeado.com/el-explicador/radiografia-del-cine-argentino-en-la-era-milei-4-datos-para-entender-el-tema/): datos de 2024-2026.
- [Argentine cinema enjoys a moment at Venice despite cuts – Buenos Aires Times](https://www.batimes.com.ar/news/culture/argentine-cinema-enjoys-a-moment-at-venice-despite-cuts.phtml).
- [El Eternauta, la serie más vista en 20 países – Misiones Online](https://misionesonline.net/2025/05/02/el-eternauta-serie-de-netflix-mas-vista-en-20-paises/).

El resto de los datos de los capítulos 3 a 8 (filmografías, años de estreno, premios) son conocimiento general de historia del cine, sin una fuente puntual.

**Para seguir**

- *Cine argentino. Industria y clasicismo* y *Cine argentino. Modernidad y vanguardias*, los dos tomos dirigidos por Claudio España (Fondo Nacional de las Artes).
- *Historia del cine argentino*, de Jorge Miguel Couselo y otros autores (CEAL).
- *Otros mundos. Un ensayo sobre el nuevo cine argentino*, de Gonzalo Aguilar.
- El Museo del Cine Pablo Ducrós Hicken, en La Boca, y su archivo.
- La plataforma [Cine.ar](https://cine.ar), del INCAA, donde hay muchas de estas películas gratis.`;

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
