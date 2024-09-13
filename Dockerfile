    # Usar una imagen base de Node.js
    FROM node:20

    # Establecer el directorio de trabajo
    WORKDIR /app

   # Copiar el archivo package.json y package-lock.json si existe
    COPY package*.json ./

    # Instalar las dependencias
    RUN npm install

    # Copiar el código fuente
    COPY . .

    # Compilar el código TypeScript a JavaScript
    RUN npm run build

    # Exponer el puerto en el que correrá la aplicación
    EXPOSE 3000

    # Comando para iniciar la aplicación
    CMD ["node", "dist/app.js"] 
