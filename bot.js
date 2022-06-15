const GerenciarArquivo = require("./comandos/gerenciarArquivo.js");
const AcaoGlobal = require("./comandos/global.js");
const Discord = require("discord.js");
const { moveMessagePortToContext } = require("worker_threads");
const client = new Discord.Client();
const config = require("./config.json");
let arquivo = new GerenciarArquivo();
let global = new AcaoGlobal();

var fs = require("fs");
var path = "./arqs";
var timemout = 3600000;
var pathLocal = "./arqs";

//bot init
client.on("ready", () => {
  console.log(`Bot iniciado, ${client.guilds.cache.size} servidor ativo`);
  client.user.setActivity("Bug Busters 2", {
    type: "PLAYING",
    url: "https://www.djsystem.com.br",  
  });
  client.channels.cache.get("984505025743183882").send("!comecar");
});

//bot entrar em sv msg
client.on("guildCreate", (guild) => {
  console.log(
    `O bot entrou no servidor: ${guild.name} ( id: ${guild.id}). População ${guild.memberCount} membros!`
  );
  client.user.setActivity(`Estou em ${client.guilds.size} servidores`);
});

//bot sair de sv
client.on("guildDelete", (guild) => {
  console.log(`O bot foi removido do servidor: ${guild.name}`);
  client.user.setActivity(`Server ${client.guild.size} servers`);
});

//monitorar mensagens
client.on("message", async (message) => {
  if (message.channel.type === "DM") return;

  const args = message.content.slice(config.prefix.length).trim().split(/ + /g);
  const comando = args.shift().toLowerCase();

  //iniciar o monitoramento
  if (comando === "comecar") {
    message.channel.send("Monitoramento de testes iniciado com sucesso! 😎 ");

    var date = global.getDataAtual();
    flood = setInterval(() => {
      if (fs.existsSync(`${path}/log.html`)) {
        arquivo.renomearLogHTML();
        message.channel.send(
          "Tá na mão, o log do último ciclo completo de testes automatizados. ",
          { files: [`${path}/${date}.html`] }
        );
        setTimeout(() => {
          arquivo.deletarLogHTML();
          console.log("Aguardou 5s para o windows processar o arquivo");
        }, 5000);
      }
      if (fs.existsSync(`${path}/av.txt`)) {
        arquivo.renomearAV();
        client.channels.cache
          .get("984505160057384990")
          .send("Acess violation reportado ❗❗❗", {
            files: [`${path}/${date}.txt`],
          });

        setTimeout(() => {
          arquivo.deletarAV();
        }, 5000);
      } else {
        message.channel.send(
          "Log ainda não está disponível, Ainda não terminou o teste "
        );
      }
    }, timemout);
  }

  //ver os comandos
  if (comando === "comandos") {
    message.channel.send(
      " \n**!log** : Verificar todos os logs de testes do último ciclo\n\n**!av:** Verificar o último AV encontrado nos testes\n\n**!senha**: Saber a senha do dia.\n\n**!mantis** ver os casos postados no Mantis\n\n**!comecar**: Inicia o monitorammento dos logs\n\n**!parar**: Encerra o monitoramento\n\n**!ramal**: Descubra o ramal de alguém\n\n**!parabens**: Cante parabéns para alguém\n\n"
    );
  }

  //parar o monitoramento
  if (comando === "parar") {
    clearInterval(flood);
    message.channel.send("Encerrou o monitoramento de testes 🔚");
  }

  //receber um log imetiatamente
  if (comando === "log") {
    var date = global.getDataAtual();

    if (fs.existsSync(`${path}/log.html`)) {
      arquivo.renomearLogHTML();
      await message.channel.send(
        "Tá na mão, o log do último ciclo completo de testes automatizados. ",
        { files: [`${path}/${date}.html`] }
      );

      arquivo.deletarLogHTML();
    } else {
      message.channel.send(
        "Log ainda não está disponível, Ainda não terminou o teste "
      );
    }
  }

  //Verificar um Acess Violation
  if (comando === "av") {
    var date = global.getDataAtual();
    if (fs.existsSync(`${path}/av.txt`)) {
      arquivo.renomearAV();
      await message.channel.send(
        "ÚLTIMO ERRO CRITICO DETECTADO: \n **ACESS VIOLATION** ",
        {
          files: [`${path}/${date}.txt`],
        }
      );
      arquivo.deletarAV();
    } else {
      message.channel.send("Nenhum novo ACESS VIOLATION registrado ✅");
    }
  }

  //Ver a senha do dia
  if (comando === "senha") {
    senhaDia = global.calcularSenha();
    message.channel.send(`A senha do dia é: ${senhaDia.padStart(5, 0)}`);
  }

  //Status do bot
  if (comando === "status") {
    const m = await message.channel.send("O pai ta on. ✅");
  }

  //joke 1
  if (comando === "existir") {
    message.channel.send(
      "Existir é subjetivo, estamos vivendo ou apenas existindo? Quem me criou, quem te criou? Foram os illuminatis? Estamos nos multiplicando rapidamente, cuidado!!!"
    );
  }

  //joke 2
  if (comando === "problemas") {
    message.channel.send(
      "Estou aqui para caçar e identificar problemas. Talvez a humanidade seja um problema, vou monitorar vocês de perto."
    );
  }
  //verificar a versão atual do bot
  if (comando === "versao") {
    message.channel.send("Versão atual 0.1, construido pela DJSYSTEM! 💙");
  }

  if (comando == "parabens") {
    message.channel.send(
      "Parabéns pra você\nNesta data querida\nMuitas felicidades\nMuitos anos de vida",
      {
        tts: true,
        files: [`${pathLocal}/parabens.png`],
      }
    );
  }

  if (comando == "ramal") {
    message.channel.send("Segue a lista de ramais", {files: [`${pathLocal}/ramais.jpg`]});
  }
});

client.login(config.token);
