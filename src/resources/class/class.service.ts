import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from './schemas/class.schema';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassDto } from './dto/class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
  ) {}

  async findClasses(): Promise<ClassDto[]> {
    return await this.classModel.find({}, { _id: 0, __v: 0 });
  }

  async createClass(createClassDto: CreateClassDto): Promise<ClassDto> {
    const result = await this.classModel.create(createClassDto);

    return {
      parent: result.parent,
      child: result.child,
    };
  }

  async replaceClass(replaceClassDto: CreateClassDto): Promise<ClassDto> {
    const replaceResult = await this.classModel.replaceOne(
      { parent: replaceClassDto.parent },
      replaceClassDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.classModel.findOne(
        {
          parent: replaceClassDto.parent,
        },
        { _id: 0, __v: 0 },
      );
    }
  }
}
