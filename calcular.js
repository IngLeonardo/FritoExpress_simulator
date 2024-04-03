//----- ARRAY DE PRODUCTOS ----
const BtnregistroProducto = document.querySelector('#BtnregistroProducto'); 
//Esta es la declaración del array al cual estoy haciendo el push
const listaProducto =[];

BtnregistroProducto.addEventListener('click',()=>{
  let codigo = 0;
  let nombreProducto;
  let presentacion;
  let precio;
  
  //Este do while lo uso para tomar los datos del usuario a traves de los promt
  do {
    codigo++
    nombreProducto = prompt('ingrese el nombre del producto. Para terminar escriba (salir)').toLowerCase().trim();
    if (nombreProducto != 'salir') {
      presentacion = prompt('ingrese la presentacion del producto.').toLowerCase().trim();
      precio = prompt('ingrese el precio del producto.').toLowerCase().trim();
    }else{
      break;
    }    
    // el objeto donde almaceno los datos de los promt  
    let registroProducto = {
      codigo,
      nombreProducto, 
      presentacion,
      precio
    }
    //lugar donde realizo el push para empujar el objeto hacia el arreglo
    listaProducto.push(registroProducto);
    
    //Una impresion de prueba para saber si el arreglo tiene el objeto
    console.log('******');
    console.log(listaProducto);
    console.log('******');
    //Uso este return que tengo entendido que asi puedo usar este arreglo por fuera de este bloque de codigo.
    return listaProducto;
  } while (nombreProducto != 'salir');
  
});

//Intento manipular el arreglo e imprimir solo el valor del nombre del producto,hasta acá no logro entender porque no estoy capturando el arreglo.
let prod;
for(let producto of listaProducto){
  prod = producto.nombreProducto;
  console.log(prod);
}

//--- ARREGLO PARA IMPRIMIR EN PANTALLA LOS PRODUCTOS
    // let listaProductos = ['Papas de pollo',
    //                     'Papas de limon',
    //                     'Papas de mayonesa',
    //                     'Panecillos 10gr',
    //                     'chetos de queso',
    //                     'Coca-Cola 350ml',
    //                     'Pepsi 350ml',
    //                     'AguaSabor 350ml',
    //                     'Colombiana 350ml',
    //                     'Manzana 350ml'
    //                     ];
      


  for (let i = 0; i < listaProducto.length; i++) {

    console.log(listaProducto[i].codigo);
    console.log(listaProducto[i].nombreProducto);

    const newElement = document.createElement('li');
    newElement.textContent = listaProducto[i]; 
    document.querySelector('#lista').appendChild(newElement);

  
  }



//--- FUNCION PARA CALCULAR EL COBRO E IMPRESION FACTURA
function imprimirFactura(valorProducto){
  
  let subTotal =((valorProducto * cantidadProducto));
  let ivaProducto =  subTotal * iva;
  let impuestoProducto = subTotal * iup;
  let total = subTotal + ivaProducto + impuestoProducto;
  

  console.log(`
  Producto seleccionado: ${listaProductos[1]}
  Cantidad producto solicitado: ${cantidadProducto}
  Valor producto Und: $${valorProducto}
  Subtotal: ${subTotal}
  Valor IVA(${iva * 100})%: ${ivaProducto}
  Valor IUP(${iup * 100})%: ${impuestoProducto}
  Total: ${total}  `);
  
}

//------- VARIABLES GENERALES
const btnSeleccion = document.querySelector(`#btnSeleccion`);
let producto = 0;
let cantidadProducto = 0;
let valorProducto = 0;
const iva = 0.19;
const iup = 0.15;

// --- FUNCION PARA SOLICITAR DATOS AL USUARIO Y MOSTRAR EN PANTALLA LA COMPRA
btnSeleccion.addEventListener("click", () =>{
  
  do {
    producto = parseInt(prompt(`ingrese el numero del producto`));
    cantidadProducto = parseInt(prompt(`ingrese la cantidad de producto`));

  } while (isNaN(producto));


  if (producto == 1) {
      valorProducto = 2000;
      imprimirFactura(valorProducto);
  }
  else if (producto == 2) {
    valorProducto = 2100;
    imprimirFactura(valorProducto);
  }
  else if (producto == 3) {
    valorProducto = 2200;
    imprimirFactura(valorProducto);
  }
  else if (producto == 4) {
    valorProducto = 2000;
    imprimirFactura(valorProducto);
  }
  else if (producto == 5) {
    valorProducto = 2400;
    imprimirFactura(valorProducto);
  }
  else if (producto == 6) {
    valorProducto = 2500;
    imprimirFactura(valorProducto);
  }
  else if (producto == 7) {
    valorProducto = 2400;
    imprimirFactura(valorProducto);
  }
  else if (producto == 8) {
    valorProducto = 2600;
    imprimirFactura(valorProducto);
  }
  else if (producto == 9) {
    valorProducto = 2600;
    imprimirFactura(valorProducto);
  }
  else if (producto == 10) {
    valorProducto = 2600;
    imprimirFactura(valorProducto);
  }
  else {
    console.log('Esta no es una opcion - producto no existe');
  }
  

});

// --- FUNCION PARA BORRAR CONSOLA -----
const btnClear = document.querySelector(`#btnClear`);
btnClear.addEventListener("click", () =>{

  console.clear();
});



