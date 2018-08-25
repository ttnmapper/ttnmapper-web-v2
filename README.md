# TTN Mapper V2

[![Build Status](https://travis-ci.org/ttnmapper/ttnmapper-web-v2.svg?branch=master)](https://travis-ci.org/ttnmapper/ttnmapper-web-v2)

This is the second version of the TTN Mapper frontend, re-written in react.

## Development

To work on developing the project you need to set up your environemnt, get the node packages and run the development server
The project uses yarn as a package manager, so go ahead and install it. NPM should also work, if you want to use that instead.

```
yarn install
```
To install all the required packages. After this, you have some options. 

### Storybook
React storybook is used to preview some of the components, as well as test things such as network delays.
```
yarn run storybook
```
Will run react storybook. The storyboard is currently the main tool used for development

### Development server (TODO)
You can run a development server by running 

```bash
yarn run start
``` 

This will require a server to serve network requests

### Tests (TODO)
You can run the tests with:
```
yarn run test
```
