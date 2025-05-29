/* ########################################################### */
/* #######################  Variables  ####################### */
/* ########################################################### */
const anchura = 640;
const altura = 480;

let preguntas;
let pantallaInicio;
let pantallaCuestionario;
let navegacion;
let sonidoAmbiente;
let sonidoBoton;
let imgUsuario;

/* ########################################################### */
/* ###################  Métodos de p5.js  #################### */
/* ########################################################### */

/**
 * Método invocado por setup() para cargar información necesaria
 * de forma asíncrona (en segundo plano)
 * */
function preload() {
    // Cargamos el json de preguntas
    preguntas = loadJSON("assets/js/questions.json");

    // Cargamos los sonidos
    sonidoAmbiente = loadSound('assets/sounds/ambiente.mp3');
    sonidoBoton = loadSound('assets/sounds/boton.mp3');

    // Cargamos las imágenes
    imgUsuario = loadImage('assets/images/usuario.png');
}

/**
 * Método invocado una única vez por p5.js al iniciar el programa
 * para establecer la información necesaria para su funcionamiento
 * */
function setup() {
    // Establecemos el tamaño del marco sobre el que trabajará p5.js
    var canvasP5 = createCanvas(anchura, altura);

    // Indicamos que el canvas lo pinte en el div html con el siguiente id
    canvasP5.parent("canvas");

    navegacion = {
        inicio: true,
        cuestionario: false
    };
    
    storeItem('ranking', []);
    pantallaInicio = new PantallaInicio(
        0, 0, anchura, altura, navegacion, sonidoBoton);
    pantallaCuestionario = new PantallaCuestionario(
        0, 0, anchura, altura, navegacion, preguntas, sonidoBoton, imgUsuario);

    // Iniciamos el sonido de ambiente
    sonidoAmbiente.play();

    // Establecemos las invocaciones por segundo al método draw()
    frameRate(30);
}

/**
 * Método invocado consecutivamente por p5.js
 * para mostrar en pantalla la información del programa
 * */
function draw() {
    // Limpiamos el canvas
    clear();

    if (navegacion.inicio === true) {
        // Mostramos la pantalla de inicio
        pantallaInicio.mostrar();
    } else {
        // Mostramos la pantalla de cuestionario
        pantallaCuestionario.mostrar();
    }
}