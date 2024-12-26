git clone git@github.com:murodjon001/Coffe-Shop.git

npm install

# please use node js version over 18.18

# please create .env file and copy and past .env.example

docker compose up -d

npx prisma migrate deploy

# for create super user

npx prisma db seed

# check super user is created

npx prisma studio

npm run start:dev
