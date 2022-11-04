import app from "./app";
import AppDataSource from "./data-source";

(async () => {
  await AppDataSource.initialize()
    .then(() => {
      process.env.NODE_EXECUTION === "develop"
        ? console.log(`Connected to ${process.env.DEVELOP_DB} database`)
        : console.log(`Connected to ${process.env.PRIVAT_DB} database`);
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  app.listen(process.env.DEVELOP_PORT || 3001, () => {
    process.env.NODE_EXECUTION === "develop"
      ? console.log(`Server running on port ${process.env.DEVELOP_PORT}`)
      : console.log(`Server running on port ${process.env.PRIVAT_PORT}`);
  });
})();
