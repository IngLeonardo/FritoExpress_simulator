let carritoLS = JSON.parse(localStorage.getItem("carrito"));
let carrito = carritoLS || [];

const tituloRetiro = document.querySelector(".titulo__retiro");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito__productos");
const carritoTotal =  document.querySelector("#total");
const PRODUCTOS_URL = "../data/productos.json";
const btnCodigo = document.querySelectorAll(".btnCodigo");
const newElementoDescrip = document.createElement("div");
      newElementoDescrip.id= "detalle__producto";
      newElementoDescrip.className = "detalle__producto";
      newElementoDescrip.innerHTML = "";


fetch(PRODUCTOS_URL)
  .then((respuesta) => respuesta.json())
  .then((data) => {
    productosEnVitrina(data);
    const productos = data;
  
  
    btnCodigo.forEach((boton)=>{
      // boton.addEventListener("click",()=>{
      const eventBtn = ()=>{
        const valorBtn = boton.textContent
        productos.forEach((producto)=>{
          
          if(valorBtn == producto.codigo){

            //--- Renderiza el producto segun el numero de producto seleccionado
            const imgDisplayTop = document.querySelector(".img__displayTop");
                  imgDisplayTop.src = producto.img;

            //--- Renderiza el detallado del producto que sea seleccionado por el cliente
                  newElementoDescrip.innerHTML = `
                  <label for="" id="codigo">cod: ${producto.codigo}</label>
                  <label for="" id="nombre">Prod : ${producto.nombre}</label>
                  <label for="" id="presentacion">Pres : ${producto.presentacion}</label>
                  <label for="" id="precio">Prec : $${producto.precio}</label> 
                  `;
            document.querySelector(".descripcion__producto").appendChild(newElementoDescrip)
            //--- Funcionalidad del boton para agregar productos al carrito
            const btnAgregar = document.querySelector("#agregar");
                  //btnAgregar.addEventListener("click",()=>{
                  const btnAgregarCarrito = () =>{
                      carrito.push({...producto , cantidad: 1});
                      actualizarCarrito();
                      
                    btnAgregar.removeEventListener('click', btnAgregarCarrito);
                  }

            btnAgregar.addEventListener('click', btnAgregarCarrito);
          }
        }); //fin de forEach productos
        
        boton.removeEventListener('click', eventBtn);
      }//fin del evento del boton

      boton.addEventListener('click', eventBtn);
    })//fin forEach del boton    
      
  }) //fin del fetch
  
//--- Funcionalidad actualizar el carrito ----
function actualizarCarrito(){
  if(carrito.length === 0){  
    carritoVacio.classList.remove("vista-none");
    carritoProductos.classList.add("vista-none");
  }
  else{
    carritoVacio.classList.add("vista-none");
    carritoProductos.classList.remove("vista-none");
    carritoProductos.innerHTML = "";
    carrito.forEach((producto)=>{
      const div = document.createElement("div");
      div.classList.add("carrito__producto");
      div.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <p>Cant : ${producto.cantidad}</p>
        <p>Subt : $${producto.precio * producto.cantidad}</p>  
        `;

        const btnSumar = document.createElement("button");
        btnSumar.classList.add("btnCarritoSuma");
        btnSumar.innerText = "+";
        btnSumar.addEventListener("click",()=>{
          sumarAlCarrito(producto); 
        });
        
        const btnRestar = document.createElement("button");
        btnRestar.classList.add("btnCarritoResta");
        btnRestar.innerText = "-";
        btnRestar.addEventListener("click",()=>{
          restarDelCarrito(producto); 
        });
      
        const btnAnular = document.createElement("button");
        btnAnular.classList.add("btnCarritoCancel");
        btnAnular.innerText = "X";
        btnAnular.addEventListener("click",()=>{
        borrarDelCarrito(producto); 
        });
      
      div.append(btnSumar);
      div.append(btnRestar);
      div.append(btnAnular);
      carritoProductos.append(div);
    });
  }
  actualizarTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//--- Funcionalidad borrar del carrito -----
const borrarDelCarrito = (producto) =>{
  const IndexProducto = carrito.findIndex((item) => item.nombre === producto.nombre );
  carrito.splice(IndexProducto,1);
  actualizarCarrito();
}

//--- Funcionalidad sumar al carrito -------
const sumarAlCarrito = (producto) =>{
  producto.cantidad++;
  actualizarCarrito();
}

//--- Funcionalidad restar del carrito -------
const restarDelCarrito = (producto) =>{
  if(producto.cantidad == 1){
    const btnRestarCarrito = document.querySelector(".btnCarritoResta");
      btnRestarCarrito.addEventListener("click",()=>{
        btnRestarCarrito.removeEventListener();
      });
  }
  else{
    producto.cantidad--;
    actualizarCarrito();
  }
}

//--- Funcionalidad de actualizar el total ----
const actualizarTotal = () =>{
  const total = carrito.reduce((acc, prod)=> acc + (prod.precio * prod.cantidad), 0);
  carritoTotal.innerText = `$${total}`;
  generarVueltas(total);
}
//--- Funcionalidad contabilizar las vueltas ---

function generarVueltas(total){
  const btnDinero = document.querySelectorAll(".dinero");
  btnDinero.forEach((item)=>{
    item.addEventListener("click",()=>{
        const alertaDePago = document.querySelector(".alertaDePago");
        alertaDePago.innerText = "";  
        const valorBtn = item.value;
        btnPagar(valorBtn, total)
    });
  });
} 

//--- Funcionalidad del boton pagar ------
// Una vez se identifique que el valor que tengo que pagar es menor al valor de los fondos que tengo disponible, en ese instante el boton pagar se pone en verde y habilitandome para el pago de los productos.
const btnPagar = (valorBtn, total) =>{
  const btnPago = document.querySelector(".btnPago");
  const valorVueltas = document.querySelector(".valorVueltas");
  
  if(valorBtn >= total){
    btnPago.classList.add("btnPago--green");
    btnPago.classList.remove("btnPago--red");
    btnPago.addEventListener("click",()=>{
      const vueltas = (valorBtn - total);
      valorVueltas.innerText = `$${vueltas}`;
      tituloRetiro.innerText = "Retire aquí";
      btnPago.classList.remove("btnPago--none");
    });
    resetVueltas();
  }
  else{
    btnPago.classList.remove("btnPago--green");
    btnPago.classList.add("btnPago--red");
    const alertaDePago = document.querySelector(".alertaDePago");
    alertaDePago.innerText = "⚠️ Fondos insuficientes, agrega fondos a la tarjeta ⚠️"
    btnPago.classList.add("btnPago--none");
    valorVueltas.innerText = "$0";
  }
} 

//--- Funcionalidad retiro producto -----
// cuando le de click sobre el texto que dice retire aquí, en ese momento de resetea el
// valor de las vueltas
tituloRetiro.addEventListener("click",()=>{
  const valorVueltas = document.querySelector(".valorVueltas");
        valorVueltas.innerText = "$00";
});

//--- Funcionalidad que imprime los productos en la vitrina. ----
const productosEnVitrina = (data) =>{
  data.forEach((producto) => {
    
    const newElemento = document.createElement('div');
    newElemento.id ="casilla__producto";
    newElemento.innerHTML = `
    <label class="cod__producto">${producto.codigo}</label>  
    <img src="${producto.img}" alt="Imagen del producto" class="imgProducto">
    `;
    document.querySelector('#vitrinaProductos').appendChild(newElemento);
  });
}

actualizarCarrito();







// Debo verme las clases de operadores avanzados II 
// y la clase de after3 para saber implementar lo visto

// condicionales
// ciclos
// funciones
// objetos
// arrays
// métodos de arrays
// dom + eventos
// storage
// operadores avanzados
// librería/s
// fetch