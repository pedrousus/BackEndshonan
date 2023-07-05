# Imagen base para el servidor Node.js
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /myapp

# Copiar los archivos del back-end
COPY package.json .


# Instalar las dependencias del back-end
RUN npm install

# Copiar el build del front-end


COPY . .

# Exponer el puerto en el que se ejecutará el servidor
EXPOSE 5000

# Comando para ejecutar el servidor
CMD ["node", "index.js"]
