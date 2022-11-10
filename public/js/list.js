window.addEventListener('load',function (params) {
    let filtros = document.querySelectorAll('.filtros')
    
    filtros.forEach(function(filtro) {
        
        filtro.addEventListener('click', function(e){
            console.log('se acaba de clickear');  
        })
    })

})