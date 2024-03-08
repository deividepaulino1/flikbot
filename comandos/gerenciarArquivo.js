const AcaoGlobal = require("./global.js");
var global = new AcaoGlobal();
const Monitoramento = require ("../bot.js")

var path = "C:/compartilhada/temp";
var path2 = "C:/compartilhada/temp2";

var fs = require("fs");

class GerenciarArquivo {
  renomearLogHTML() {
    var date = global.getDataAtual();
    

    fs.rename(`${path}/log.html`, `${path}/${date}.html`, function (err) {
      if (err) throw err;
      console.log("Log renomeado com data e hora atual...");
    });
  }
  
  renomearAV() {
    var date = global.getDataAtual();

    fs.rename(`${path}/av.txt`, `${path}/${date}.txt`, function (err) {
      if (err) throw err;
      console.log("AV renomeado com data e hora atual...");
    });
  }
  
  async enviarLogs(arquive){
    
    if (fs.existsSync(`${path}/${arquive}`)) {
      // arquivo.renomearLogHTML();
      await Monitoramento.message.channel.send(
        "Tá na mão, o Log Terminal do último ciclo completo de testes automatizados. ",
        { files: [`${path}/${arquive}`]},
        );
    } else {
      await message.channel.send(
        "Log ainda não está disponível, Ainda não terminou o teste "
      );
      
    }
  }

   deletarLogZip(arquive) {
    var date = global.getDataAtual();

    fs.unlink(`${path}/${arquive}`, function (err) {
      if (err && err.code == "OPA DEU ERRO CAMPEAO") {
        // file doens't exist
        console.info("Talvez esse log não exista");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Deu erro na hora de exlcuir o log");
      } else {
        console.info(`Log do teste apagado`);
      }
    });
    
  }

  deletarLogZip2(arquive) {
    var date = global.getDataAtual();

    fs.unlink(`${path2}/${arquive}`, function (err) {
      if (err && err.code == "OPA DEU ERRO CAMPEAO") {
        // file doens't exist
        console.info("Talvez esse log não exista");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Deu erro na hora de excluir o log");
      } else {
        console.info(`Log do teste apagado`);
      }
    });
    
  }

  deletarAV(arquive) {
    var date = global.getDataAtual();

    fs.unlink(`${path}/${arquive}`, function (err) {
      if (err && err.code == "OPA DEU ERRO CAMPEAO") {
        // file doens't exist
        console.info("Talvez esse log não exista");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Deu erro na hora de exlcuir o log");
      } else {
        console.info(`Log do AV apagado`);
      }
    });
  }

  deletarAV(arquive) {
    var date = global.getDataAtual();

    fs.unlink(`${path2}/${arquive}`, function (err) {
      if (err && err.code == "OPA DEU ERRO CAMPEAO") {
        // file doens't exist
        console.info("Talvez esse log não exista");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Deu erro na hora de exlcuir o log");
      } else {
        console.info(`Log do AV apagado`);
      }
    });
  }
}

module.exports = GerenciarArquivo;
