

// if watch return true { 
//     mensagem
// } não terminou 


var watch = require("node-watch");

watch("../arqs/av.txt", { recursive: true }, function (evt, name) {
  console.log("%s changed.", name);
});



