## Käynnistä tietokanta localhost:iin

docker-compose up -d 

## Migrates

npx knex migrate:latest
npx knex migrate:latest --env production

## Rollback

npx knex migrate:rollback
npx knex migrate:rollback --env production

## Seeds
npx knex seed:run
npx knex seed:run --env production