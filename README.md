## Teslo Shop Next App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

-   El -d, significa: **detached** (aislada de la consola)

MongoDB URL Local:

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

-   Renombrar el archivo **.env.template** a **.env**

## Llenar la base de datos con información de pruebas

-   llamar:

```
http://localhost:3000/api/seed
```
