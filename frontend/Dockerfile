FROM node:20-alpine

WORKDIR /app

# Instalar dependencias globales necesarias
RUN npm install -g @angular/cli@17.3.0

# Copiar configuración de dependencias
COPY package.json ./

# Instalar **todas** las dependencias (incluidos devDependencies) para que el builder exista
# NODE_ENV no se define, por lo que npm install instalará devDependencies por defecto
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del servidor de desarrollo de Angular
EXPOSE 4210

# Comando para levantar la aplicación en desarrollo
CMD ["npm", "start"]
