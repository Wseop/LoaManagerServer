import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ArmorySetting } from '../schemas/armory-setting.schema';
import { ArmorySettingsService } from '../armory-settings.service';

class MockArmorySettingModel {
  find = jest.fn().mockResolvedValue([
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ name: 'engraveName', level: 0 }],
      classEngraves: [{ name: 'classEngraveName', level: 0 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ name: 'engraveName', level: 0 }],
      classEngraves: [{ name: 'classEngraveName', level: 0 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
    {
      characterName: 'characterName',
      className: 'className',
      itemLevel: 0,
      ability: 'ability',
      engraves: [{ name: 'engraveName', level: 0 }],
      classEngraves: [{ name: 'classEngraveName', level: 0 }],
      itemSet: 'itemSet',
      elixir: 'elixir',
    },
  ]);
  findOneAndUpdate = jest.fn().mockResolvedValue({
    characterName: 'characterName',
    className: 'className',
    itemLevel: 0,
    ability: 'ability',
    engraves: [{ name: 'engraveName', level: 0 }],
    classEngraves: [{ name: 'classEngraveName', level: 0 }],
    itemSet: 'itemSet',
    elixir: 'elixir',
  });
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
      expect(result).toStrictEqual([
        {
          characterName: 'characterName',
          className: 'className',
          itemLevel: 0,
          ability: 'ability',
          engraves: [{ name: 'engraveName', level: 0 }],
          classEngraves: [{ name: 'classEngraveName', level: 0 }],
          itemSet: 'itemSet',
          elixir: 'elixir',
        },
        {
          characterName: 'characterName',
          className: 'className',
          itemLevel: 0,
          ability: 'ability',
          engraves: [{ name: 'engraveName', level: 0 }],
          classEngraves: [{ name: 'classEngraveName', level: 0 }],
          itemSet: 'itemSet',
          elixir: 'elixir',
        },
        {
          characterName: 'characterName',
          className: 'className',
          itemLevel: 0,
          ability: 'ability',
          engraves: [{ name: 'engraveName', level: 0 }],
          classEngraves: [{ name: 'classEngraveName', level: 0 }],
          itemSet: 'itemSet',
          elixir: 'elixir',
        },
      ]);
      expect(jest.spyOn(armorySettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findArmorySettingByClassName', () => {
    it('should return armorySettings', async () => {
      const result = await armorySettingService.findArmorySettingsByClassName(
        'className',
      );
      expect(result).toStrictEqual([
        {
          characterName: 'characterName',
          className: 'className',
          itemLevel: 0,
          ability: 'ability',
          engraves: [{ name: 'engraveName', level: 0 }],
          classEngraves: [{ name: 'classEngraveName', level: 0 }],
          itemSet: 'itemSet',
          elixir: 'elixir',
        },
        {
          characterName: 'characterName',
          className: 'className',
          itemLevel: 0,
          ability: 'ability',
          engraves: [{ name: 'engraveName', level: 0 }],
          classEngraves: [{ name: 'classEngraveName', level: 0 }],
          itemSet: 'itemSet',
          elixir: 'elixir',
        },
        {
          characterName: 'characterName',
          className: 'className',
          itemLevel: 0,
          ability: 'ability',
          engraves: [{ name: 'engraveName', level: 0 }],
          classEngraves: [{ name: 'classEngraveName', level: 0 }],
          itemSet: 'itemSet',
          elixir: 'elixir',
        },
      ]);
      expect(jest.spyOn(armorySettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createArmorySetting', () => {
    it('should return armorySetting', async () => {
      const result = await armorySettingService.createArmorySetting({
        characterName: 'characterName',
        className: 'className',
        itemLevel: 0,
        ability: 'ability',
        engraves: [{ name: 'engraveName', level: 0 }],
        classEngraves: [{ name: 'classEngraveName', level: 0 }],
        itemSet: 'itemSet',
        elixir: 'elixir',
      });
      expect(result).toStrictEqual({
        characterName: 'characterName',
        className: 'className',
        itemLevel: 0,
        ability: 'ability',
        engraves: [{ name: 'engraveName', level: 0 }],
        classEngraves: [{ name: 'classEngraveName', level: 0 }],
        itemSet: 'itemSet',
        elixir: 'elixir',
      });
      expect(
        jest.spyOn(armorySettingModel, 'findOneAndUpdate'),
      ).toBeCalledTimes(1);
    });
  });
});
