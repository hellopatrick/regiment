const { events, Job } = require("brigadier");

events.on("train", async (event, project) => {
  const payload = JSON.parse(event.payload);
  const classifier = payload.classifier;

  const train = new Job(`${classifier}-train`, project.secrets.training_image);

  const env = {
    ACCOUNT_NAME: project.secrets.azure_name,
    ACCOUNT_KEY: project.secrets.azure_key,
    CLASSIFIER: classifier,
    TRAINING_STEPS: "4000",
  };

  train.env = env;
  train.imagePullSecrets = "acrcredentials";
  train.imageForcePull = true;

  const result = await train.run();

  const name = result.data.trim();

  console.log(`result: ${name}`);
});
