import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ArmorySetting } from '../schemas/armory-setting.schema';
import { ArmorySettingsService } from '../armory-settings.service';

const mockArmorySetting: ArmorySetting = {
  characterName: 'string',
  className: 'string',
  itemLevel: 0,
  ability: 'string',
  elixir: 'string',
  engraves: [
    {
      code: 0,
      level: 0,
    },
  ],
  itemSet: 'string',
};

class MockArmorySettingModel {
  find = jest.fn().mockResolvedValue([mockArmorySetting]);
  findOneAndUpdate = jest.fn().mockResolvedValue(mockArmorySetting);
}

describe('ArmorySettingService', () => {
  let armorySettingService: ArmorySettingsService;
  let armorySettingModel: Model<ArmorySetting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArmorySettingsService,
        {
          provide: getModelToken(ArmorySetting.name),
          useClass: MockArmorySettingModel,
        },
      ],
    }).compile();

    armorySettingService = module.get<ArmorySettingsService>(
      ArmorySettingsService,
    );
    armorySettingModel = module.get<Model<ArmorySetting>>(
      getModelToken(ArmorySetting.name),
    );
  });

  describe('findArmorySettinges', () => {
    it('should return armorySettings', async () => {
      const result = await armorySettingService.findArmorySettings();
      expect(result).toStrictEqual([mockArmorySetting]);
      expect(jest.spyOn(armorySettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findArmorySettingByClassName', () => {
    it('should return armorySettings', async () => {
      const result = await armorySettingService.findArmorySettingByClassName(
        'className',
      );
      expect(result).toStrictEqual([mockArmorySetting]);
      expect(jest.spyOn(armorySettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createArmorySetting', () => {
    it('should return armorySetting', async () => {
      const result = await armorySettingService.createArmorySetting(
        mockArmorySetting,
      );
      expect(result).toStrictEqual(mockArmorySetting);
      expect(
        jest.spyOn(armorySettingModel, 'findOneAndUpdate'),
      ).toBeCalledTimes(1);
    });
  });
});
