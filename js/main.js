const carrito = [];
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
        console.log("valorBtn :",valorBtn)
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
                      carrito.push({...producto, cantidad: 1});
                      console.log(carrito);
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