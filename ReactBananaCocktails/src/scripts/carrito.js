

function iniciarCarrito() {

  //Variable que mantiene el estado visible del carrito
  var carritoVisible = false;

  //Espermos que todos los elementos de la pàgina cargen para ejecutar el script
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
    ready();
  }

  function ready() {
    console.log("ready");
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
      var button = botonesEliminarItem[i];
      button.addEventListener('click', eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
      var button = botonesSumarCantidad[i];
      button.addEventListener('click', sumarCantidad);
    }

    //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
      var button = botonesRestarCantidad[i];
      button.addEventListener('click', restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
      console.log("botonesAgregarAlCarrito");
      var button = botonesAgregarAlCarrito[i];
      button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    var botonComprar = document.getElementsByClassName('btn-pagar')[0];
    if (botonComprar) {
      botonComprar.addEventListener('click', pagarClicked);
    }
  }


  function pagarClicked() {
    // Recuperamos la información del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    var productos = [];

    // Recorremos cada elemento del carrito para obtener la información de los productos
    while (carritoItems.hasChildNodes()) {
      var item = carritoItems.firstChild;

      // Verificamos si el primer nodo es un elemento (y no un nodo de texto u otro tipo)
      if (item.nodeType === 1) {
        var titulo = item.querySelector('.carrito-item-titulo').innerText;
        var precio = item.querySelector('.carrito-item-precio').innerText;
        var imagenSrc = item.querySelector('img').src;
        var cantidad = item.querySelector('.carrito-item-cantidad').value;

        // Calculamos el total individual del producto
        var totalIndividual = parseFloat(precio.replace('$', '').replace(',', '')) * parseInt(cantidad);

        // Creamos un objeto producto con la información del item
        var producto = {
          nombre: titulo,
          precio: precio,
          cantidad: cantidad,
          totalIndividual: totalIndividual.toFixed(2), // Redondeamos a dos decimales
          imagen: imagenSrc
        };

        // Agregamos el producto al array de productos
        productos.push(producto);

        // Eliminamos el item del carrito
        carritoItems.removeChild(item);
      } else {
        // Si no es un elemento, simplemente lo eliminamos sin procesar
        carritoItems.removeChild(item);
      }
    }

    // Actualizamos el total del carrito y lo ocultamos
    actualizarTotalCarrito();
    ocultarCarrito();

    // Redirigimos a la página de factura.php y pasamos la información de los productos
    window.location.href = './Formularios/factura.php?productos=' + encodeURIComponent(JSON.stringify(productos));
  }

  //MODIFICADA
  function agregarAlCarritoClicked(event) {
    console.log("agregarAlCarritoClicked");
    event.preventDefault();
    var button = event.target;
    var item = button.closest('.item'); // Busca el elemento padre con la clase 'item'

    // Obtener datos de la tarjeta
    var titulo = item.querySelector('.titulo-item').innerText;
    var precio = item.querySelector('.precio-item').innerText;
    var imagenSrc = item.querySelector('.img-item').src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
  }


  //Funcion que hace visible el carrito
  function hacerVisibleCarrito() {
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    // Encuentra el contenedor de la sección actual
    var seccionActual = document.querySelector('.wrap.vodka');

    if (seccionActual) {
      seccionActual.style.width = '60%';
    }
  }

  sessionStorage.setItem('itemRepetido', 'true');

const itemRepetido = sessionStorage.getItem('itemRepetido');

  //Funciòn que agrega un item al carrito
  function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];


    sessionStorage.setItem('itemRepetido', 'true');

    
    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    var itemRepetidoCount = sessionStorage.getItem('itemRepetido');
    for (var i = 0; i < nombresItemsCarrito.length; i++) {
      if (nombresItemsCarrito[i].innerText === titulo) {
        itemRepetidoCount++;
        sessionStorage.setItem('itemRepetido', itemRepetidoCount);
        alert("El item ya se encuentra en el carrito");
        return;
      }
      if (itemRepetidoCount > 1) {
        alert("El item ya se encuentra en el carrito");
        return;
      }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click', restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click', sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
    //Mostramos el procuto por consola
    console.log("Producto Agregado al Carrito:", titulo, precio, imagenSrc);
  }

  //Aumento en uno la cantidad del elemento seleccionado
  function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
  }
  //Resto en uno la cantidad del elemento seleccionado
  function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if (cantidadActual >= 1) {
      selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
      actualizarTotalCarrito();
    }
  }

  //Elimino el item seleccionado del carrito
  function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
  }
  //Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
  function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount === 0) {
      var carrito = document.getElementsByClassName('carrito')[0];
      carrito.style.marginRight = '-100%';
      carrito.style.opacity = '0';
      carritoVisible = false;

      var items = document.getElementsByClassName('wrap')[0];
      items.style.width = '100%';
    }
  }
  //Actualizamos el total de Carrito
  function actualizarTotalCarrito() {
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
      var item = carritoItems[i];
      var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
      //quitamos el simobolo peso y el punto de milesimos.
      var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
      var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
      console.log(precio);
      var cantidad = cantidadItem.value;
      total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

  }

}

export default iniciarCarrito;
