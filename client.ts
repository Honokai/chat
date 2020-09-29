const socket = require('socket.io-client')('http://localhost:3000',{'forceNew':true});
const repl = require('repl');
const chalk = require('chalk');
var banco = require('./usuarios.json')
let verificador = false
let hora = new Date()

let usuario = { 'nome': "", "senha": "", "grupos": "" }

socket.on('connect', () => {
  if (process.argv[3] != null) {
    banco.usuarios.forEach(element => {
      if (element.nome == process.argv[2] && element.senha == process.argv[3] && element.grupos.indexOf(process.argv[4]) !== -1 ) {
        usuario.nome = process.argv[2]
        usuario.senha = process.argv[3]
        usuario.grupos = process.argv[4]
        socket.send(usuario.grupos, chalk.green(`${usuario.nome}`), "acabou de entrar.")
        verificador = true
      }
    })
  } else {
    console.log("Não conseguirá enviar mensagens para os grupos.")
  }

  console.log(verificador)
})

socket.on('message', (grupo, conteudo) => {
  if (usuario.grupos.indexOf(grupo) !== -1) {
    console.log(hora.toISOString().replace('T',' ').slice(0,19) + " " + chalk.green(`${conteudo}`))  
  } 
})

repl.start({
  prompt: '',
  eval: (mensagem) => {
    socket.send(usuario.grupos,`${usuario.nome}:`, mensagem)
  }
})