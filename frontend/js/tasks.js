
    async function verificarSessao() {

        try {

            const response = await fetch(
                "http://localhost:8080/logged-user",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            if(response.ok){

                const usuario = await response.json();

                console.log("Usuário logado:", usuario.name);

                return true;
            }

            window.location.href = "login.html";
            return false;

        } catch(error){

            console.error(error);

            window.location.href = "login.html";

            return false;
        }
    }

  
    async function carregarTarefas() {

        try {

            const response = await fetch(
                "http://localhost:8080/task",
                {
                    method: "GET",
                    credentials: "include"
                }
            );

            if(response.ok){

                const tasks = await response.json();

                document.getElementById("task-list").innerHTML = "";

                tasks.forEach(task => {
                    adicionarNaTela(task);
                });
            }

        } catch(error){

            console.error(error);
        }
    }

    
    async function criarTarefa() {

        const title =
            document.getElementById("task-input").value;

        if(title.trim() === ""){
            alert("Digite uma tarefa");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/task",
                {
                    method: "POST",
                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        title: title
                    })
                }
            );

            if(response.ok){

                document.getElementById("task-input").value = "";

                await carregarTarefas();

            } else {

                alert("Erro ao criar tarefa");
            }

        } catch(error){

            console.error(error);

            alert("Erro ao conectar com servidor");
        }
    }

   
    function adicionarNaTela(task){

        const ul =
            document.getElementById("task-list");

        const li =
            document.createElement("li");

        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <span>${task.title}</span>

            <button
                class="btn btn-danger btn-sm"
                onclick="excluirTarefa(${task.id})">
                <i class="bi bi-trash"></i>
            </button>
        `;

        ul.appendChild(li);
    }

   
    async function excluirTarefa(id){

        try {

            const response = await fetch(
                `http://localhost:8080/task/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                }
            );

            if(response.ok){

                carregarTarefas();

            } else {

                alert("Erro ao excluir");
            }

        } catch(error){

            console.error(error);
        }
    }

   
    const addTaskBtn =
        document.getElementById("add-task-btn");

    addTaskBtn.addEventListener(
        "click",
        criarTarefa
    );

    
    async function iniciarPagina(){

        const logado =
            await verificarSessao();

        if(logado){
            carregarTarefas();
        }
    }

    iniciarPagina();

