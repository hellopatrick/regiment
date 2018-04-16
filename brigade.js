const { events, Job } = require("brigadier");

events.on("start_train", async (event, project) => {
  const payload = JSON.parse(event.payload);
  const classifier = payload.classifier;

  const train = new Job(
    `${classifier}-train`,
    "lostmaruacr.azurecr.io/tf-poets-training:latest"
  );

  const env = {
    ACCOUNT_NAME: project.secrets.azure_name,
    ACCOUNT_KEY: project.secrets.azure_name,
    CLASSIFIER: classifier,
    TRAINING_STEPS: 4000
  };

  job.env = env;
  job.imagePullSecrets = "acrcredentials";

  const trainingResult = await train.run();

  console.log(trainingResult);
});
