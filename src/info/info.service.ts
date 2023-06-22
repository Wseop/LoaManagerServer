import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Info } from './schemas/info.schema';
import { Model } from 'mongoose';
import { InfoDto } from './dto/info.dto';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private readonly infoModel: Model<Info>,
  ) {}

  async find(): Promise<InfoDto[]> {
    return await this.infoModel.find({}, { _id: 0 });
  }

  async findByKey(key: string): Promise<InfoDto> {
    return await this.infoModel.findOne({ key }, { _id: 0 });
  }
}
