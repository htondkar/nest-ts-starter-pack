import * as bcrypt from 'bcrypt';
import { InternalServerErrorException, Pipe, PipeTransform } from '@nestjs/common';

type plainObject = { [key: string]: string | number | boolean | null }

@Pipe()
class PasswordEncrypt<T extends plainObject> implements PipeTransform<T> {
  constructor(private readonly keyToEncrypt: keyof T) {}

  async transform(transformAble: T) {
    if (!transformAble[this.keyToEncrypt]) return transformAble

    const hashString = await new Promise<string>((resolve, reject) => {
      bcrypt.hash(transformAble[this.keyToEncrypt], 8, (err, hash) => {
        if (err) reject()
        resolve(hash)
      })
    })

    if (!hashString) throw new InternalServerErrorException('Error processing encryption')

    transformAble[this.keyToEncrypt] = hashString
    return transformAble
  }
}

export default PasswordEncrypt
