import { Inject, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import { GetOneUserUseCase } from '../query/get-one-user.use-case';
import * as path from 'path';
import * as fs from 'fs/promises'; 
import * as fsSync from 'fs';

@Injectable()
export class UploadAvatarUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private readonly getOneUserUseCase: GetOneUserUseCase,
  ) {}

  async execute(id: number, file: Express.Multer.File) {

    const user = await this.getOneUserUseCase.execute(id);
    if (!user) throw new NotFoundException('User not found');


    if (user.avatar) {
      const oldAvatarPath = path.join(
        process.cwd(),
        'uploads',
        'avatars',
        path.basename(user.avatar),
      );

      try {
        if (fsSync.existsSync(oldAvatarPath)) {
          await fs.unlink(oldAvatarPath);
        }
      } catch (err) {
        console.error('Failed to delete old avatar:', err);
        throw new InternalServerErrorException('Failed to delete old avatar');
      }
    }

    try {
      const updatedUser = await this.userRepository.uploadAvatar(id, file.path);
      return updatedUser;
    } catch (err) {
      console.error('Failed to upload new avatar:', err);
      throw new InternalServerErrorException('Failed to upload new avatar');
    }
  }
}
