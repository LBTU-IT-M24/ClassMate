# ClassMate

## 💻 Docker setup

You can use the [docker-compose](https://github.com/LBTU-IT-M24/ClassMate/blob/main/docker-compose.yml) file or the ```docker run``` command:

```
docker run --name classmate \
  -p 3000:3000 \
  --restart unless-stopped \
  ghcr.io/LBTU-IT-M24/classmate:main
```


## 🔨 Contribution

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
