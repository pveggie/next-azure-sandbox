# Next Azure Sandbox

## Running app and api locally

After installing dependencies in both the root folder and api folder

1. Start the app

```bash
npm run dev
```

1. In a second terminal window, start the api

```bash
npm run api
```

1. In a third terminal window, serve the static web app, which uses both the app and api together

```bash
npm run swa
```

Open the address given by the swa to view the app. This should be [http://localhost:4280](http://localhost:4280).
