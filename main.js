let favoritos = [];
let eliminar = [];
let check = [];
let productos = [];
let filtro = [];
fetch(
  "https://gist.githubusercontent.com/jhonatan89/719f8a95a8dce961597f04b3ce37f97b/raw/4b7f1ac723a14b372ba6899ce63dbd7c2679e345/products-ecommerce"
).then((response) => {
  response.json().then((data) => {
    productos = data.items;
    productosList(productos);
  });
});

let lupa = document.getElementsByClassName("butLupa")[0];
let input = document.getElementsByClassName("buscador")[0];
lupa.addEventListener("click", function () {
  let textInput = input.value;
  for (let i = 0; i < productos.length; i++) {
    let prod = productos[i];
    let cat = productos[i].categories;
    for (let j = 0; j < cat.length; j++) {
      let element = cat[j];
      if (element === textInput) {
        filtro.push(prod);
      }
    }
  }

  if (filtro.length > 0) {
    productosList(filtro);
  } else {
    let alertList = document.getElementsByClassName("alert")[0];
    alertList.style.display = "block";
  }
});
let logo = document.getElementsByClassName("imaNav")[0];
logo.addEventListener("click", function () {
  productosList(productos);
});
let alertList = document.getElementsByClassName("alert")[0];
let alert = document.getElementsByClassName("btn-close")[0];
alert.addEventListener("click", function () {
  alertList.style.display = "none";
});

function productosList(prod) {
  let favs = document.getElementsByClassName("fav")[0];
  favs.style.display = "none";
  let det = document.getElementsByClassName("detail")[0];
  det.style.display = "none";
  let body = document.getElementsByClassName("main")[0];
  body.style.display = "block";
  body.innerHTML = "";

  for (let i = 0; i < prod.length; i++) {
    let actual = prod[i];

    let image = actual.picture;
    let name = actual.title;
    let location = actual.location;
    let price = actual.price.amount;
    let curr = actual.price.currency;
    let free = actual.free_shipping;

    let card = document.createElement("div");
    card.className = "productos";

    let img = document.createElement("img");
    img.src = image;
    img.addEventListener("click", function () {
      detail(actual);
    });
    img.className = "img";

    let text = document.createElement("p");
    text.className = "titulo";
    let tit = document.createTextNode(name);

    let num = document.createElement("p");
    let precio = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: curr,
      currencyDisplay: "narrowSymbol",
    }).format(price);
    let cantidad = document.createTextNode(precio);
    num.className = "precio";

    let ciudad = document.createElement("p");
    ciudad.className = "ciudad";
    let textCiudad = document.createTextNode(location);

    ciudad.appendChild(textCiudad);
    num.appendChild(cantidad);
    text.appendChild(tit);
    card.appendChild(ciudad);
    card.appendChild(num);
    card.appendChild(img);
    card.appendChild(text);
    if (free) {
      let icono = document.createElement("img");
      icono.src = "images/free.png";
      icono.className = "icono";
      card.appendChild(icono);
    }
    body.appendChild(card);
  }
}
function detail(actual) {
  let div = document.getElementsByClassName("main")[0];
  div.style.display = "none";
  let favs = document.getElementsByClassName("fav")[0];
  favs.display = "none";
  let body = document.getElementsByClassName("detail")[0];
  body.style.display = "block";
  body.innerHTML = "";

  let image = actual.picture;
  let name = actual.title;
  let price = actual.price.amount;
  let curr = actual.price.currency;
  let cat = actual.categories;
  let description = actual.description;
  let sold = actual.sold_quantity;
  let condition = actual.condition;

  let bread = document.createElement("p");
  bread.className = "bread";
  let crum = cat.join(">");
  let breadcrum = document.createTextNode(crum);
  bread.appendChild(breadcrum);
  body.appendChild(bread);

  let img = document.createElement("img");
  img.src = image;
  img.className = "imgDetalle";

  let card = document.createElement("div");
  card.className = "detalle";

  let text = document.createElement("p");
  text.className = "texto";
  let tit = document.createTextNode(name);

  let text2 = document.createElement("p");
  text2.className = "titDes";
  let tit2 = document.createTextNode("Descripción del producto");

  let des = document.createElement("p");
  des.className = "descripcion";
  des.innerText = description;

  let combinado = document.createElement("p");
  combinado.className = "unidades";
  let comText = "";
  if (condition === "new") {
    comText = document.createTextNode("Nuevo" + " | " + sold + " vendidos");
  } else {
    comText = document.createTextNode("Usado" + " | " + sold + " vendidos");
  }

  let num = document.createElement("p");
  let precio = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: curr,
    currencyDisplay: "narrowSymbol",
  }).format(price);

  num.className = "precio2";
  num.innerText = precio;

  let but1 = document.createElement("button");
  but1.className = "but1";
  but1.innerText = "Comprar";
  but1.setAttribute("data-bs-toggle", "modal");
  but1.setAttribute("data-bs-target", "#exampleModal");
  but1.addEventListener("click", function () {
    let modal = document.getElementsByClassName("modal-body")[0];
    let modText1 = document.createElement("p");
    modText1.className = "modText";
    modText1.innerText = name;
    let modText2 = document.createElement("p");
    modText2.className = "modText";
    modText2.style.fontWeight = "bold";
    modText2.innerText = "Añadido al carrito de compras";
    modal.appendChild(modText1);
    modal.appendChild(modText2);
  });

  let modal = document.getElementsByClassName("modal-body")[0];
  modal.innerHTML = "";

  let but2 = document.createElement("button");
  but2.className = "but1";
  but2.style.background = "#8C86D7";
  but2.style.top = "327px";
  let arr = favoritos.filter((elem) => elem.id === actual.id);
  if (arr.length !== 1) {
    but2.innerText = "Agregar a favoritos";
  } else {
    but2.innerText = "Quitar de favoritos";
  }
  but2.addEventListener("click", function () {
    if (but2.innerText === "Agregar a favoritos") {
      favoritos.push(actual);
      but2.innerText = "Quitar de favoritos";
      agregado = true;
    } else {
      but2.innerText = "Agregar a favoritos";
      for (let i = 0; i < favoritos.length; i++) {
        if (favoritos[i].id === actual.id) {
          favoritos.splice(i, 1);
          i--;
        }
      }
    }
  });

  combinado.appendChild(comText);

  text2.appendChild(tit2);
  text.appendChild(tit);
  card.appendChild(img);
  card.appendChild(text2);
  card.appendChild(des);
  card.appendChild(combinado);
  card.appendChild(text);
  card.appendChild(num);
  card.appendChild(but1);
  card.appendChild(but2);
  body.appendChild(card);

  let diferenciaDes = des.clientHeight - 170;
  if (diferenciaDes > 0) {
    card.style.height = 852 + diferenciaDes + "px";
  }
  let diferenciaNom = text.clientHeight - 48;
  if (diferenciaNom > 0) {
    num.style.top = 177 + diferenciaNom + "px";
    but2.style.top = 327 + diferenciaNom + "px";
    but1.style.top = 258 + diferenciaNom + "px";
  }
}

function favoritosList() {
  let main = document.getElementsByClassName("main")[0];
  main.style.display = "none";
  let detalle = document.getElementsByClassName("detail")[0];
  detalle.style.display = "none";
  let favs = document.getElementsByClassName("fav")[0];
  favs.style.display = "block";
  favs.innerHTML = "";
  if (favoritos.length !== 0) {
    let titulo = document.createElement("p");
    titulo.className = "tituloFav";
    titulo.innerText = "Favoritos";

    let elim = document.createElement("div");
    elim.className = "elimBox";

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "check";
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        but1.disabled = false;
        but1.style.background = "#E1677D";

        eliminar = favoritos;
        let checkboxes = document.getElementsByClassName("box");
        
        for (let i = 0; i < checkboxes.length; i++) {
          let element = checkboxes[i];
          element.checked = true;
        }
      } else {
        but1.disabled = false;
        
        but1.style.background = "#ECE9E9";
        eliminar = [];
        let checkboxes = document.getElementsByClassName("box");
        
        for (let i = 0; i < checkboxes.length; i++) {
          let element = checkboxes[i];
          element.checked = false;
        }
      }
    });

    let but1 = document.createElement("button");
    but1.className = "elimBut";
    but1.innerText = "Eliminar";
    but1.addEventListener("click", function () {
      
      favoritos = favoritos.filter((item) => eliminar.indexOf(item) === -1);
      eliminar=[];
      favoritosList();
      
    });

    favs.appendChild(titulo);
    elim.appendChild(checkbox);
    elim.appendChild(but1);
    favs.appendChild(elim);
    
    let contador = 0;
    for (let i = 0; i < favoritos.length; i++) {
      let actual = favoritos[i];
      let image = actual.picture;
      let name = actual.title;
      let price = actual.price.amount;
      let curr = actual.price.currency;
      let free = actual.free_shipping;

      let card = document.createElement("div");
      card.className = "favoritos";

      let box = document.createElement("input");
      box.setAttribute("type", "checkbox");
      box.className = "box";

      box.addEventListener("change", function () {
        if (this.checked) {
          but1.disabled = false;
          but1.style.background = "#E1677D";
          
          eliminar.push(actual);
          contador++;
          
        } else {
          contador--;
          but1.disabled = true;
          
          but1.style.background = "#ECE9E9";
          for (let i = 0; i < eliminar.length; i++) {
            if (eliminar[i].id === actual.id) {
              eliminar.splice(i, 1);
              i--;
            }
          }
        }
        let checkboxes = document.getElementsByClassName("check")[0];
        if (contador === favoritos.length) {
          checkboxes.checked = true;
        } else {
          checkboxes.checked = false;
        }
      });
      let img = document.createElement("img");
      img.src = image;
      img.className = "imgFav";

      let text = document.createElement("p");
      text.className = "nameFav";
      let tit = document.createTextNode(name);

      let num = document.createElement("p");
      let precio = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: curr,
        currencyDisplay: "narrowSymbol",
      }).format(price);
      let cantidad = document.createTextNode(precio);
      num.className = "precioFav";

      let articulo = document.createElement("button");
      articulo.className = "butFav";
      articulo.innerText = "Ver articulo";
      articulo.addEventListener("click", function () {
        detail(actual);
        favs.style.display = "none";
      });

      num.appendChild(cantidad);
      text.appendChild(tit);
      card.appendChild(box);
      card.appendChild(num);
      card.appendChild(img);
      card.appendChild(text);
      card.appendChild(articulo);
      if (free) {
        let icono = document.createElement("img");
        icono.src = "images/free.png";
        icono.className = "iconoFav";
        card.appendChild(icono);
      }
      favs.appendChild(card);
    }
  } else {
    let titulo = document.createElement("p");
    titulo.className = "tituloFav";
    titulo.innerText = "Favoritos";

    let elim = document.createElement("div");
    elim.className = "elimBox";

    let but1 = document.createElement("button");
    but1.className = "elimBut";
    but1.innerText = "Eliminar";
    but1.setAttribute("disabled", "true");

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "check";

    favs.appendChild(titulo);
    elim.appendChild(checkbox);
    elim.appendChild(but1);
    favs.appendChild(elim);
    let card = document.createElement("div");
    card.className = "favoritos";
    let aviso = document.createElement("p");
    aviso.innerText = "Aun no hay favoritos";
    aviso.style.marginTop = 10 + "px";
    aviso.style.marginLeft = 10 + "px";
    card.appendChild(aviso);
    favs.appendChild(card);
  }
}
