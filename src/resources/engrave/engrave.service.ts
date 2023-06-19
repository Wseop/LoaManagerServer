import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Engrave } from './schemas/engrave.schema';
import { Model } from 'mongoose';
import { CreateEngraveDto } from './dto/create-engrave.dto';
import { EngraveDto } from './dto/engrave.dto';

@Injectable()
export class EngraveService {
  constructor(
    @InjectModel(Engrave.name) private readonly engraveModel: Model<Engrave>,
  ) {}

  async findEngraves(): Promise<EngraveDto[]> {
    return await this.engraveModel.find({}, { _id: 0 });
  }

  async findClassEngraves(className: string): Promise<Engrave[]> {
    return (await this.engraveModel.find())
      .map((engrave) => {
        if (className && engrave.className === className) return engrave;
        else if (!className && engrave.className) return engrave;
      })
      .filter((element) => element);
  }

  async findClassEngraveNames(className: string): Promise<string[]> {
    return (await this.findClassEngraves(className)).map((element) => {
      return element.engraveName;
    });
  }

  async findClassEngraveCodes(className: string): Promise<number[]> {
    return (await this.findClassEngraves(className)).map((element) => {
      return element.code;
    });
  }

  async createEngrave(createEngraveDto: CreateEngraveDto): Promise<EngraveDto> {
    return await this.engraveModel.create(createEngraveDto);
  }

  async replaceEngrave(
    replaceEngraveDto: CreateEngraveDto,
  ): Promise<EngraveDto> {
    const replaceResult = await this.engraveModel.replaceOne(
      {
        engraveName: replaceEngraveDto.engraveName,
      },
      replaceEngraveDto,
    );

    if (replaceResult.matchedCount === 0) {
      return null;
    } else {
      return await this.engraveModel.findOne(
        {
          engraveName: replaceEngraveDto.engraveName,
        },
        { _id: 0 },
      );
    }
  }
}
