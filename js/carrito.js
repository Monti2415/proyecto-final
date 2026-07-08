import{ obtenerCarrito } from "./storage.js";
import { eliminarProducto, vaciarCarrito } from "./funcionescarrito.js";
import { actualizarContador } from "./ui.js";


const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    const contenedor = document.getElementById("contenedor-carrito");
    const divAcciones = document.getElementById("acciones-carrito");

    //para resetear el carrito cada vez que se borre un producto
    contenedor.innerHTML = "";
    divAcciones.innerHTML = "";

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "El carrito está vacío 😱";

        contenedor.appendChild(mensaje);
        return;
    }

    carrito.forEach((producto, index) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card");

        const imagen = document.createElement("img");
        imagen.src = `../${producto.imagen}`;
        imagen.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn");
        botonEliminar.classList.add("btn-eliminar-carrito");
        botonEliminar.textContent = "Eliminar producto";

        botonEliminar.addEventListener("click", () => {
            eliminarProducto(index);
            //una vez que se elimina un producto hay que volver a reconstruir el DOM con la info actual del localStorage
            renderizarCarrito();
        });

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(botonEliminar);

        contenedor.appendChild(tarjeta);
    });

    const botonVaciarCarrito = document.createElement("button");
    botonVaciarCarrito.classList.add("btn");
    botonVaciarCarrito.classList.add("btn-vaciar-carrito");
    botonVaciarCarrito.textContent = "Vaciar carrito";

    botonVaciarCarrito.addEventListener("click", () => {
        vaciarCarrito();
        renderizarCarrito();
    });

    divAcciones.appendChild(botonVaciarCarrito);

};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});