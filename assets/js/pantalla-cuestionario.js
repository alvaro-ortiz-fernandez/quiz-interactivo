/**
 * Clase para gestionar la pantalla de cuestionario, con un listado de preguntas
 * */
class PantallaCuestionario {
    /**
     * Método que inicializa instancias de esta clase.
     * */
    constructor(x, y, anchura, altura, navegacion, setsPreguntas, sonidoBoton, imgUsuario) {
        this.x = x;
        this.y = y;
        this.anchura = anchura;
        this.altura = altura;
        this.navegacion = navegacion;

        this.setsPreguntas = setsPreguntas;
        this.preguntasActuales = [];
        this.indicePreguntaActual = 0;
        this.preguntaActual = {};
        this.progreso = new ProgressBar(x, y + 130, anchura, altura, imgUsuario);
        
        let _this = this;

        this.cuestionario = createRadio();
        this.cuestionario.parent("canvas");
        this.cuestionario.class('radio');
        this.cuestionario.position(x + 250, y + 250);
        this.cuestionario.size(240);
        this.cuestionario.addClass("d-none");

        this.resultados = [];
        this.nuevoSetPreguntas();

        this.botonRestart = new Boton(x + 220, y + 450, "Restart", sonidoBoton, function() {
            _this.nuevoSetPreguntas();
        });
        this.botonRestart.getControl().addClass("d-none");

        this.botonNext = new Boton(x + 310, y + 450, "Next", sonidoBoton, function() {
            _this.siguientePregunta();
        });
        this.botonNext.getControl().addClass("d-none");

        this.botonExit = new Boton(x + 385, y + 450, "Exit", sonidoBoton, function() {
            _this.nuevoSetPreguntas();
            _this.mostrarPantallaInicio();
        });
        this.botonExit.getControl().addClass("d-none");
    }

    /**
     * Método que cambia a la pantalla de inicio.
     * */
    mostrarPantallaInicio() {
        this.navegacion.inicio = true;
        this.navegacion.cuestionario = false;
        this.cuestionario.addClass("d-none");
        this.botonRestart.getControl().addClass("d-none");
        this.botonNext.getControl().addClass("d-none");
        this.botonExit.getControl().addClass("d-none");
    }

    /**
     * Método que establece el cuestionario actual de preguntas.
     * */
    nuevoSetPreguntas() {
        this.nuevoRanking();

        let claves = Object.keys(this.setsPreguntas);
        this.preguntasActuales = this.setsPreguntas[
            claves[Math.floor(Math.random() * claves.length)]];
        this.resultados = [];
        this.progreso.actualizar(this.resultados);
        this.indicePreguntaActual = 0;
        this.siguientePregunta();
    }

    /**
     * Método que avanza a la siguiente pregunta del cuestionario.
     * */
    siguientePregunta() {
        if (this.indicePreguntaActual > 0 && this.cuestionario.value()) {
            this.resultados.push({
                orden: this.indicePreguntaActual,
                resultado: this.cuestionario.value() === this.preguntaActual["correct_answer"]
            })
            this.progreso.actualizar(this.resultados);
        }

        if (this.indicePreguntaActual === 10) {
            this.nuevoSetPreguntas();

        } else if (this.indicePreguntaActual === 0 || this.cuestionario.value()) {
            this.indicePreguntaActual += 1;
            this.preguntaActual = this.preguntasActuales[this.indicePreguntaActual - 1];
            
            // Opciones de respuesta, desordenadas
            const respuestas = [...this.preguntaActual.incorrect_answers, this.preguntaActual.correct_answer];
            for (let i = respuestas.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [respuestas[i], respuestas[j]] = [respuestas[j], respuestas[i]];
            }
            this.cuestionario.elt.innerHTML = '';
            for (let respuesta in respuestas)
                this.cuestionario.option(respuestas[respuesta]);
        }
    }

    /**
     * Método que crea una puntuación para un cuestionario finalizado.
     * */
    nuevoRanking() {
        if (this.resultados.length > 0) {
            let ranking = getItem('ranking');
            ranking.push({
                respondidas: this.resultados.length,
                aciertos: this.resultados.filter(function(r) { return r.resultado === true }).length
            });
            storeItem('ranking', ranking);
        }
    }
    
    /**
     * Método que muestra en pantalla el cuestionario.
     * */
    mostrar() {
        if (this.cuestionario.hasClass("d-none"))
            this.cuestionario.removeClass("d-none");
        if (this.botonRestart.getControl().hasClass("d-none"))
            this.botonRestart.getControl().removeClass("d-none");
        if (this.botonNext.getControl().hasClass("d-none"))
            this.botonNext.getControl().removeClass("d-none");
        if (this.botonExit.getControl().hasClass("d-none"))
            this.botonExit.getControl().removeClass("d-none");

        // Mostramos el título y la descripción
        this.mostrarTítulo();
        this.mostrarDescripcion();
        
        // Mostramos la barra de progreso
        this.progreso.mostrar();

        // Mostramos la pregunta actual
        this.mostrarPreguntaActual();
    }

    /**
     * Método que muestra en pantalla el título del cuestionario.
     * */
    mostrarTítulo() {
        textSize(24);
        fill(0);
        textAlign(CENTER);
        textStyle(NORMAL);

        text(
            'Questionnaire',
            this.x, // Posición horizontal
            this.y + 10, // Posición vertical
            this.anchura // Anchura máxima
        );
    }

    /**
     * Método que muestra en pantalla la descripción del cuestionario.
     * */
    mostrarDescripcion() {
        textSize(14);
        fill("#848b92");
        textAlign(LEFT);
        textStyle(ITALIC);

        text(
            'Read the question carefully and select the correct answer. '
                + 'Your progress will be marked on this scoreboard as you go.',
            this.x, // Posición horizontal
            this.y + 50, // Posición vertical
            this.anchura // Anchura máxima
        );
    }

    /**
     * Método que muestra en pantalla la pregunta actual.
     * */
    mostrarPreguntaActual() {
        // Pregunta
        textSize(14);
        fill(0);
        textAlign(CENTER);
        textStyle(NORMAL);
        
        text(
            this.indicePreguntaActual + '. ' + this.preguntaActual.question
                .replace(/&quot;/g, '"')
                .replace("&#039;", "'")
                .replace("&eacute;", "é"),
            this.x, // Posición horizontal
            this.y + 170, // Posición vertical
            this.anchura // Anchura máxima
        );
    }
}