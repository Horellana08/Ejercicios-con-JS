let productos = [];
let contadorId = 1;

const txtNombre = document.getElementById("txtNombre");
const txtCantidad = document.getElementById("txtCantidad");
const txtPrecio = document.getElementById("txtPrecio");
const filasContent = document.getElementById("filas-content");
const filasTemplate = document.getElementById("filas-template");
const detallesContent = document.getElementById("detalles-content");
const productId = document.getElementById("productId");

function prepareAddProduct() {
    // Prepara el modal para agregar un producto nuevo
    document.getElementById("productModalLabel").innerText = "Nuevo producto";
    clearInputs();
}

function prepareEditProduct(button) {
    const id = parseInt(button.getAttribute("data-id"));
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        productId.value = producto.id;
        txtNombre.value = producto.nombre;
        txtCantidad.value = producto.cantidad;
        txtPrecio.value = producto.precio;
        document.getElementById("productModalLabel").innerText = "Editar producto";
        new bootstrap.Modal(document.getElementById('productModal')).show();
    }
}

function saveProduct() {
    const id = parseInt(productId.value);
    const nombre = txtNombre.value.trim();
    const cantidad = parseInt(txtCantidad.value.trim());
    const precio = parseFloat(txtPrecio.value.trim());

    if (nombre && !isNaN(cantidad) && !isNaN(precio)) {
        if (id) {
            // Editar producto existente
            const producto = productos.find(prod => prod.id === id);
            producto.nombre = nombre;
            producto.cantidad = cantidad;
            producto.precio = precio;
        } else {
            // Agregar producto nuevo
            const nuevoProducto = {
                id: contadorId++,
                nombre,
                cantidad,
                precio
            };
            productos.push(nuevoProducto);
        }
        mostrarProductos();
        mostrarDetalles();
        clearInputs();
    } else {
        alert("Por favor, complete todos los campos correctamente.");
    }
}

function mostrarProductos() {
    filasContent.innerHTML = "";
    productos.forEach(producto => {
        const fila = filasTemplate.content.cloneNode(true);
        fila.querySelector(".id").textContent = producto.id;
        fila.querySelector(".name").textContent = producto.nombre;
        fila.querySelector(".stock").textContent = producto.cantidad;
        fila.querySelector(".price").textContent = `$${producto.precio.toFixed(2)}`;
        fila.querySelector(".btn-edit").setAttribute("data-id", producto.id);
        fila.querySelector(".btn-remover").setAttribute("data-id", producto.id);
        filasContent.appendChild(fila);
    });
}

function mostrarDetalles() {
    let total = productos.reduce((sum, prod) => sum + (prod.cantidad * prod.precio), 0);
    detallesContent.querySelector("td:last-child").textContent = `$${total.toFixed(2)}`;
}

function removeProduct(button) {
    const id = parseInt(button.getAttribute("data-id"));
    productos = productos.filter(prod => prod.id !== id);
    mostrarProductos();
    mostrarDetalles();
}

function clearInputs() {
    txtNombre.value = '';
    txtCantidad.value = '';
    txtPrecio.value = '';
    productId.value = '';
}
