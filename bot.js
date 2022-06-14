const GerenciarArquivo = require("./comandos/gerenciarArquivo.js");
const Discord = require("discord.js");
const { moveMessagePortToContext } = require("worker_threads");
const client = new Discord.Client();
const config = require("./config.json");
var fs = require("fs");

let arquivo = new GerenciarArquivo();

//bot init
client.on("ready", () => {
  console.log(`Bot iniciado, ${client.guilds.cache.size} servidor ativo`);
  // client.user.message('Boa tarde')m,

  client.user.setActivity("Bug Busters 2", {
    type: "PLAYING",
    url: "https://www.djsystem.com.br",
  });
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
  if (message.author.bot) return;
  if (message.channel.type === "DM") return;

  const args = message.content.slice(config.prefix.length).trim().split(/ + /g);
  const comando = args.shift().toLowerCase();

  //iniciar o monitoramento
  if (comando === "comecar") {
    message.channel.send("Monitoramento de testes iniciado com sucesso! 😎 ");
    flood = setInterval(() => {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();

      if (fs.existsSync("./arqs/av.txt")) {
        arquivo.renomearLog();

        message.channel.send(
          "Tá na mão, o log do último ciclo completo de testes automatizados. ",
          { files: [`./arqs/${date}.txt`] }
        );

        setTimeout(() => {
          arquivo.deletarLog();
          console.log("Aguardou 5s para o windows processar o arquivo");
        }, 5000);
      } else {
        message.channel.send(
          "Log ainda não está disponível, Ainda não terminou o teste "
        );
      }
    }, 20000);
  }

  //parar o monitoramento
  if (comando === "parar") {
    clearInterval(flood);
    message.channel.send("Encerrou o monitoramento de testes 🔚");
  }

  //receber um log imetiatamente
  if (comando === "log") {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    if (fs.existsSync("./arqs/av.txt")) {
      arquivo.renomearLog();
      await message.channel.send(
        "Tá na mão, o log do último ciclo completo de testes automatizados. ",
        { files: [`./arqs/${date}.txt`] }
      );

      arquivo.deletarLog();
    } else {
      message.channel.send(
        "Log ainda não está disponível, Ainda não terminou o teste "
      );
    }
  }

  //Verificar um Acess Violation
  if (comando === "av") {
    message.channel.send("ÚLTIMO ERRO CRITICO DETECTADO: \n ACESS VIOLATION ", {
      files: ["./flutter.png"],
    });
  }

  //Ver a senha do dia
  if (comando === "senha") {
    const d = new Date();
    const days = [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ];
    let dia = d.getDate();
    let mes = d.getMonth() + 1;
    let ano = d.getFullYear();
    let dataCompleta =
      days[d.getDay()] +
      " - " +
      dia +
      "/" +
      mes +
      "/" +
      ano +
      " - " +
      d.toLocaleTimeString();
    let senhaDia = Math.trunc(((ano + dia) * mes) / 1.5).toString();
    message.channel.send(`A senha do dia é: ${senhaDia.padStart(5, 0)}`);
  }

  //ver os comandos
  if (comando === "comandos") {
    message.channel.send(
      " \n **!log** : Verificar todos os logs de testes do último ciclo \n\n**!av:** Verificar o último AV encontrado nos testes \n\n**!senha**: Saber a senha do dia. \n\n**!mantis** ver os casos postados no Mantis \n\n **!comecar**: Inicia o monitorammento dos logs \n\n**!parar**: Encerra o monitoramento"
    );
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

  if (comando === "versao") {
    message.channel.send("Versão atual 0.1");
  }
});

client.login(config.token);
