window.addEventListener('load',function () {
    let filtros = document.querySelectorAll('.filtros')    
    let categoriaTrago= document.querySelectorAll('.category-drink')
    
    categoriaTrago.forEach(function(categoria){
        categoria.style.display= 'none'
    })
   
    filtros.forEach(function(filtro,i){
        console.log(filtro.value);
        filtro.addEventListener('click', function(e){
            let cont =0;
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
// let categorias=[]
// articulosValor.forEach(function(articulo) {
//     console.log(filtro);
//     if(filtro.checked){
//         if (articulo.value == (i+1) ) {
//             categorias.push('1')
//         }
//         // else{
//         //     categorias.push('0')
//         // }
//     }
//     else{
//         categorias.push('0')
//     }
// })
// console.log(categorias);
// categorias.forEach(function(categoria,j) {
//     articulos.forEach(function(articulo,i) {
//         if((j == i)&&(categoria == 1 )){
//             articulo.style.display='block'
//         }
//         else{
//             articulo.style.display='none'
//         }
//     })
// })