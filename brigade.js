const { events } = require("brigadier");

events.on("start_train", (event, project) => {
  console.log("hello, something!  x2 :)");
  console.log(event);
  console.log(event.payload);
  console.log(project);
});
