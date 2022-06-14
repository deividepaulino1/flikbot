const AcaoGlobal = require("./global.js");
var global = new AcaoGlobal();

var path = './arqs'

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

  deletarLogHTML() {
    var date = global.getDataAtual();

    fs.unlink(`${path}/${date}.html`, function (err) {
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
  deletarAV() {
    var date = global.getDataAtual();

    fs.unlink(`${path}/${date}.txt`, function (err) {
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
