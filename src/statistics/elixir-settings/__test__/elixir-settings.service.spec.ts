import { Model } from 'mongoose';
import { ElixirSettingsService } from '../elixir-settings.service';
import { ElixirSetting } from '../schemas/elixir-setting.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

class MockElixirSettingModel {
  find = jest.fn().mockResolvedValue([
    {
      characterName: '쿠키바닐라쉐이크',
      classEngrave: '축복의 오라',
      className: '홀리나이트',
      elixir: '선각자',
    },
  ]);
  findOneAndUpdate = jest.fn().mockResolvedValue({
    characterName: '쿠키바닐라쉐이크',
    classEngrave: '축복의 오라',
    className: '홀리나이트',
    elixir: '선각자',
  });
  deleteOne = jest.fn().mockResolvedValue(true);
}

describe('ElixirSettingsService', () => {
  let elixirSettingsService: ElixirSettingsService;
  let elixirSettingModel: Model<ElixirSetting>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ElixirSettingsService,
        {
          provide: getModelToken(ElixirSetting.name),
          useClass: MockElixirSettingModel,
        },
      ],
    }).compile();

    elixirSettingsService = module.get<ElixirSettingsService>(
      ElixirSettingsService,
    );
    elixirSettingModel = module.get<Model<ElixirSetting>>(
      getModelToken(ElixirSetting.name),
    );
  });

  describe('findElixirSettings', () => {
    it('should return array of ElixirSetting', async () => {
      const result = await elixirSettingsService.findElixirSettings(
        'className',
      );
      expect(result).toStrictEqual([
        {
          characterName: '쿠키바닐라쉐이크',
          classEngrave: '축복의 오라',
          className: '홀리나이트',
          elixir: '선각자',
        },
      ]);
      expect(jest.spyOn(elixirSettingModel, 'find')).toBeCalledTimes(1);
    });
  });

  describe('upsertElixirSetting', () => {
    it('should return an ElixirSetting', async () => {
      const result = await elixirSettingsService.upsertElixirSetting({
        characterName: '쿠키바닐라쉐이크',
        classEngrave: '축복의 오라',
        className: '홀리나이트',
        elixir: '선각자',
      });
      expect(result).toStrictEqual({
        characterName: '쿠키바닐라쉐이크',
        classEngrave: '축복의 오라',
        className: '홀리나이트',
        elixir: '선각자',
      });
      expect(
        jest.spyOn(elixirSettingModel, 'findOneAndUpdate'),
      ).toBeCalledTimes(1);
    });
  });

  describe('deleteElixirSetting', () => {
    it('should return true', async () => {
      const result = await elixirSettingsService.deleteElixirSetting('name');
      expect(result).toBe(true);
      expect(jest.spyOn(elixirSettingModel, 'deleteOne')).toBeCalledTimes(1);
    });
  });

  describe('parseElixir', () => {
    it('should return string of Elixir', () => {
      const result = elixirSettingsService.parseElixir([
        {
          type: '투구',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '선각자 (질서)': 5,
            힘: 2,
          },
        },
        {
          type: '상의',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '무기 공격력': 5,
            힘: 3,
          },
        },
        {
          type: '하의',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '무기 공격력': 5,
            힘: 3,
          },
        },
        {
          type: '장갑',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '무기 공격력': 5,
            힘: 3,
          },
        },
        {
          type: '어깨',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '선각자 (혼돈)': 5,
            힘: 3,
          },
        },
      ]);
      expect(result).toBe('선각자');
    });

    it('should return null', () => {
      const result = elixirSettingsService.parseElixir([
        {
          type: '투구',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '선각자 (질서)': 5,
            힘: 2,
          },
        },
        {
          type: '상의',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '무기 공격력': 5,
            힘: 3,
          },
        },
        {
          type: '하의',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '무기 공격력': 5,
            힘: 3,
          },
        },
        {
          type: '장갑',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '무기 공격력': 5,
            힘: 3,
          },
        },
        {
          type: '어깨',
          name: 'name',
          iconPath: 'path',
          itemGrade: 'grade',
          elixirs: {
            '무기 공격력': 5,
            힘: 3,
          },
        },
      ]);
      expect(result).toBe(null);
    });
  });
});
