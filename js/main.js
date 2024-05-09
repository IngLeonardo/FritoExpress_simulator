let carritoLS = JSON.parse(localStorage.getItem("carrito"));
let carrito = carritoLS || [];

const iva = 0.19;
const iup = 0.15;
const figure__imgProducto = document.querySelector(".figure__imgProdSeleccionado");
const tituloRetiro = document.querySelector(".titulo__retiro");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito__productos");
const carritoSubTotal =  document.querySelector("#subTotal");
const carritoTotal =  document.querySelector("#total");
const PRODUCTOS_URL = "../data/productos.json";
const btnCodigo = document.querySelectorAll(".btnCodigo");
const btnPago = document.querySelector(".btnPago");
const valorVueltas = document.querySelector(".valorVueltas");
const btnDinero = document.querySelectorAll(".dinero");
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
        const valorBtnFondos = boton.textContent
        productos.forEach((producto)=>{
          
          if(valorBtnFondos == producto.codigo){

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

                      Toastify({
                        text: "Se agrego al producto al carrito",
                        gravity:"top",
                        // className: "info",
                        style: {
                          background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                      }).showToast();

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
  Toastify({
    text: "Se elimino un producto del carrito",
    gravity:"top",
    // className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
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
    Toastify({
      text: "La cantidad no pueden ser menor a 1",
      gravity:"top",
      // className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  }
  else{
    producto.cantidad--;
    actualizarCarrito();
  }
}
//--- Funcionalidad de actualizar el total ----
const actualizarTotal = () =>{
  
  const subtotal = carrito.reduce((acc, prod)=> acc + (prod.precio * prod.cantidad), 0);

  let ivaProducto =  subtotal * iva;
  let impuestoProducto = subtotal * iup;
  let total = Math.ceil((subtotal + ivaProducto + impuestoProducto)/100)*100;
  carritoTotal.innerText = `$${total}`;
  generarVueltas(total,subtotal);
}
//--- Funcionalidad contabilizar las vueltas ---
function generarVueltas(total,subtotal){
  btnDinero.forEach((item)=>{
    item.addEventListener("click",()=>{
      
      // btnDinero.forEach((removeClass)=>{
      //   removeClass.classList.remove("btnDinero--seleccion");
      // });
      // item.classList.add("btnDinero--seleccion");
        const alertaDePago = document.querySelector(".alertaDePago");
        alertaDePago.innerText = "";  
        const valorBtnFondos = item.value;
        btnPagar(valorBtnFondos, total,subtotal)
    });
  });
} 

//--- Funcionalidad del boton pagar ------
// Una vez se identifique que el valor que tengo que pagar es menor al valor de los fondos que tengo disponible, en ese instante el boton pagar se pone en verde y se habilita para el pago de los productos.
const btnPagar = (valorBtnFondos,total,subtotal) =>{
  
  if(carrito.length === 0){
    btnPago.classList.remove("btnPago--green");
    // btnPago.classList.add("btnPago--none");
    Toastify({
      text: "No tienes productos en tu carrito de compras",
      gravity:"top",
      duration: 3000,
      // className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      }
    }).showToast();
  }
  else if(valorBtnFondos > total){
    btnPago.classList.add("btnPago--green");
    btnPago.classList.remove("btnPago--red");
    btnPago.addEventListener("click",()=>{
      console.log("Fondos :",valorBtnFondos);
      console.log("Total :",total);
      const vueltas = (valorBtnFondos - total);
      console.log("Vueltas :",vueltas);
      valorVueltas.innerText = `$${vueltas}`;

      diseñoFactura(valorBtnFondos,total,subtotal);

      tituloRetiro.innerText = "Clic aquí para retirar";
      btnPago.classList.remove("btnPago--none");

    });

  }
  else if(valorBtnFondos == total){
    btnPago.classList.add("btnPago--green");
    btnPago.classList.remove("btnPago--red");
    btnPago.addEventListener("click",()=>{
      const vueltas = (valorBtnFondos - total);
      valorVueltas.innerText = `$${vueltas}`;
      Toastify({
        text: "Los fondos ingresados son igual al valor de la compra, no hay vueltos",
        gravity:"top",
        // className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();
      tituloRetiro.innerText = "Retire aquí";
      diseñoFactura(valorBtnFondos,total,subtotal);
      Toastify({
        text: "Retire su producto",
        gravity:"bottom",
        // className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
      }).showToast();

      tituloRetiro.innerText = "Clic aquí para retirar";
      btnPago.classList.remove("btnPago--none");
    });
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
// cuando le de clic sobre el texto que dice retire aquí, en ese momento de resetea el
// valor de las vueltas
tituloRetiro.addEventListener("click",()=>{
  const valorVueltas = document.querySelector(".valorVueltas");
        valorVueltas.innerText = "$00";

        Swal.fire({
          title: "Producto retirado, gracias por su compra",
          showConfirmButton: true,
          
          confirmButttonText: "Aceptar",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          }
        }).then((result)=>{
            if(result.isConfirmed){
              carrito.length = 0;
              actualizarCarrito();
              btnPago.classList.remove("btnPago--green");
              tituloRetiro.innerText = "";
              figure__imgProducto.innerHTML = `
              <img src="https://placehold.co/150x200" alt="" class="img__displayTop" />
              `;
              newElementoDescrip.innerHTML = "";
            }
        });
    
});

//--- Diseño de la factura ----
const diseñoFactura = (valorBtnFondos,total,subtotal)=>{
  carrito.forEach((prod)=>{
    Swal.fire({
    
      title: "<h2>Factura de compra</h2>",
      icon: "info",
      imageHeight: 1500,
      imageAlt: "A tall image",
      
      html: `
        <p>Nombre producto :${prod.nombre}</p>
        <p>Presentación :   ${prod.presentacion}</p>
        <p>Cantidad :       ${prod.cantidad}</p>
        <p>Precio Unid :    $${prod.precio}</p>
        <p>IVA :            ${iva}%</p>
        <p>IUP :            ${iup}%</p>
        <hr></hr>
        <h3>Subtotal :       $${subtotal}</h3>
        <h2>Total :       $${total}</h2>
        <h2>Vueltas  :       $${(valorBtnFondos-total)}</h2>
        
        <a href="#">Link</a>,
          Imprimir factura
      `,
      
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
      confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Aceptar!
      `
    
    }).then((resp)=>{
      if(resp.isConfirmed){
        
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: `<h2>Compra exitosa</h2>
                  <p>Retire su producto</p>
                  <p>⬇️</p>`,
          showConfirmButton: false,
          timer: 2500
        });
      }
    })
  })
}


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

//--- Temas aplicados ---
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