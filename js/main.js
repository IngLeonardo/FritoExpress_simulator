const carrito = [];
const productos = [
  {
    codigo: 1,
    nombre: "Coca-Cola",
    presentacion: "400ml",
    precio: 2000,
    img: "../img/coca400ml.png",
    categoria: "Bebidas con gas"
  },
  {
    codigo: 2,
    nombre: "Doritos",
    presentacion: "200gr",
    precio: 2200,
    img: "../img/doritos.png",
    categoria: "Frituras"
  },
  {
    codigo: 3,
    nombre: "Hit",
    presentacion: "500ml",
    precio: 2800,
    img: "../img/hit.png",
    categoria: "Jugos"
  },
  {
    codigo: 4,
    nombre: "Papas de pollo",
    presentacion: "105gr",
    precio: 3500,
    img: "../img/papasPollo.png",
    categoria: "Frituras"
  },
  {
    codigo: 5,
    nombre: "De Todito",
    presentacion: "Natural 400gr",
    precio: 5000,
    img: "../img/toditoNatural.png",
    categoria: "Frituras"
  },
  {
    codigo: 6,
    nombre: "Coca-Cola",
    presentacion: "3litros",
    precio: 8000,
    img: "../img/coca3litros.png",
    categoria: "Bebidas con gas"
  },
  {
    codigo: 7,
    nombre: "Papas Churrasco",
    presentacion: "110gr",
    precio: 4000,
    img: "../img/papasChurrasco.png",
    categoria: "Frituras"
  },
  {
    codigo: 8,
    nombre: "Agua con gas",
    presentacion: "600ml",
    precio: 3000,
    img: "../img/aguaConGas.png",
    categoria: "Bebidas con gas"
  },
  {
    codigo: 9,
    nombre: "Agua sin gas",
    presentacion: "600ml",
    precio: 2500,
    img: "../img/aguaSinGas.png",
    categoria: "Bebidas sin gas"
  },
  {
    codigo: 10,
    nombre: "Cheese tris",
    presentacion: "93gr",
    precio: 5000,
    img: "../img/CheeseTris.png",
    categoria: "Frituras"
  }
  
]

//--- Funcionalidad que me permite imprimir los productos en la vitrina ---
productos.forEach((item)=>{

  const newElemento = document.createElement('div');
  newElemento.id ="casilla__producto";
  newElemento.innerHTML = `
  <label class="cod__producto">${item.codigo}</label>  
  <img src="${item.img}" alt="Imagen del producto" class="imgProducto">
    `
  document.querySelector('#vitrinaProductos').appendChild(newElemento);
  
})

//--- Funcionalidad para el teclado numerico de seleccion del producto ---
const btnsCodigo = document.querySelectorAll(".btnCodigo");

btnsCodigo.forEach((boton) =>{
  // boton.addEventListener("click",() =>{
  const seleccionarProducto = () =>{
  
    const valorBtn = boton.textContent;
    const imgProdSeleccionado = document.querySelector(".imgProdSeleccionado");
    imgProdSeleccionado.innerHTML = "";
    const descripcion__producto = document.querySelector(".descripcion__producto");
    descripcion__producto.innerHTML = "";
    
    productos.forEach((item) => {
      if(valorBtn == item.codigo){
        //---Primer appendChild que renderiza la imagen del producto
        const newElementProd = document.createElement("figure");
              newElementProd.classList = "figure__imgProdSeleccionado";
              newElementProd.innerHTML = `
              <img src="${item.img}" alt="Imagen del producto seleccionado" class="img__displayTop">
        `
              document.querySelector(".imgProdSeleccionado").appendChild(newElementProd)
        //---Segundo appendChild que renderiza la descripcion del producto
        const newElementoDescrip = document.createElement("div");
              newElementoDescrip.id= "detalle__producto";
              newElementoDescrip.className = "detalle__producto";
              
              newElementoDescrip.innerHTML = `
                <label for="" id="codigo">cod: ${item.codigo}</label>
                <label for="" id="nombre">Prod : ${item.nombre}</label>
                <label for="" id="presentacion">Pres : ${item.presentacion}</label>
                <label for="" id="precio">Prec : $${item.precio}</label> 
              `
              document.querySelector(".descripcion__producto").appendChild(newElementoDescrip)
              
              boton.removeEventListener('click', seleccionarProducto);
    

              const codigo = item.codigo;
              const nombre = item.nombre;
              const presentacion = item.presentacion;
              const precio = item.precio;
              const cantidad = 0;
              
            const btnAgregar = document.querySelector("#agregar");
            btnAgregar.addEventListener("click",() => {
              const imgProdSeleccionado = document.querySelector(".imgProdSeleccionado");
              imgProdSeleccionado.innerHTML = `
                <figure class="figure__imgProdSeleccionado">
                <img src="https://placehold.co/150x200" alt="" class="img__displayTop" />
                </figure>
              `;
            
              let agregarAlCarrito = {
                    codigo,
                    nombre,
                    presentacion,
                    precio,
                    cantidad
                  }
              carrito.push(agregarAlCarrito);
    // Estoy haciendo el push al arreglo carrito, pero debo ver los videos
    // de carpi, se me repite un producto, cuando imprimo el carrito
    //veo el producto repetido
              console.log("codigo :",codigo);
              console.log("nombre :",nombre);
              console.log("presentacion :",presentacion);
              console.log("precio :",precio);
              console.log("cantidad :",cantidad,);
              console.log(carrito);
              
            });
            

      }

      

      
    }); 
  };

  boton.addEventListener("click",seleccionarProducto);
});


// const codigo = document.querySelector("#codigo").textContent;
// const nombre = document.querySelector("#nombre").textContent;
// const presentacion = document.querySelector("#presentacion").textContent;
// const precio = documet.querySelector("#precio").textContent;
// const cantidad = document.querySelector("#cantidad").textContent;



