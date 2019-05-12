# TTNMapper Development

## Introduction

This project contains the front-end code, which will be served to the user. It 
is written in React, and compile to a bundle of js, html and other files. This 
bundle can then be served by any web server

The front end communicates with the TTN Mapper (TTNM) back end, which handles 
the ttn messages. The front end and the back
end both communicate with the Things Network authentication servers as well, so 
we need to deploy
a testing version of this as well.

## Table of Contents
1. [Environment setup](#environment)
2. [Project structure](#structure)
2. [Coding Conventions](#coding-conventions)
3. [Tests](#test)
4. [API](#api)
5. [Task Tracking](#task-tracking)



## <a name="environment">Environment Setup</a>

The environment setup has two parts: Setting up for JS development and setting up the testing 
servers on your local machine.

### Setup local JS development
For JS development and editor should do, but I use VS Code. [Yarn](https://yarnpkg.com/) is used as
package manager, and webpack-dev-server for compiling while coding. It also auto-refreshes is the 
compilation succeeded.

Install yarn either via your package manager or the instruction on their website

In the root folder, install all the required packages.

`yarn install` 

After that, you can run the project locally. The `start` script is defined in package-dev-server, 
and runs webpack-dev-server.

`yarn run start`

When this is running, navigate to [http://localhost:8010](http://localhost:8010) to view the result.
You will need a working internet connection to get the tile data.
>Note that `localhost` is important, not `127.0.0.1` due to CORS.


### TTNM back end
Currently this back end does not exist. Requests to the back end are proxied through webpack to the
production ttn server. Fun times. This should really be improved.

### TTN stack
The project is developed against the [TTN stack for LoRaWAN V3](https://github.com/TheThingsNetwork/lorawan-stack) 

which should be deployed to their production soon. Their stack is responsible for user 
authentication and permissions. To deploy this in your develop environment a script is provided: 
[ttnm-testing-stack.sh](https://github.com/ttnmapper/ttnmapper-web-v2/blob/develop/ttnm-testing-stack.sh).
This script implements some of the steps in their [Getting Started](https://github.com/TheThingsNetwork/lorawan-stack/blob/master/doc/gettingstarted.md)
guide, and sets up some users to test against. 

> Note that the script will ask for your root password (to change file permissions) and an admin 
password for the stack (for development any password will do)

Before running the script, you will need to install docker, docker-compose and ttn-lw-stack via 
snap. See the getting started guide.

To set-up the stack, run:

```bash
./ttnm-testing-stack.sg init ~/temp/ttnm-testing-stack
```

After everything is done, run it:
```bash
./ttnm-testing-stack.sg run
```

Alternatively you can also use docker-compose in the folder to run it. This way the output will be visible:
```bash
docker-compose up
```

## <a name="structure">Project Structure</a> 
## <a name="coding-conventions">Coding Conventions</a> 
## <a name="tests">Tests</a> 
## <a name="api">API</a> 
## <a name="task-tracking">Task Tracking</a> 