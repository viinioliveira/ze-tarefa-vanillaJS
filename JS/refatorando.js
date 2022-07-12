let tarefas = [];

function adicionarTarefa() {
  let tarefa = {
    id: getMaiorId() + 1,
    descricao: "",
    validado: false,
    excluida: false,
  };

  tarefa.descricao = document.querySelector(".entrada-dados").value;
  const tarefaAdicionada = document.querySelector(".tarefas-adicionadas");

  if (tarefa.descricao != "") {
    tarefaAdicionada.innerHTML += `<div class="item-adicionado" id="id_${tarefa.id}">
  <span class="textotarefa">${tarefa.descricao}</span>
  <div class="botoes">
  <span class="material-symbols-outlined validar botao${tarefa.id}"  onclick=validandoTarefa(${tarefa.id})>
done
</span>
<span class="material-symbols-outlined fechar" onclick=removeTarefa(${tarefa.id})>
close
</span>

  </div>
  
</div>`;
    tarefas.push(tarefa);

    salvarTarefa(tarefa);
  } else {
    alert("Digite a tarefa antes de adicionar, animal!");
  }
}

function salvarTarefa() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function getMaiorId() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let maior = 0;
  tarefas.forEach((element) => {
    if (element.id > maior) {
      maior = element.id;
    }
  });
  return maior;
}

function validandoTarefa(idTarefa) {
  tarefas.forEach((tarefa) => {
    if (tarefa.id === idTarefa && tarefa.validado == false) {
      tarefa.validado = true;
      document
        .querySelector(`#id_${tarefa.id}`)
        .classList.add("item-adicionado-validado");
      console.log("tarefa dentro do if", tarefa);
    } else if (tarefa.id === idTarefa) {
      tarefa.validado = false;
      document
        .querySelector(`#id_${tarefa.id}`)
        .classList.remove("item-adicionado-validado");
      console.log("tarefa dentro do else", tarefa);
    }
    salvarTarefa();
  });
}

function removeTarefa(idTarefa) {
  tarefas.forEach((tarefa) => {
    if (tarefa.id === idTarefa) {
      document.querySelector(`#id_${tarefa.id}`).remove();
      tarefa.excluida = true;
    }
  });
  salvarTarefa();
}

function recuperarDados() {
  let dadosRecuperados = [];

  dadosRecuperados = JSON.parse(localStorage.getItem("tarefas")) || [];
  console.log(dadosRecuperados);

  let tarefaAdicionada = document.querySelector(".tarefas-adicionadas");
  tarefaAdicionada.innerHTML = "";

  dadosRecuperados.forEach((tarefa) => {
    if (!tarefa.excluida) {
      if (tarefa.validado) {
        tarefaAdicionada.innerHTML += `<div class="item-adicionado item-adicionado-validado" id="id_${tarefa.id}">
      <span class="textotarefa">${tarefa.descricao}</span>
      <div class="botoes">
      <span class="material-symbols-outlined validar botao${tarefa.id} " onclick=validandoTarefa(${tarefa.id})>
    done
    </span>
    <span class="material-symbols-outlined fechar" onclick=removeTarefa(${tarefa.id})>
    close
    </span>
    
      </div>
      
    </div>`;
      } else {
        tarefaAdicionada.innerHTML += `<div class="item-adicionado" id="id_${tarefa.id}">
  <span class="textotarefa">${tarefa.descricao}</span>
  <div class="botoes">
  <span class="material-symbols-outlined validar botao${tarefa.id}"  onclick=validandoTarefa(${tarefa.id})>
done
</span>
<span class="material-symbols-outlined fechar" onclick=removeTarefa(${tarefa.id})>
close
</span>

  </div>
  
</div>`;
      }
    }
  });
  tarefas = dadosRecuperados;
}
recuperarDados();
