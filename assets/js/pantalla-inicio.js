/**
 * Clase para gestionar la pantalla de inicio, con el ranking de puntuaciones.
 * */
class PantallaInicio {
    /**
     * Método que inicializa instancias de esta clase.
     * */
    constructor(x, y, anchura, altura, navegacion, sonidoBoton) {
        this.x = x;
        this.y = y;
        this.anchura = anchura;
        this.altura = altura;
        this.navegacion = navegacion;

        let _this = this;
        this.botonStart = new Boton(x + 270, y + 450, "Start", sonidoBoton, function() {
            _this.mostrarPantallaCuestionario();
        });
        this.botonClear = new Boton(x + 340, y + 450, "Clear", sonidoBoton, function() {
            clearStorage();
            storeItem('ranking', []);
        });
    }

    /**
     * Método que cambia a la pantalla de cuestionario.
     * */
    mostrarPantallaCuestionario() {
        this.navegacion.inicio = false;
        this.navegacion.cuestionario = true;
        this.botonStart.getControl().addClass("d-none");
        this.botonClear.getControl().addClass("d-none");
    }

    /**
     * Método que muestra en pantalla el ranking de puntuaciones.
     * */
    mostrar() {
        if (this.botonStart.getControl().hasClass("d-none"))
            this.botonStart.getControl().removeClass("d-none");
        if (this.botonClear.getControl().hasClass("d-none"))
            this.botonClear.getControl().removeClass("d-none");

        // Mostramos el título y la descripción
        this.mostrarTítulo();
        this.mostrarDescripcion();

        // Mostramos el historial de puntuaciones
        this.mostrarRanking();
    }

    /**
     * Método que muestra en pantalla el título del ranking de puntuaciones.
     * */
    mostrarTítulo() {
        textSize(24);
        fill(0);
        textAlign(CENTER);
        textStyle(NORMAL);

        text(
            'Welcome to the Interactive Quiz',
            this.x, // Posición horizontal
            this.y + 10, // Posición vertical
            this.anchura // Anchura máxima
        );
    }

    /**
     * Método que muestra en pantalla la descripción del ranking de puntuaciones.
     * */
    mostrarDescripcion() {
        textSize(14);
        fill("#848b92");
        textAlign(LEFT);
        textStyle(ITALIC);

        text(
            'Welcome to the challenge! Check out the leaderboard and aim for the top spot. '
                + 'Show off your full knowledge and improve your score with each attempt.',
            this.x, // Posición horizontal
            this.y + 50, // Posición vertical
            this.anchura // Anchura máxima
        );
    }

    /**
     * Método que muestra en pantalla el historial de puntuaciones.
     * */
    mostrarRanking() {
        // Título del ranking
        textSize(18);
        fill(0);
        textAlign(CENTER);
        textStyle(NORMAL);

        text(
            'Score history',
            this.x, // Posición horizontal
            this.y + 110, // Posición vertical
            this.anchura // Anchura máxima
        );

        // Tabla del ranking
        const encabezados = ['#', 'Answered questions', '% correct answers'];
        const filaAltura = 35;
        const tablaX = this.x + 175;
        const tablaY = this.y + 160;
        const colAnchos = [120, 150, 120];

        // Cabecera de la tabla
        textSize(12);
        textStyle(BOLD);
        fill(30);
        textAlign(CENTER);
        let colX = tablaX;
        for (let i = 0; i < encabezados.length; i++) {
            text(encabezados[i], colX, tablaY);
            colX += colAnchos[i];
        }

        strokeWeight(1);
        line(tablaX - 8, tablaY + 12, tablaX + 328, tablaY + 12);

        // Cuerpo de la tabla
        textStyle(NORMAL);
        textSize(12);
        let filaY = tablaY + filaAltura;

        let historial = getItem('ranking')
            .sort(function(a, b) {
                return (b.aciertos / b.respondidas) - (a.aciertos / a.respondidas)
            })
            .slice(0, 6);

        for (let i = 0; i < historial.length; i++) {
            let item = historial[i];
            let porcentaje = item.respondidas > 0
                ? Math.round((item.aciertos / item.respondidas) * 100)
                : 0;

            let colX = tablaX;
            text(i + 1, colX, filaY); colX += colAnchos[0];
            text(item.respondidas, colX, filaY); colX += colAnchos[1];
            text(porcentaje + '%', colX, filaY);
            
            strokeWeight(0.2);
            line(tablaX - 8, filaY + 12, tablaX + 328, filaY + 12);

            filaY += filaAltura;
        }
    }
}