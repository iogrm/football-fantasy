FROM node:18.8.0

WORKDIR /home

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json 
RUN npm install
COPY ./tsconfig.json ./tsconfig.json 
COPY ./interfaces ./interfaces
COPY ./src ./src
COPY premier-league premier-league
COPY @types @types
RUN ls

EXPOSE 5000

COPY ./.env.example ./.env
RUN npm run build

CMD [ "npm","run","start"]