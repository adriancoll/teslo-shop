# Next.js Teslo-Shop App

Para iniciar localmente, se necesita la base de datos

```
docker-compose up -d
```

- EL -d, significa **detached**

- MongoDB URL local:

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.example** a **.env**

- Reconstruir los módulos de node y levantar Next

```
yarn install
yarn dev
```

## Llenar la base de datos con información para desarrollo

Llamar a:

```
    https://localhost:3000/api/seed
```
