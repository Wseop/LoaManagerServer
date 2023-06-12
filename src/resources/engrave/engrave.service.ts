import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Engrave } from './schemas/engrave.schema';
import { Model } from 'mongoose';
import { CreateEngraveDto } from './dto/create-engrave.dto';

@Injectable()
export class EngraveService {
  constructor(
    @InjectModel(Engrave.name) private readonly engraveModel: Model<Engrave>,
  ) {}

  async findEngraves() {
    return await this.engraveModel.find();
  }

  async findClassEngraves(className: string) {
    return (await this.engraveModel.find())
      .map((engrave) => {
        if (className && engrave.className === className) return engrave;
        else if (!className && engrave.className) return engrave;
      })
      .filter((element) => element);
  }

  async findClassEngraveNames(className: string) {
    return (await this.findClassEngraves(className)).map((element) => {
      return element.engraveName;
    });
  }

  async findClassEngraveCodes(className: string) {
    return (await this.findClassEngraves(className)).map((element) => {
      return element.code;
    });
  }

  async createEngrave(createEngraveDto: CreateEngraveDto) {
    return await this.engraveModel.create(createEngraveDto);
  }

  async replaceEngrave(replaceEngraveDto: CreateEngraveDto) {
    const replaceResult = await this.engraveModel.replaceOne(
      {
        engraveName: replaceEngraveDto.engraveName,
      },
      replaceEngraveDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.engraveModel.findOne({
        engraveName: replaceEngraveDto.engraveName,
      });
    }
  }
}
