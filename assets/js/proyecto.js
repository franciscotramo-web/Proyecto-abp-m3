const productos = [];

moment.locale("es");

// Genera un UUID para cada producto.
function crearUUID() {
    return uuidv4();
}

// Devuelve la fecha actual en formato DD/MM/YYYY.
function obtenerFecha() {
    return moment().format("DD/MM/YYYY");
}

// Solicita texto al usuario y valida que no sea vacío ni nulo.
function solicitarTexto(mensaje) {
    while (true) {
        const texto = prompt(mensaje);

        if (texto === null) {
            alert("Entrada cancelada. Debes ingresar un texto válido.");
            continue;
        }

        const valor = texto.trim();
        if (valor === "") {
            alert("No puede quedar el campo vacío. Intenta nuevamente.");
            continue;
        }

        return valor;
    }
}

class Producto {
    constructor(codigo, nombre, categoria, cantidad, precioUnitario) {
        this.id = crearUUID();
        this.codigo = codigo;
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.fechaIngreso = obtenerFecha();
    }

    total() {
        return this.precioUnitario * this.cantidad;
    }

    guardar() {
        productos.push(this);
    }
}

function inventario(listaProductos = []) {
    console.log(`Total productos registrados (${listaProductos.length}):`);

    if (listaProductos.length === 0) {
        console.log("NO HAY PRODUCTOS REGISTRADOS.");
        return;
    }

    console.log("_".repeat(50));

    for (const producto of listaProductos) {
        const {
            codigo,
            nombre,
            categoria,
            cantidad,
            precioUnitario,
            fechaIngreso,
        } = producto;

        console.log("Código:", codigo);
        console.log("Nombre:", nombre);
        console.log("Categoría:", categoria);
        console.log("Cantidad:", cantidad);
        console.log("Precio Unitario:", precioUnitario);
        console.log("Total:", producto.total());
        console.log("Fecha registro:", fechaIngreso);
        console.log("\n");
        console.log("*".repeat(50));
        console.log("\n");
    }
}

function validarCantidad() {
    while (true) {
        const entrada = prompt("Ingrese la cantidad de productos (mayor a 0):");

        if (entrada === null) {
            alert("Debe ingresar una cantidad válida.");
            continue;
        }

        const cantidad = Number(entrada);
        if (isNaN(cantidad)) {
            alert("Valor no válido. Ingrese un número para la cantidad.");
        } else if (cantidad <= 0) {
            alert("La cantidad debe ser mayor a 0. Vuelva a intentarlo.");
        } else {
            return cantidad;
        }
    }
}

function validarPrecio() {
    while (true) {
        const entrada = prompt("Ingrese el precio del producto (mayor o igual a 0):");

        if (entrada === null) {
            alert("Debe ingresar un precio válido.");
            continue;
        }

        const precio = Number(entrada);
        if (isNaN(precio)) {
            alert("Valor no válido. Ingrese un número para el precio.");
        } else if (precio < 0) {
            alert("El precio no puede ser negativo. Vuelva a intentarlo.");
        } else {
            return precio;
        }
    }
}

function validarCategoria() {
    const categoriasValidas = {
        frutas: "Frutas",
        verduras: "Verduras",
        carnes: "Carnes",
        lacteos: "Lacteos",
    };

    while (true) {
        const mensaje =
            "Ingrese la categoría del producto:\n" +
            "Categorias disponibles: Frutas, Verduras, Carnes, Lacteos.";

        const categoria = prompt(mensaje);
        if (categoria === null) {
            alert("Debe seleccionar una categoría válida.");
            continue;
        }

        const clave = categoria.toLowerCase().trim();
        if (categoriasValidas[clave]) {
            return categoriasValidas[clave];
        }

        alert("Ha ingresado una opción no válida, vuelva a intentar.");
    }
}

function agregarProducto() {
    const codigo = solicitarTexto("Ingrese el código del producto, ejemplo [1111]:");
    const nombre = solicitarTexto("Ingrese el nombre del producto:");
    const categoria = validarCategoria();
    const cantidad = validarCantidad();
    const precioUnitario = validarPrecio();

    const nuevoProducto = new Producto(
        codigo,
        nombre,
        categoria,
        cantidad,
        precioUnitario,
    );

    nuevoProducto.guardar();
    alert("Producto registrado correctamente con el id: " + nuevoProducto.id);
}

function buscarPorCategoria() {
    const mensaje =
        "Ingrese el número correspondiente a la categoría que desea ver:\n" +
        "1. Frutas.\n" +
        "2. Verduras.\n" +
        "3. Carnes.\n" +
        "4. Lacteos.\n";

    const objOpciones = {
        1: "Frutas",
        2: "Verduras",
        3: "Carnes",
        4: "Lacteos",
    };

    while (true) {
        const opcion = prompt(mensaje);
        if (opcion === null) {
            alert("Búsqueda cancelada.");
            return;
        }

        const categoria = objOpciones[opcion];
        if (categoria) {
            const listaFiltrada = productos.filter((p) => p.categoria === categoria);
            console.log("Filtrando productos por categoría: " + categoria);
            inventario(listaFiltrada);
            return;
        }

        alert("Ha seleccionado una opción inválida, vuelva a intentar.");
    }
}

function calcularValorInventario() {
    if (productos.length === 0) {
        console.log("No hay productos registrados para calcular el valor total.");
        alert("No hay productos registrados para calcular el valor total.");
        return;
    }

    const totalInventario = productos.reduce((acumulado, producto) => {
        return acumulado + producto.total();
    }, 0);

    console.log("Valor total del inventario:", totalInventario);
    alert("Valor total del inventario: " + totalInventario);
}

function menu() {
    const mensaje =
        "Ingrese la operación:\n" +
        "1. Agregar un nuevo producto.\n" +
        "2. Ver inventario.\n" +
        "3. Buscar por categoría.\n" +
        "4. Calcular valor total del inventario.\n" +
        "\nPresiona cualquier tecla para salir del menú.";

    const opcion = prompt(mensaje);
    switch (opcion) {
        case "1":
            agregarProducto();
            break;
        case "2":
            inventario(productos);
            break;
        case "3":
            buscarPorCategoria();
            break;
        case "4":
            calcularValorInventario();
            break;
        default:
            alert("Saliendo del menú...");
            break;
    }
}

function main() {
    menu();
}

// EVENTOS DE BOTONES
const btnIniciar = document.getElementById("btnIniciar");
const btnVerInventario = document.getElementById("btnVerInventario");
const btnLimpiarConsola = document.getElementById("btnLimpiarConsola");

if (btnIniciar) {
    btnIniciar.addEventListener("click", main);
}

if (btnVerInventario) {
    btnVerInventario.addEventListener("click", () => {
        inventario(productos);
    });
}

if (btnLimpiarConsola) {
    btnLimpiarConsola.addEventListener("click", () => {
        console.clear();
    });
}
