const btnComprar = $(".comprar")

btnComprar.on("click", function(){
   

   var inputHiddenID = this.parentElement
   var id_produto = this.dataset.id
   inputHiddenID.value = id_produto
   let url = location.href+"produto/"+"comprar/"+id_produto
   location.href = url
})