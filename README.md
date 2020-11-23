## Gaius Solutions - Supermarket

This is a simple implementation of a supermarket store following up some conditions and requirements on HomeChallenge document.

This implementation compounds of two parts aboard:

- Node.js Express REST API -> back-end solution
- Node.js Vue -> front-end solution.

Each project's part stands separately in different folders: 'app' for back-end and 'ui' for front-end.

In order to run this application in your machine, please follow the instructions up below:

### Prerequisites

Make sure you have **Docker** and **Docker Compose** installed.

Instructions how to install **Docker** on [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Windows](https://docs.docker.com/docker-for-windows/install/), [Mac](https://docs.docker.com/docker-for-mac/install/).

**Docker Compose** is already included in installation packs for *Windows* and *Mac*, so only Ubuntu users needs to follow [this instructions](https://docs.docker.com/compose/install/).

### Running it

The entire application can be run with a single command on a terminal:

```
$ docker-compose up -d --build
```

The above command will build up the images, prepare the containers and make they run in detach mode. This application uses Docker Compose because we need two separately containers each one for each app part.

Once the containers are up and running. You can stop them with following command:

```
$ docker-compose down
```

Usually the front-end is mapped to port 8080. Thus you can access it with http://localhost:8080
otherwise you can remap the ports as will.

Back-end app is mapped to port 3000. You can change it as well.

### Running it directly with NPM (alternative)

For any reason you don't want to execute the entire application with a single command in Docker. You can manually build and run with NPM. The instructions below avoid any Docker integration.

In order to do that, make sure you have **Node.JS** v12.10+ and **NPM** v6.14+ installed.

Go to `app`folder and execute:

```
$ npm install
```

Once installed, procced with:

```
$ npm run dev
```

Go to `ui` folder and execute following command:

```
$ npm install
```

Also, make sure to install Vue CLI globally:

```
$ npm install @vue/cli -g
```

Once installed, you can execute it with following command:

```
$ npm run serve
```

The `package.json` files have other instructions for running the application. Take a look at them if you wish. You can execute tests as well in `app` folder with:

```
$ npm run test
```

### Application Screenshots

Once installed and running, if you already have Docker Desktop, you can have a screen alike that:

![docker desktop](https://github.com/inocencio/supermarket/blob/master/screens/d04.png)

First time in app, you'll get a screen like this:

![first screen](https://github.com/inocencio/supermarket/blob/master/screens/01.png)

There are two profiles of registered users. Both interact with the application, but only the admin can register and change the products.

![login screen](https://github.com/inocencio/supermarket/blob/master/screens/02.png)

As admin I can add or edit a product.

![login screen](https://github.com/inocencio/supermarket/blob/master/screens/03.png)

A product with discount has a different look and info:

![a new product with discount](https://github.com/inocencio/supermarket/blob/master/screens/04.png)

Users can add products to the cart and see the prices in progress.

![cart](https://github.com/inocencio/supermarket/blob/master/screens/05.png)