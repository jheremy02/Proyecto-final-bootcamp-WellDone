# Proyecto-final-bootcamp-WellDone
Desarrollo de una aplicacion web el cual consiste en ser una red de blogging , publicacion , edicion , interaccion de contenido de blogs.

## Instalar dependencias

```sh

    npm install

```
## Inicio de la aplicación

```sh
npm start

```
En modo desarrollo :

```sh
npm run dev

```

## Ruta Base para api

El api puede ser usad con  la ruta : /api

## PUBLICATIONS

## GET /publication

Permite obtener todas las publicaciones almacenados en la db

## ## GET /publication/:id

Devuelve un registro especifico de la publicacion con el id especificado.

## POST /publication/create

Crea un nuevo registro con los valores pasados en el body.

Campos en el body :
  
  - title
  - content
  - categories
  - image
  - userName


## PUT /publication/:id
Permite actualizar un registro especifico correspondiente al id pasado como parametro , editará los valores que le enviemos en el body y retornara el registro actualizado.

## DELETE /publication/:id

Elimina una publicacion especifica correspondiente al id enviado como parametro.


