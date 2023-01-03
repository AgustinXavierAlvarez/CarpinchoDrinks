window.addEventListener('load',function() {
    let descuento = document.querySelectorAll('.precio-desc')
    let precio= document.querySelectorAll('.precio')
    let total=0
    console.log(descuento);
    descuento.forEach(function(producto,i) {
        let cash=parseInt(precio[i].innerHTML)
        let disc = parseInt(producto.innerHTML)
        total= cash*disc;
        if( precio[i].innerHTML==(cash-(total/100))){
            producto.innerHTML=''
        }
        else{
            precio[i].style.textDecoration='line-through'
            precio[i].style.color='gray'
            producto.innerHTML='$'+(cash-(total/100))
        } 
        precio[i].innerHTML='$'+ cash
    })
})