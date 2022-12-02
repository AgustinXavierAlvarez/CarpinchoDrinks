window.addEventListener('load',function () {
    let filtros = document.querySelectorAll('.filtros')    
    let categoriaTrago= document.querySelectorAll('.category-drink')
    let sectionMain = document.querySelector('#sectionMain')    
    let productos= document.querySelector('.productos')

    categoriaTrago.forEach(function(categoria){
        categoria.style.display= 'none'
    })
   
    filtros.forEach(function(filtro,i){
        console.log(filtro.value);
        filtro.addEventListener('click', function(e){
            var articulos = document.querySelectorAll('.'+filtro.value)
            articulos.forEach(function(articulo){
                if(filtro.checked){
                    articulo.style.display='block'
                }
                else{
                    articulo.style.display='none'
                }
            })
        })
        
    })


    
})
