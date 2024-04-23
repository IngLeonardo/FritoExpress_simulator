const productos = [
  {
    codigo: 1,
    nombre: "Coca-Cola",
    presentacion: "400ml",
    precio: 2000,
    img: "../img/coca400ml.png"
  },
  {
    codigo: 2,
    nombre: "Doritos",
    presentacion: "200gr",
    precio: 2200,
    img: "../img/doritos.png"
  },
  {
    codigo: 3,
    nombre: "Hit",
    presentacion: "500ml",
    precio: 2800,
    img: "../img/hit.png"
  },
  {
    codigo: 4,
    nombre: "Papas de pollo",
    presentacion: "105gr",
    precio: 3500,
    img: "../img/papasPollo.png"
  },
  {
    codigo: 5,
    nombre: "De Todito",
    presentacion: "Natural 400gr",
    precio: 5000,
    img: "../img/toditoNatural.png"
  },
  {
    codigo: 6,
    nombre: "Coca-Cola",
    presentacion: "3litros",
    precio: 8000,
    img: "../img/coca3litros.png"
  }
]

//--- Funcionalidad que me permite imprimir los productos ---
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
  boton.addEventListener("click",() =>{

    const valorBtn = boton.textContent;
    const imgProdSeleccionado = document.querySelector(".imgProdSeleccionado");
    imgProdSeleccionado.innerHTML = "";
    
    productos.forEach((item) => {
      console.log(item.codigo)
      if(valorBtn == item.codigo){

        const newElement = document.createElement("figure");
        newElement.classList = "figure__imgProdSeleccionado";
        newElement.innerHTML = `
        <img src="${item.img}" alt="Imagen del producto seleccionado" class="img__displayTop">
        `
        document.querySelector(".imgProdSeleccionado").appendChild(newElement)
      }
    });
    


  });
});