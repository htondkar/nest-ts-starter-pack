import 'reflect-metadata'

import { NestFactory } from '@nestjs/core'
import AppModule from 'Modules/App/app.module'
import provideDocuments from './OpenApi/DocumentationProvider'

const start = async () => {
  const app = await NestFactory.create(AppModule)

  provideDocuments('/docs', app)
  await app.listen(process.env.PORT || 3000)
}

start()
