import { Model } from 'mongoose';
import { SkillSetting } from '../schemas/skill-setting.schema';
import { SkillSettingsService } from '../skill-settings.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockSkillSetting: SkillSetting = {
  characterName: 'string',
  className: 'string',
  classEngraves: ['string'],
  skillUsages: [
    {
      skillName: 'string',
      skillLevel: 0,
      tripodNames: ['string'],
      runeName: 'string',
    },
  ],
};

class MockSkillSettingModel {
  find = jest.fn().mockResolvedValue([mockSkillSetting]);
  findOneAndUpdate = jest.fn().mockResolvedValue(mockSkillSetting);
}

describe('SkillSettingService', () => {
  let skillSettingService: SkillSettingsService;
  let skillSettingModel: Model<SkillSetting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillSettingsService,
        {
          provide: getModelToken(SkillSetting.name),
          useClass: MockSkillSettingModel,
        },
      ],
    }).compile();

    skillSettingService =
      module.get<SkillSettingsService>(SkillSettingsService);
    skillSettingModel = module.get<Model<SkillSetting>>(
      getModelToken(SkillSetting.name),
    );
  });

  describe('findSkillSettinges', () => {
    it('should return skillSettings', async () => {
      const result = await skillSettingService.findSkillSettings();
      expect(result).toStrictEqual([mockSkillSetting]);
      expect(jest.spyOn(skillSettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('findSkillSettingByClassName', () => {
    it('should return skillSettings', async () => {
      const result = await skillSettingService.findSkillSettingByClassName(
        'className',
      );
      expect(result).toStrictEqual([mockSkillSetting]);
      expect(jest.spyOn(skillSettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('createSkillSetting', () => {
    it('should return skillSetting', async () => {
      const result = await skillSettingService.createSkillSetting(
        mockSkillSetting,
      );
      expect(result).toStrictEqual(mockSkillSetting);
      expect(jest.spyOn(skillSettingModel, 'findOneAndUpdate')).toBeCalledTimes(
        1,
      );
    });
  });
});
