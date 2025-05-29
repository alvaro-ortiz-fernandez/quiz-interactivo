/**
 * Clase para encapsular la lógica de un botón.
 * */
class Boton {
    /**
     * Método que inicializa instancias de esta clase.
     * */
    constructor(x, y, texto, sonido, accion) {
        this.x = x;
        this.y = y;
        this.texto = texto;

        this.boton = createButton(texto);
        this.boton.parent("canvas");
        this.boton.position(x, y);
        this.boton.addClass('btn btn-primary');
        this.boton.mousePressed(function() {
            sonido.play();
            accion();
        });
    }

    /**
     * Método que devuelve el control p5.js de este botón.
     * */
    getControl() {
        return this.boton;
    }
}