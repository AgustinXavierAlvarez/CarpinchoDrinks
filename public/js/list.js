window.addEventListener('load',function () {
    let filtros = document.querySelectorAll('.filtros')    
    let articulos = document.querySelectorAll('article')
    let articulosValor = document.querySelectorAll('.articulo-valor')
    let categoriaTrago= document.querySelectorAll('.category-drink')
    let filtro=[]

    categoriaTrago.forEach(function(categoria){
        categoria.style.display= 'none'


    })

    filtros.forEach(function(filtro,i){
        filtro.addEventListener('click', function(e){
            if(filtro.checked){
                
            }
               
        })
    })



})