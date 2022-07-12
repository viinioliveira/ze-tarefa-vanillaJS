let tarefas = [];
let definicoes = [];

let configuracoes = {
  tema: "default",
};

const input = document.querySelector(".entrada-dados");

// adicionar tarefa com enter
input.addEventListener("keyup", (e) => {
  let tecla = e.which || e.keycode;
  if (tecla === 13) {
    adicionarTarefa();
    input.value = "";
  }
});

function dataAtual() {
  var data = new Date();
  var dia = String(data.getDate()).padStart(2, "0");
  var mes = String(data.getMonth() + 1).padStart(2, "0");
  var ano = data.getFullYear();

  dataDoDia = dia + "/" + mes + "/" + ano;

  return dataDoDia;
}

function adicionarTarefa() {
  let tarefa = {
    id: getMaiorId() + 1,
    dt_criacao: dataAtual(),
    dt_validada: "",
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
  input.value = "";
}

function salvarTarefa() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function salvarDefinicoes() {
  localStorage.setItem("definicoes", JSON.stringify(definicoes));
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
      tarefa.dt_validada = dataAtual();
      document
        .querySelector(`#id_${tarefa.id}`)
        .classList.add("item-adicionado-validado");
      console.log("tarefa dentro do if", tarefa);
    } else if (tarefa.id === idTarefa) {
      tarefa.validado = false;
      tarefa.dt_validada = "";
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
  let definicoesRecuperadas = [];

  dadosRecuperados = JSON.parse(localStorage.getItem("tarefas")) || [];
  definicoesRecuperadas = JSON.parse(localStorage.getItem("definicoes")) || [];

  let tarefaAdicionada = document.querySelector(".tarefas-adicionadas");
  container = document.querySelector(".container");
  tarefaAdicionada.innerHTML = "";

  definicoesRecuperadas.forEach((tarefaAdicionada) => {
    if (tarefaAdicionada.tema === "tema1") {
      configuracoes.tema = "tema1";
      container = document.querySelector(".container").style.cssText =
        "background-color: #21D4FD;background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)";
    }
    if (tarefaAdicionada.tema === "tema2") {
      configuracoes.tema = "tema2";
      container = document.querySelector(".container").style.cssText =
        "background-color: #FF9A8B;background-image: linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)";
    }
    if (tarefaAdicionada.tema === "tema3") {
      configuracoes.tema = "tema3";
      container = document.querySelector(".container").style.cssText =
        "background-color: #FFE53B;background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)";
    }
  });
  definicoes = definicoesRecuperadas;

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

function abrirModal() {
  const modal = (document.querySelector(".modal-config").style.visibility =
    "visible");
}

function fecharModal() {
  const modal = (document.querySelector(".modal-config").style.visibility =
    "hidden");
}
//alterar tema
const tema = document.querySelector(".temas");

tema.addEventListener("click", (e) => {
  definicoes = [];

  if (e.target.id === "tema1") {
    configuracoes.tema = "tema1";
    container = document.querySelector(".container").style.cssText =
      "background-color: #21D4FD;background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)";
  }
  if (e.target.id === "tema2") {
    configuracoes.tema = "tema2";
    container = document.querySelector(".container").style.cssText =
      "background-color: #FF9A8B;background-image: linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)";
  }
  if (e.target.id === "tema3") {
    configuracoes.tema = "tema3";
    container = document.querySelector(".container").style.cssText =
      "background-color: #FFE53B;background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)";
  }
  definicoes.push(configuracoes);
  salvarDefinicoes();
});

recuperarDados();
