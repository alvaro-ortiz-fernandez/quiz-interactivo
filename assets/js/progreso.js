/**
 * Clase para gestionar el progreso de un cuestionario.
 * */
class ProgressBar {
    /**
     * Método que inicializa instancias de esta clase.
     * */
    constructor(x, y, anchura, altura, imgUsuario) {
        this.x = x;
        this.y = y;
        this.anchura = anchura;
        this.altura = altura;
        this.imgUsuario = imgUsuario;

        this.resultados = [];
    }

    /**
     * Método que actualiza los resultados de esta barra de progreso.
     * */
    actualizar(resultados) {
        this.resultados = resultados;
    }

    /**
     * Método que muestra en pantalla esta barra de progreso.
     * */
    mostrar() {
        let base = Array.from({ length: 10 }, (_, i) => ({ orden: i + 1 }));
        for (let b in base)
            this.mostrarPregunta(base[b]);
        
        for (let resultado in this.resultados)
            this.mostrarPregunta(this.resultados[resultado]);

        this.mostrarImagen();
    }

    /**
     * Método que muestra en pantalla el progreso para la pregunta indicada.
     * */
    mostrarPregunta(pregunta) {
        strokeWeight(0);
        fill(this.getColor(pregunta));

        let anchura = (this.anchura / 10);

        rect(
            this.x + (anchura * (pregunta.orden - 1)), // Posición horizontal
            this.y, // Posición vertical
            anchura, // Anchura
            8, // Altura
            (pregunta.orden === 1)  ? 4 : 0, // Radio del borde superior izquierdo
            (pregunta.orden === 10) ? 4 : 0, // Radio del borde superior derecho
            (pregunta.orden === 10) ? 4 : 0, // Radio del borde inferior derecho
            (pregunta.orden === 1)  ? 4 : 0  // Radio del borde inferior izquierdo
        );
    }

    /**
     * Método que muestra en pantalla el icono del usuario sobre la pregunta actual
     * */
    mostrarImagen() {
        let anchura = (this.anchura / 10);

        image(
            this.imgUsuario,
            (anchura * this.resultados.length) + 20, // Posición horizontal
            105, // Posición vertical
            20, // Anchura
            20  // Altura
        );
    }
    
    /**
     * Método que indica el color para el progreso de una pregunta.
     * */
    getColor(pregunta) {
        return (pregunta.resultado === true)
            ? "#0d6efd"
            : (pregunta.resultado === false)
                ? "#dc3545"
                : "#e9ecef";
    }
}