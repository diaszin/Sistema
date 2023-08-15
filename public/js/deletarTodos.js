function deletarTodosProdutos(){
    new Swal({
        title: "Você deseja deletar tudo?",
        showDenyButton: true,
        confirmButtonText: "Excluir",
        denyButtonText: "Cancelar"
    }).then((result) =>{
        let resp = result.isConfirmed
        if(resp === true){
            location.href = "/funcionario/deletartodo/produto"
        }
    })
}