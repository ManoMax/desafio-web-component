import { post_user } from './service.js';

let $createUser = document.querySelector("create-user"); 

$createUser.addEventListener("cria-usuario", async e => {
    try {
        let resultado = await cria_usuario(e.detail);
        $createUser.done("Usuário criado com sucesso");
    } catch (error) {
        $createUser.error(error.msg);
    }
});

async function cria_usuario(credenciais) {
    console.log("enviando dados pro servidor");
    return new Promise(async (res, rej) => {
        try {
            let resp = await post_user({
                email: credenciais.email,
                username: credenciais.username,
                senha: credenciais.senha
            });
            $createUser.done("Usuário criado com sucesso.");
        } catch (error) {
            $createUser.error(error.msg);
        }
    });
}
