//unifica las funciones de persistencia del carrito en el localStorage (en formato json)

const KEY = "carrito";

export const guardarCarrito = (carrito) => {
    //convertimos a json antes de guardar con stringify
  localStorage.setItem(KEY, JSON.stringify(carrito));
};

export const obtenerCarrito = () => {
    //convertimos a js para obtener los datos con parse, si no hay nada en el localStorage devolvemos un array vacio
    return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const vaciarCarritoStorage = () => {
    localStorage.removeItem(KEY);
}