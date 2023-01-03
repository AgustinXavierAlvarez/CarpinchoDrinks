window.onload = function() {
    let botonAgregar = document.querySelector('.boton-formulario-shop');
    
    botonAgregar.addEventListener('click', function(e){
        e.preventDefault();
        let url = window.location.href.split("/");
        
        let id = url [url.length -1]
        console.log(id);
        let imagen = document.querySelector('.main-producto img')
        let tituloProd = document.getElementsByClassName('title-product')
        let precio = document.getElementsByClassName('precio')
        let descuento = document.getElementsByClassName('descuento')
        let inputCantidad = document.querySelector('#count').value
        console.log(imagen.src);
        

        let producto = {
            idProducto:parseInt(id), 
            imagen:imagen.src,
            tituloProd:tituloProd[0].innerHTML,
            precio:parseFloat(precio[0].innerHTML),
            descuento: parseFloat(descuento[0].innerHTML),
            inputCantidad: parseInt(inputCantidad)
        }

        console.log(producto);

        if(localStorage.length == 0) {
            let carrito = []
            carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            localStorage.setItem("totalCarrito", producto.precio * producto.inputCantidad)
        }
        else 
        {
            let band=0
            let carrito = JSON.parse(localStorage.carrito)
            console.log(localStorage.carrito);
            console.log(carrito);
            carrito.forEach(function(prod,i){
                if(producto.idProducto ==prod.idProducto){
                    prod.inputCantidad=prod.inputCantidad+1
                    band=1
                }
            });
            if(band ==  0){
                carrito.push(producto)
            }
            localStorage.setItem("carrito", JSON.stringify(carrito))
            console.log(localStorage.carrito);
            
            
            // let totalCarrito = 0
            // for (let i=0; i<carrito.length; i++) {
            //     let carro = carrito[i].precio * carrito[i].inputCantidad;
            //     totalCarrito += carro 
            // }
            // localStorage.setItem("totalCarrito", totalCarrito)
        }
        
        alert('Agregaste' + " " + tituloProd[0].innerHTML + " a tu carrito de compras!")
    })
}

// let arrayProductos = carrito.filter(function(producto){
//     return producto.idProducto == id
// })

// if(arrayProductos.length == 0){
//     carrito.push(producto)
//     localStorage.setItem("carrito", JSON.stringify(carrito))
// } else {
//     arrayProductos[0].inputCantidad == parseInt(arrayProductos[0].inputCantidad)+1;
//     localStorage.setItem("carrito", JSON.stringify(carrito))
// }




/*window.onload = function() {
    let botonAgregar = document.querySelector('.boton-formulario-shop');
    
    botonAgregar.addEventListener('click', function(e){
        e.preventDefault();
        let url = window.location.href.split("/");
        
        let id = url [url.length -1]
           
        let imagen = document.querySelector('.producto img').getAttribute("src")
        let tituloProd = document.querySelector('.producto h1').innerText
        let precio = document.querySelector('.precio').innerText
        let descuento = document.querySelector('.descuento').innerText
        let inputCantidad = document.querySelector('.count').value

        let producto = {
            idProducto: id, 
            imagen,
            tituloProd,
            precio:parseFloat(precio),
            descuento: parseFloat(descuento),
            inputCantidad: parseInt(inputCantidad)
        }
        if(localStorage.length == 0) {
            let carrito = []
            carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            localStorage.setItem("totalCarrito", producto.precio * producto.inputCantidad)
        }
        else {
            let carrito = JSON.parse(localStorage.carrito)
            let arrayProductos = carrito.filter(function(producto){
                return producto.idProducto == id
            })

            if(arrayProductos.length == 0){
                carrito.push(producto)
                localStorage.setItem("carrito", JSON.stringify(carrito))
            } else {
                arrayProductos[0].inputCantidad == parseInt(arrayProductos[0].inputCantidad)+1;
                localStorage.setItem("carrito", JSON.stringify(carrito))
            }

            

            let totalCarrito = 0
            for (let i=0; i<carrito.length; i++) {
               let carro = carrito[i].precio * carrito[i].inputCantidad;
               totalCarrito += carro 
            }
            localStorage.setItem("totalCarrito", totalCarrito)
        }
        
        alert('Agregaste' + " " + tituloProd + " a tu carrito de compras!")
    })
}
*/