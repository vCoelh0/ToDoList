async function verificarSessao() {

    try {

        const response = await fetch(
            "http://localhost:8080/logged-user",
            {
                method: "GET",
                credentials: "include"
            }
        );
        if (response.ok) {

            const usuario = await response.json();

            document.getElementById("user-name").textContent =
                `Olá, ${usuario.name}`;

            document.getElementById("user-avatar")
                .textContent = usuario.name.charAt(0).toUpperCase();

            return true;
        }

        window.location.href = "login.html";
        return false;

    } catch (error) {

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

        if (response.ok) {

            const tasks = await response.json();

            document.getElementById("task-list").innerHTML = "";

            tasks.forEach(task => {
                adicionarNaTela(task);
            });
        }

    } catch (error) {

        console.error(error);
    }
}


async function criarTarefa() {

    const title =
        document.getElementById("task-input").value;

    if (title.trim() === "") {

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

        if (response.ok) {

            document.getElementById("task-input").value = "";

            await carregarTarefas();

        } else {

            alert("Erro ao criar tarefa");
        }

    } catch (error) {

        console.error(error);

        alert("Erro ao conectar com servidor");
    }
}

const logoutBtn =
    document.getElementById("logout-btn");

logoutBtn.addEventListener(
    "click",
    logout
);



function adicionarNaTela(task) {

    const ul =
        document.getElementById("task-list");

    const li =
        document.createElement("li");

    li.className =
        `task-card ${task.completed ? "done" : ""} p-3`;

    li.innerHTML = `
        <span class="task-text fw-semibold text-white">
            ${task.title}
        </span>

        <div class="task-actions d-flex gap-2">

            <button
                type="button"
                class="btn btn-success"
                onclick="concluirTarefa(${task.id})">

                <i class="bi bi-check"></i>
            </button>

            <button
                type="button"
                class="btn btn-danger"
                onclick="excluirTarefa(${task.id})">

                <i class="bi bi-trash-fill"></i>
            </button>

        </div>
    `;

    ul.appendChild(li);
}


async function excluirTarefa(id) {

    try {

        const response = await fetch(
            `http://localhost:8080/task/${id}`,
            {
                method: "DELETE",
                credentials: "include"
            }
        );

        if (response.ok) {

            await carregarTarefas();

        } else {

            alert("Erro ao excluir");
        }

    } catch (error) {

        console.error(error);
    }
}


async function concluirTarefa(id) {

    try {

        const response = await fetch(
            `http://localhost:8080/task/${id}/complete`,
            {
                method: "PUT",
                credentials: "include"
            }
        );

        if (response.ok) {

            await carregarTarefas();

        } else {

            alert("Erro ao concluir tarefa");
        }

    } catch (error) {

        console.error(error);
    }
}


const addTaskBtn =
    document.getElementById("add-task-btn");

addTaskBtn.addEventListener(
    "click",
    criarTarefa
);


async function iniciarPagina() {

    const logado =
        await verificarSessao();

    if (logado) {
        await carregarTarefas();
    }
}

async function logout() {

    try {

        const response = await fetch(
            "http://localhost:8080/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (response.ok) {

            window.location.href = "login.html";
        }

    } catch (error) {

        console.error(error);
    }
}

document.getElementById("logout-btn")
    .addEventListener("click", async () => {

        try {

            await fetch(
                "http://localhost:8080/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            window.location.href = "login.html";

        } catch (error) {

            console.error(error);

            alert("Erro ao realizar logout");
        }
    });




iniciarPagina();