FROM node:6.9.2
EXPOSE 3001
COPY . .
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN node --version
RUN npm install
CMD node app.js