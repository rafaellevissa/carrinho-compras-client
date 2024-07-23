# carrinho-compras-client CHALLENGE

## TECHNOLOGIES

- NextJs
- TypeScript
- Tailwind

## REQUIREMENTS

- NPM

## INSTALL

Once you have the project on your computer, you just need to install the dependencies with npm:

```
npm install
```

After everything is installed, change the credencials at `.env` and run it with the folowing command:

```
npm run dev
```

### Install with Docker Compose

Alternatively, you can run the project with Docker. Make sure the `.env` file is correctly set up, and then build a Docker image using the following command:

```
docker compose build
```

Once the image is built, start the container:

```
docker compose up -d
```

That's all you need 🎉!

## RUNNING ON EC2

The app is currently running on an EC2 instance that is configured with Docker. The Docker images required for the app are stored in Github Registry.

You can access the running application on the following address:

```
http://54.160.233.169:3000/
```
