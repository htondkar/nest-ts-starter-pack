import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

const settings = {
  title: 'My App',
  tag: 'test',
  version: '0.1',
}

export default function provideDocuments(
  mountPath: string,
  app: INestApplication,
): void {
  const options = new DocumentBuilder()
    .setTitle(settings.title)
    .setVersion(settings.tag)
    .addTag(settings.version)
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(mountPath, app, document)
}
