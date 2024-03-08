const GerenciarArquivo = require("./comandos/gerenciarArquivo.js");
const AcaoGlobal = require("./comandos/global.js");
const Discord = require("discord.js");
const { moveMessagePortToContext } = require("worker_threads");
const client = new Discord.Client();
const config = require("./config.json");
const fileSizeLimit = 0.250; // 0.250 Kilobytes
let arquivo = new GerenciarArquivo();
let global = new AcaoGlobal();

var fs = require("fs");
const { execSync } = require("child_process");
const { Console } = require("console");
var path = "C:/compartilhada/temp";
var path2 = "C:/compartilhada/temp2";
var pathMonitor = "C:/TesteAutomatizado/MONITOR"
var pathPdv = "C:/TesteAutomatizado/PDV"
var timemout = 600000;
var pathLocal = "./arqs";

//bot init
client.on("ready", () => {
  console.log(`Bot iniciado, ${client.guilds.cache.size} servidor ativo`);
  client.user.setActivity("Bug Busters 2", {
    type: "PLAYING",
    url: "https://www.djsystem.com.br",
  });
  client.channels.cache.get("984505160057384990").send("!iniciando");
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
  if (comando === "iniciando") {
    var date = global.getDataAtual();
    flood = setInterval(() => {
      // Verifica se Existe Logs do PDV na maquina Servidor.
      if (fs.existsSync(`${path}/logPDVServidor.zip`)) {
        message.channel.send(
          "Logs do último ciclo de testes do Servidor",
          { files: [`${path}/logPDVServidor.zip`] }
        );
        setTimeout(() => {
          arquivo.deletarLogZip('/logPDVServidor.zip')
          console.log("Aguardou 5s para o windows processar o arquivo");
        }, 5000);
      }

      // Verifica se Existe Logs do Monitor na maquina Servidor.
      if (fs.existsSync(`${path}/logMonitorServidor.zip`)) {
        message.channel.send(1
          1

          "Logs do último ciclo de testes do Servidor. ",
          { files: [`${path}/logMonitorServidor.zip`] }
        );
        setTimeout(() => {
          arquivo.deletarLogZip('/logMonitorServidor.zip')
          console.log("Aguardou 5s para o windows processar o arquivo");
        }, 5000);
      }

      // Verifica se Existe Logs na maquina Terminal
      if (fs.existsSync(`${path}/logTerminal.zip`)) {
        message.channel.send(
          "Logs do último ciclo de testes do Terminal",
          { files: [`${path}/logTerminal.zip`] }
        );
        setTimeout(() => {
          arquivo.deletarLogZip('/logTerminal.zip')
          console.log("Aguardou 5s para o windows processar o arquivo");
        }, 5000);
      }

      // Verifica se exist logs na maquina Terminal 2
      if (fs.existsSync(`${path2}/logTerminal2.zip`)) {
        message.channel.send(
          "Logs do último ciclo de testes do Terminal2",
          { files: [`${path2}/logTerminal2.zip`] }
        );
        setTimeout(() => {
          arquivo.deletarLogZip2('/logTerminal2.zip')
          console.log("Aguardou 5s para o windows processar o arquivo");
        }, 5000);
      }

      // Verifica se Existe uma nova versão Instalada
      if (fs.existsSync(`${path}/novaVersao.txt`)) {
        message.channel.send(
          "Uma nova versão foi instalada!. ",
          { files: [`${path}/novaVersao.txt`] }
        );
        setTimeout(() => {
          arquivo.deletarLogZip('/novaVersao.txt')
        }, 5000);
      }

      if(fs.existsSync(`${path}/RegistroMonitor.txt`)) {
        message.channel.send(
          "Foi necessário refazer o resgistro do Monitor",
          { files: [`${path}/RegistroMonitor.txt`] }
        );
        setTimeout(() => {
          arquivo.deletarLogZip('/RegistroMonitor.txt')
        }, 5000);
      }

      // Verifica se Existe Acess Violation na máquina do Daniel
      if (fs.existsSync(`${path}/avDaniel.txt`)) {
          client.channels.cache
            .get("984505160057384990")
            .send("Access violation reportado na máquina do Daniel", {
              files: [`${path}/avDaniel.txt`],
            });

          setTimeout(() => {
            arquivo.deletarLogZip('/avDaniel.txt')
            console.log("Access Violation reportado pelo Daniel");
          }, 5000);
        } 

      // Verifica se Existe Acess Violation na máquina do Fabio
      if (fs.existsSync(`${path}/avFabio.txt`)) {
       
          client.channels.cache
            .get("984505160057384990")
            .send("Access violation reportado na máquina do Fábio", {
              files: [`${path}/avFabio.txt`],
            });
          setTimeout(() => {
            arquivo.deletarLogZip('/avFabio.txt')
          }, 5000);
      }

      // Verifica se Existe Acess Violation na máquina Servidor
      if (fs.existsSync(`${path}/avServidor.txt`)) {
          client.channels.cache
            .get("984505160057384990")
            .send("Access violation reportado na máquina Servidor", {
              files: [`${path}/avServidor.txt`],
            });

          setTimeout(() => {
            arquivo.deletarLogZip('/avServidor.txt')
          }, 5000);
      }

      // Verifica se Existe Acess Violation na máquina Terminal
      if (fs.existsSync(`${path}/avTerminal.txt`)) 
          client.channels.cache
            .get("984505160057384990")
            .send("Access violation reportado na máquina Terminal", {
              files: [`${path}/avTerminal.txt`],
            });

          setTimeout(() => {
            arquivo.deletarLogZip('/avTerminal.txt')
          }, 5000);


      // Verifica se Existe Acess Violation na máquina Terminal
      if (fs.existsSync(`${path2}/avTerminal2.txt`)) 
          client.channels.cache
            .get("984505160057384990")
            .send("Access violation reportado na máquina Terminal2", {
              files: [`${path2}/avTerminal2.txt`],
            });

          setTimeout(() => {
            arquivo.deletarLogZip2('/avTerminal2.txt')
          }, 5000);

      // Verifica se Existe Acess Violation no Regime MEI

      if (fs.existsSync(`${path}/avMei.txt`)) {
          client.channels.cache
            .get("984505160057384990")
            .send("Access violation reportado no Regime MEI", {
              files: [`${path}/avMei.txt`],
            });

          setTimeout(() => {
            arquivo.deletarLogZip('/avMei.txt')

          }, 5000);
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
  // Traz um log imediato do PDV
  if (comando === "logserv") {
    execSync('7zServidor.bat').toString();
    message.channel.send('Zipando Logs...')

    var logs = [`${path}/logPDVServidor.zip`, `${path}/logMonitorServidor.zip`]
    var sendLogs = logs.map(log => log)
    console.log(sendLogs)

    await message.channel.send(
      { files: sendLogs },
    );


    arquivo.deletarLogZip('/logPDVServidor.zip')
    arquivo.deletarLogZip('/logMonitorServidor.zip')

  }
  if (comando === "logterm") {
    execSync('7zTerminal.bat').toString();
    message.channel.send('Zipando Logs...')

    if (fs.existsSync(`${path}/logPDVTerminal.zip`)) {
      await message.channel.send(
        { files: [`${path}/logPDVTerminal.zip`] }
      );
    } else { console.log('Algo deu Errado') }
    arquivo.deletarLogZip('/logPDVTerminal.zip')
  }

  if (comando === "logterm2") {
    execSync('7zTerminal2.bat').toString();
    message.channel.send('Zipando Logs...')

    if (fs.existsSync(`${path2}/logTerminal2.zip`)) {
      await message.channel.send(
        { files: [`${path2}/logTerminal2.zip`] }
      );
    } else { console.log('Algo deu Errado') }
    arquivo.deletarLogZip2('/logTerminal2.zip')
  }
  

  //receber um log imetiatamente
  if (comando === "log") {
    var date = global.getDataAtual();

    if (fs.existsSync(`${path}/log.zip`)) {
      arquivo.renomearLogHTML();
      await message.channel.send(
        "Tá na mão, o log do último ciclo completo de testes automatizados. ",
        { files: [`${path}/${date}.zip`] }
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
    0101

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
    message.channel.send("Segue a lista de ramais", { files: [`${pathLocal}/ramais.jpg`] });
  }
});

client.login(config.token);
