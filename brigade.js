// An brigade pipeline for Gfycat

const { events, Job } = require("brigadier"); // eslint-disable-line node/no-missing-require

events.on("train", async (event, project) => {
  const payload = JSON.parse(event.payload);
  const build = event.buildID;

  const { classifier, trainingSteps = "4000" } = payload;

  const train = new Job(`${classifier}-train`, project.secrets.training_image);

  const trainEnv = {
    ACCOUNT_NAME: project.secrets.azure_name,
    ACCOUNT_KEY: project.secrets.azure_key,
    CLASSIFIER: classifier,
    TRAINING_STEPS: trainingSteps,
    BUILD: build,
  };

  train.env = trainEnv;
  train.imagePullSecrets = "acrcredentials";
  train.imageForcePull = true;
  train.timeout = 90 * 60 * 1000;

  await train.run();

  console.log(`Results located in: ${classifier}/${build}/`);

  const notify = new Job(
    `${classifier}-notify`,
    project.secrets.notifier_image
  );

  const notifyEnv = {
    CLASSIFIER: classifier,
    BUILD: build,
    RABBITMQ_HOST: project.secrets.rabbitmq_name,
    RABBITMQ_USER: "user",
    RABBITMQ_PASS: {
      secretKeyRef: {
        name: project.secrets.rabbitmq_name,
        key: "rabbitmq-password",
      },
    },
  };

  notify.env = notifyEnv;
  notify.imagePullSecrets = "acrcredentials";
  notify.imageForcePull = true;
  notify.timeout = 60 * 1000;

  await notify.run();

  console.log(`Staging notified of: ${classifier}/${build}/`);
});
