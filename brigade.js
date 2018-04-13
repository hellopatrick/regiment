const { events } = require("brigadier");

events.on("exec", (brigadeEvent, project) => {
  console.log("Hello world!");
});

events.on("something_important", () => {
  console.log("hello, something!");
});
