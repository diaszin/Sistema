const btnDeletar = $(".deletar")
const btnAtualizar = $(".atualizar")

btnDeletar.on("click", function(){
    const id = $(this).parent().parent()[0].id
    const inputDeletarHidden = document.getElementById("inputDeletarHidden")
    inputDeletarHidden.setAttribute("value", id)
})

btnAtualizar.on("click", function(){
    const id = $(this).parent().parent()[0].id
    const inputAtualizarHidden = document.getElementById("inputAtualizarHidden")
    inputAtualizarHidden.setAttribute("value", id)
})