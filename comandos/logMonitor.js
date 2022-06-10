const chokidar = require("chokidar");

function teste() {
  chokidar.watch("../arqs/av.txt").on("all", (event, path) => {
    console.log(event, path);
    watcher.on("change", (path) => {
      return true;
    });
  });
}

data = teste();

if (comando === "teste") {

  if (data === true) {
    message.channel.send("Retornou 1");
  } else {
    message.channel.send("Retornou 2");
  }
}
