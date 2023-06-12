import { Model } from 'mongoose';
import { SkillSetting } from '../schemas/skill-setting.schema';
import { SkillSettingsService } from '../skill-settings.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateSkillSettingDto } from '../dto/create-skill-setting.dto';

class MockSkillSettingModel {
  find = jest.fn(filter => {
    if (filter) {
      return [
        {
          "_id": {
            "$oid": "0"
          },
          "characterName": "쿠키바닐라쉐이크",
          "classEngrave": "축복의 오라",
          "className": "홀리나이트",
          "skillUsages": [
            {
              "skillName": "집행자의 검",
              "skillLevel": 12,
              "tripodNames": [
                "탁월한 기동성",
                "부위파괴 강화",
                "집행자의 일격"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "신성검",
              "skillLevel": 12,
              "tripodNames": [
                "추진력",
                "빛의 분출",
                "빛의 해방"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "빛의 충격",
              "skillLevel": 7,
              "tripodNames": [
                "재빠른 손놀림",
                "빛의 흔적"
              ],
              "runeName": "속행"
            }
          ]
        }
      ]
    } else {
      return [
        {
          "_id": {
            "$oid": "1"
          },
          "characterName": "쿠키바닐라쉐이크",
          "classEngrave": "축복의 오라",
          "className": "홀리나이트",
          "skillUsages": [
            {
              "skillName": "집행자의 검",
              "skillLevel": 12,
              "tripodNames": [
                "탁월한 기동성",
                "부위파괴 강화",
                "집행자의 일격"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "신성검",
              "skillLevel": 12,
              "tripodNames": [
                "추진력",
                "빛의 분출",
                "빛의 해방"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "빛의 충격",
              "skillLevel": 7,
              "tripodNames": [
                "재빠른 손놀림",
                "빛의 흔적"
              ],
              "runeName": "속행"
            },
          ]
        }
      ]
    }
  })
  findOneAndUpdate = jest.fn().mockResolvedValue({
    characterName: 'characterName',
    className: 'className',
    classEngrave: 'classEngrave',
    skillUsages: [
      {
        skillName: 'skillName',
        skillLevel: 123,
        tripodNames: ['tripodName'],
        runeName: 'runeName'
      }
    ]
  });
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

  describe('findSkillSettings', () => {
    it('should return oid #0', async () => {
      const result = await skillSettingService.findSkillSettings('className');
      expect(result).toStrictEqual([
        {
          "_id": {
            "$oid": "0"
          },
          "characterName": "쿠키바닐라쉐이크",
          "classEngrave": "축복의 오라",
          "className": "홀리나이트",
          "skillUsages": [
            {
              "skillName": "집행자의 검",
              "skillLevel": 12,
              "tripodNames": [
                "탁월한 기동성",
                "부위파괴 강화",
                "집행자의 일격"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "신성검",
              "skillLevel": 12,
              "tripodNames": [
                "추진력",
                "빛의 분출",
                "빛의 해방"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "빛의 충격",
              "skillLevel": 7,
              "tripodNames": [
                "재빠른 손놀림",
                "빛의 흔적"
              ],
              "runeName": "속행"
            }
          ]
        }
      ]);
      expect(jest.spyOn(skillSettingModel, 'find')).toBeCalledTimes(1);
    });

    it('should return oid #1', async () => {
      const result = await skillSettingService.findSkillSettings(null);
      expect(result).toStrictEqual([
        {
          "_id": {
            "$oid": "1"
          },
          "characterName": "쿠키바닐라쉐이크",
          "classEngrave": "축복의 오라",
          "className": "홀리나이트",
          "skillUsages": [
            {
              "skillName": "집행자의 검",
              "skillLevel": 12,
              "tripodNames": [
                "탁월한 기동성",
                "부위파괴 강화",
                "집행자의 일격"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "신성검",
              "skillLevel": 12,
              "tripodNames": [
                "추진력",
                "빛의 분출",
                "빛의 해방"
              ],
              "runeName": "압도"
            },
            {
              "skillName": "빛의 충격",
              "skillLevel": 7,
              "tripodNames": [
                "재빠른 손놀림",
                "빛의 흔적"
              ],
              "runeName": "속행"
            }
          ]
        }
      ]);
      expect(jest.spyOn(skillSettingModel, 'find')).toBeCalledTimes(1);
    });
  })

  describe('upsertSkillSetting', () => {
    it('should return CreateSkillSettingDto', async () => {
      const result = await skillSettingService.upsertSkillSetting(
        {
          characterName: 'characterName',
          className: 'className',
          classEngrave: 'classEngrave',
          skillUsages: [
            {
              skillName: 'skillName',
              skillLevel: 123,
              tripodNames: ['tripodName'],
              runeName: 'runeName'
            }
          ]
        }
      );
      expect(result).toStrictEqual({
        characterName: 'characterName',
        className: 'className',
        classEngrave: 'classEngrave',
        skillUsages: [
          {
            skillName: 'skillName',
            skillLevel: 123,
            tripodNames: ['tripodName'],
            runeName: 'runeName'
          }
        ]
      });
      expect(jest.spyOn(skillSettingModel, 'findOneAndUpdate')).toBeCalledTimes(1);
    });
  });

  describe('parseSkillUsage', () => {
    it('should return array of SkillUsage', () => {
      const result = skillSettingService.parseSkillUsage([
        {
          skillName: 'skill1',
          skillLevel: 12,
          tripods: [
            { tripodName: 'tripod1', tripodLevel: 5 },
            { tripodName: 'tripod2', tripodLevel: 5 },
            { tripodName: 'tripod3', tripodLevel: 5 },
          ],
          rune: {
            runeName: 'rune1',
            itemGrade: 'itemGrade',
            iconPath: 'iconPath'
          }
        },
        {
          skillName: 'skill2',
          skillLevel: 12,
          tripods: [],
          rune: {
            runeName: 'rune2',
            itemGrade: 'itemGrade',
            iconPath: 'iconPath'
          }
        },
        {
          skillName: 'skill3',
          skillLevel: 12,
          tripods: [
            { tripodName: 'tripod1', tripodLevel: 5 },
            { tripodName: 'tripod2', tripodLevel: 5 },
            { tripodName: 'tripod3', tripodLevel: 5 },
          ],
          rune: null
        }
      ]);
      expect(result).toStrictEqual([
        {
          skillName: 'skill1',
          skillLevel: 12,
          tripodNames: ['tripod1', 'tripod2', 'tripod3'],
          runeName: 'rune1'
        },
        {
          skillName: 'skill2',
          skillLevel: 12,
          tripodNames: [],
          runeName: 'rune2'
        },
        {
          skillName: 'skill3',
          skillLevel: 12,
          tripodNames: ['tripod1', 'tripod2', 'tripod3'],
          runeName: undefined
        }
      ]);
    })
  });
});
