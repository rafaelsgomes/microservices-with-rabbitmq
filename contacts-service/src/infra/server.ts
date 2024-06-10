import { app } from './app'
import { env } from './env'

async function main() {
  app
    .listen({
      host: '0.0.0.0',
      port: env.PORT,
    })
    .then(() => {
      console.log('HTTP Sever Running!')
    })
}

main()
