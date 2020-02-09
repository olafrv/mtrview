# mtr-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production (./dist)
```
npm run build
npm install -g serve
serve -s dist
```

### Preview production build (./dist)

**NOTE:** This section is based on https://cli.vuejs.org/guide/deployment.html

```
sudo npm install -g serve
serve -s dist
```
### Docker production build (./dist)

**NOTE:** This section is based on https://cli.vuejs.org/guide/deployment.html

Install docker as described in the [official documentation](https://docs.docker.com/install/linux/docker-ce/ubuntu/), then:
```
sudo docker-build . -t mtr-ui
sudo docker run mtr-ui
sudo docker run -d -p 8080:80 --name mtr-ui mtr-ui
sudo docker stop mtr-ui
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
