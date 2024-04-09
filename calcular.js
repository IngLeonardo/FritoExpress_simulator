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
    impresionDOM();
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

      listaProducto.pop(); // El segundo parámetro 1 indica que solo se eliminará un elemento
      const contenedor = document.getElementById('lista');
      while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild); // Eliminar todos los hijos del contenedor
      }
      impresionDOM();
  
});

//--- IMPRESION DE LOS PRODUCTOS EN EL DOM
let impresionDOM = () =>{
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



