import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Info } from './schemas/info.schema';
import { Model } from 'mongoose';

@Injectable()
export class InfoService {
  constructor(
    @InjectModel(Info.name) private readonly infoModel: Model<Info>,
  ) {}

  async findAll() {
    return await this.infoModel.find({}, { _id: 0 });
  }

  async find(key: string) {
    return await this.infoModel.findOne({ key }, { _id: 0 });
  }
}
