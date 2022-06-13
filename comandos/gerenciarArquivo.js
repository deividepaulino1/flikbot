var fs = require("fs");

class GerenciarArquivo {
  renomearLog() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    fs.rename("./arqs/av.txt", `./arqs/${date}.txt`, function (err) {
      if (err) throw err;
      console.log("Log renomeado com data e hora atual...");
    });
  }

  deletarLog() {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    fs.unlink(`./arqs/${date}.txt`, function (err) {
      if (err && err.code == "OPA DEU ERRO CAMPEAO") {
        // file doens't exist
        console.info("Talvez esse log não exista");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Deu erro na hora de exlcuir o log");
      } else {
        console.info(`Log excluido com maestria`);
      }
    });
  }
}

module.exports = GerenciarArquivo;
