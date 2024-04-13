//------- VARIABLES GENERALES
const btnSeleccion = document.querySelector(`#btnSeleccion`);
let producto = 0;
let cantidadProducto = 0;
let valorProducto = 0;
const iva = 0.19;
const iup = 0.15;
const listaProducto =[];


//FUNCION PARA REGISTRAR LOS PRODUCTOS
function regProducto(){
  let codigo = 0;
  let nombreProducto;
  let presentacion;
  let precio;
  // Este do while lo uso para tomar los datos del usuario a traves de los promt
  do {
    
    nombreProducto = prompt('ingrese el nombre del producto. Para terminar escriba (salir)').toLowerCase().trim();
    if (nombreProducto !== "salir") {
      codigo = parseInt(prompt('ingrese el codigo del producto.'));
      presentacion = prompt('ingrese la presentacion del producto.').toLowerCase().trim();
      precio = parseInt(prompt('ingrese el precio del producto.'));
    }else{
      break
    }
    
    let registroProducto = {
      codigo,
      nombreProducto,
      presentacion,
      precio
    }
    //lugar donde realizo el push para empujar el objeto hacia el arreglo
    listaProducto.push(registroProducto);
    impresionDOMRegistro();
  } while (nombreProducto !== "salir");
  //--------------------------------------

}

//----- EVENTO DEL BOTON REGISTRAR PRODUCTOS ----
const BtnregistroProducto = document.querySelector('#BtnregistroProducto'); 
//Esta es la declaración del array al cual estoy haciendo el push
BtnregistroProducto.addEventListener('click',()=>{
  regProducto();
});



//----- EVENTO DEL BOTON ELIMINAR PRODUCTO -----
const BtnEliminaProducto = document.querySelector('#BtnEliminaProducto');
BtnEliminaProducto.addEventListener("click", ()=>{

  listaProducto.pop();//eliminar uno a uno los productos

  let listaDOM = document.getElementById("lista");
  listaDOM.innerHTML = '';
  impresionDOMEliminar();
});


//--- IMPRESION DE LOS PRODUCTOS EN EL DOM, DESPUES DE ELIMINAR ALGUNO
let impresionDOMEliminar = () =>{
  listaProducto.forEach((item) =>{
    const newElement = document.createElement('article');
    newElement.innerHTML = ` 
      <p><b>Codigo: </b><label>${item.codigo}</label></p>
      <p><b>Producto: </b><label>${item.nombreProducto}</label></p>
      <p><b>Presentación: </b><label>${item.presentacion}</label></p>
      <p><b>Precio: </b><label>$ ${item.precio}</label></p>
      <br> `
    document.querySelector('#lista').appendChild(newElement);
  })
}

//--- IMPRESION DE LOS PRODUCTOS EN EL DOM -----
let impresionDOMRegistro = () =>{
  const newElement = document.createElement('article');
  listaProducto.forEach((item) =>{
    
    newElement.innerHTML = ` 
      <p><b>Codigo: </b><label>${item.codigo}</label></p>
      <p><b>Producto: </b><label>${item.nombreProducto}</label></p>
      <p><b>Presentación: </b><label>${item.presentacion}</label></p>
      <p><b>Precio: </b><label>$ ${item.precio}</label></p>
      <br> `
    document.querySelector('#lista').appendChild(newElement);
  })

};


//--- FUNCIONALIDAD PRECIOS BAJOS ----------------
  const btnProductosDescuento = document.querySelector('#btnProductosDescuento');
  btnProductosDescuento.addEventListener("click", ()=>{

    let preciosBajos = document.querySelector('#preciosBajos');
    preciosBajos.innerHTML = '';
    const productosRebaja = listaProducto.filter((ele) => ele.precio <= 5000);  

    if(productosRebaja.length == 0){
      let newArticle = document.createElement('article');
        newArticle.innerHTML = `
        <p><span>No se encontraron productos en descuento..!<span></p>
        <hr>`;
        document.querySelector('#preciosBajos').appendChild(newArticle);
    }
    else{
      productosRebaja.forEach((ele) => {
        let newArticle = document.createElement('article');
        newArticle.innerHTML = `
        <p><span>Producto en descuento : ${ele.nombreProducto}<span></p>
        <hr>`;
        document.querySelector('#preciosBajos').appendChild(newArticle);
      });

    }

  });

//--- FUNCIONALIDAD DEL BUSCADOR DE PRODUCTOS ----
let BtnBuscar = document.querySelector('#BtnBuscar');

BtnBuscar.addEventListener("click", ()=>{
  const inputBusqueda = document.querySelector('#inputBusqueda');
  const listaBusqueda = document.querySelector('#listaBusqueda');
  let valorInput = inputBusqueda.value.toLowerCase();
  listaBusqueda.innerHTML = '';

  if (valorInput !== "" && valorInput !== null) {

    const productoBuscado = listaProducto.filter((ele) => ele.nombreProducto.includes(valorInput));
    
    const newArticle = document.createElement('article');
    productoBuscado.forEach((item)=>{
      newArticle.innerHTML = ` 
      <h2>producto encontrado :</h2>
      <p><b>Codigo: </b><label>${item.codigo}</label></p>
      <p><b>Producto: </b><label>${item.nombreProducto}</label></p>
      <p><b>Presentación: </b><label>${item.presentacion}</label></p>
      <p><b>Precio: </b><label>$ ${item.precio}</label></p>
      <br> `
    document.querySelector('#listaBusqueda').appendChild(newArticle);
    });
} else {
    alert("El campo esta vacio, ingrese el producto valido a buscar");
}

});

//--- FUNCION PARA CALCULAR EL COBRO E IMPRESION FACTURA
function imprimirFactura(valorProducto){
  
  let subTotal =((valorProducto * cantidadProducto));
  let ivaProducto =  subTotal * iva;
  let impuestoProducto = subTotal * iup;
  let total = subTotal + ivaProducto + impuestoProducto;
  

    console.log(`
    Producto seleccionado: ${listaProducto[producto-1].nombreProducto}
    Cantidad producto solicitado: ${cantidadProducto}
    Valor producto Und: $${valorProducto}
    Subtotal: ${subTotal}
    Valor IVA(${iva * 100})%: ${ivaProducto}
    Valor IUP(${iup * 100})%: ${impuestoProducto}
    Total: ${total}`);

  
}

// --- FUNCION PARA SOLICITAR DATOS AL USUARIO DEL PRODUCTO QUE DESEA CONSUMIR E INDICAR EL VALOR A PAGAR
btnSeleccion.addEventListener("click", () =>{
  
  do {
    producto = parseInt(prompt(`ingrese el codigo del producto`));//1
    cantidadProducto = parseInt(prompt(`ingrese la cantidad de producto`));//2
    if(isNaN(producto)){
      alert('El numero ingresado no corresponde a los codigos de producto disponibles');
    }
  } while (isNaN(producto));

  
  if(producto == listaProducto[producto-1].codigo){
    valorProducto = listaProducto[producto-1].precio;
    imprimirFactura(valorProducto);
  }

});

// --- FUNCION PARA BORRAR CONSOLA -----
const btnClear = document.querySelector(`#btnClear`);
btnClear.addEventListener("click", () =>{

  console.clear();
});



