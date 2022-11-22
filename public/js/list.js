window.addEventListener('load',function () {
    let filtros = document.querySelectorAll('.filtros')    
    let articulos = document.querySelector('.producto')
    let productos= document.querySelector('.productos')
    let categoriaTrago= document.querySelectorAll('.category-drink')

    categoriaTrago.forEach(function(bebida){
        bebida.style.display= 'none'
    })

    filtros.forEach(function(filtro,i){
        filtro.addEventListener('click', function(e){
            if(filtro.checked){
                categoriaTrago.forEach(function(articulo){
                    if((articulo.value -1)== i){
                        console.log('hola')
                    }
                })
            }
            
        })
    })

})