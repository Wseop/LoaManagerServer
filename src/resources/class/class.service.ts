import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './schemas/class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
  ) {}

  async findClasses() {
    return await this.classModel.find();
  }

  async createClass(createClassDto: CreateClassDto) {
    return await this.classModel.create(createClassDto);
  }

  async replaceClass(replaceClassDto: CreateClassDto) {
    const replaceResult = await this.classModel.replaceOne(
      { parent: replaceClassDto.parent },
      replaceClassDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.classModel.findOne({
        parent: replaceClassDto.parent,
      });
    }
  }
}
