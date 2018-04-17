const { events, Job } = require("brigadier");

events.on("train", async (event, project) => {
  const payload = JSON.parse(event.payload);
  const { classifier, trainingSteps = "4000" } = payload;

  const train = new Job(`${classifier}-train`, project.secrets.training_image);

  const env = {
    ACCOUNT_NAME: project.secrets.azure_name,
    ACCOUNT_KEY: project.secrets.azure_key,
    CLASSIFIER: classifier,
    TRAINING_STEPS: trainingSteps,
  };

  train.env = env;
  train.imagePullSecrets = "acrcredentials";
  train.imageForcePull = true;
  train.timeout = 120 * 60 * 1000;

  const result = await train.run();
  const name = result.data.trim();

  console.log(`uuid => "${name}"`);
});
