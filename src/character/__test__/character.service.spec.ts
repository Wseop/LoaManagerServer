import { Model } from 'mongoose';
import { CharacterService } from '../character.service';
import { CharacterSetting } from '../schemas/characterSetting.schema';
import { CharacterSkill } from '../schemas/characterSkill.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException } from '@nestjs/common';

class MockCharacterSettingModel {
  datas = [
    {
      characterName: 'name1',
      className: 'class1',
      itemLevel: 1234.56,
      ability: 'ability1',
      elixir: 'elixir1',
      engrave: 'engrave1',
      engraveLevel: '123456',
      itemSet: 'itemSet1',
    },
    {
      characterName: 'name2',
      className: 'class2',
      itemLevel: 1234.56,
      ability: 'ability2',
      elixir: 'elixir2',
      engrave: 'engrave2',
      engraveLevel: '123456',
      itemSet: 'itemSet2',
    },
  ];

  find = jest.fn((filter) => {
    if (filter) {
      return this.datas.filter((data) => data.className === filter.className);
    } else {
      return this.datas;
    }
  });

  findOneAndUpdate = jest.fn((conditions, update, options) => {
    const index = this.datas.findIndex(
      (data) => data.characterName === conditions.characterName,
    );

    if (index === -1) {
      this.datas.push(update);
      return this.datas[this.datas.length - 1];
    } else {
      this.datas[index] = update;
      return this.datas[index];
    }
  });
}
class MockCharacterSkillModel {
  datas = [
    {
      characterName: 'name1',
      className: 'class1',
      classEngrave: ['e1, e2'],
      skill: [
        {
          skillName: 'skill1',
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'rune1',
        },
        {
          skillName: 'skill2',
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'rune2',
        },
      ],
    },
    {
      characterName: 'name2',
      className: 'class2',
      classEngrave: ['e1, e2'],
      skill: [
        {
          skillName: 'skill1',
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'rune1',
        },
        {
          skillName: 'skill2',
          tripodNames: ['tripod1', 'tripod2'],
          runeName: 'rune2',
        },
      ],
    },
  ];

  find = jest.fn((filter) => {
    if (filter) {
      return this.datas.filter((data) => data.className === filter.className);
    } else {
      return this.datas;
    }
  });

  findOneAndUpdate = jest.fn((conditions, update, options) => {
    const index = this.datas.findIndex(
      (data) => data.characterName === conditions.characterName,
    );

    if (index === -1) {
      this.datas.push(update);
      return this.datas[this.datas.length - 1];
    } else {
      this.datas[index] = update;
      return this.datas[index];
    }
  });
}

describe('CharacterService', () => {
  let characterService: CharacterService;
  let characterSettingModel: Model<CharacterSetting>;
  let characterSkillModel: Model<CharacterSkill>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getModelToken(CharacterSetting.name),
          useClass: MockCharacterSettingModel,
        },
        {
          provide: getModelToken(CharacterSkill.name),
          useClass: MockCharacterSkillModel,
        },
      ],
    }).compile();

    characterService = module.get<CharacterService>(CharacterService);
    characterSettingModel = module.get<Model<CharacterSetting>>(
      getModelToken(CharacterSetting.name),
    );
    characterSkillModel = module.get<Model<CharacterSkill>>(
      getModelToken(CharacterSkill.name),
    );
  });

  describe('findCharacters()', () => {
    it('return an array of Settings', async () => {
      const result = await characterService.findCharacters('setting');
      const expected = [
        {
          characterName: 'name1',
          className: 'class1',
          itemLevel: 1234.56,
          ability: 'ability1',
          elixir: 'elixir1',
          engrave: 'engrave1',
          engraveLevel: '123456',
          itemSet: 'itemSet1',
        },
        {
          characterName: 'name2',
          className: 'class2',
          itemLevel: 1234.56,
          ability: 'ability2',
          elixir: 'elixir2',
          engrave: 'engrave2',
          engraveLevel: '123456',
          itemSet: 'itemSet2',
        },
      ];
      const spyFind = jest.spyOn(characterSettingModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('return an array of Skills', async () => {
      const result = await characterService.findCharacters('skill');
      const expected = [
        {
          characterName: 'name1',
          className: 'class1',
          classEngrave: ['e1, e2'],
          skill: [
            {
              skillName: 'skill1',
              tripodNames: ['tripod1', 'tripod2'],
              runeName: 'rune1',
            },
            {
              skillName: 'skill2',
              tripodNames: ['tripod1', 'tripod2'],
              runeName: 'rune2',
            },
          ],
        },
        {
          characterName: 'name2',
          className: 'class2',
          classEngrave: ['e1, e2'],
          skill: [
            {
              skillName: 'skill1',
              tripodNames: ['tripod1', 'tripod2'],
              runeName: 'rune1',
            },
            {
              skillName: 'skill2',
              tripodNames: ['tripod1', 'tripod2'],
              runeName: 'rune2',
            },
          ],
        },
      ];
      const spyFind = jest.spyOn(characterSkillModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('throw BadRequestException', async () => {
      try {
        await characterService.findCharacters('throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findCharactersByClass()', () => {
    it('find an array of Settings by className', async () => {
      const result = await characterService.findCharactersByClass(
        'setting',
        'class1',
      );
      const expected = [
        {
          characterName: 'name1',
          className: 'class1',
          itemLevel: 1234.56,
          ability: 'ability1',
          elixir: 'elixir1',
          engrave: 'engrave1',
          engraveLevel: '123456',
          itemSet: 'itemSet1',
        },
      ];
      const spyFind = jest.spyOn(characterSettingModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('find an array of Skills by className', async () => {
      const result = await characterService.findCharactersByClass(
        'skill',
        'class1',
      );
      const expected = [
        {
          characterName: 'name1',
          className: 'class1',
          classEngrave: ['e1, e2'],
          skill: [
            {
              skillName: 'skill1',
              tripodNames: ['tripod1', 'tripod2'],
              runeName: 'rune1',
            },
            {
              skillName: 'skill2',
              tripodNames: ['tripod1', 'tripod2'],
              runeName: 'rune2',
            },
          ],
        },
      ];
      const spyFind = jest.spyOn(characterSkillModel, 'find');

      expect(result).toStrictEqual(expected);
      expect(spyFind).toBeCalledTimes(1);
    });

    it('throw BadRequestException', async () => {
      try {
        await characterService.findCharactersByClass(
          'throw exception',
          'class1',
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('createSetting()', () => {
    it('create new Setting', async () => {
      const createCharacterSettingDto = {
        characterName: 'newName',
        className: 'newClass',
        itemLevel: 1234.56,
        ability: 'newAbility',
        elixir: 'newElixir',
        engrave: 'newEngrave',
        engraveLevel: 'newEngraveLevel',
        itemSet: 'newItemSet',
      };
      const result = await characterService.createSetting(
        createCharacterSettingDto,
      );
      const spyFindOneAndUpdate = jest.spyOn(
        characterSettingModel,
        'findOneAndUpdate',
      );

      expect(result).toStrictEqual(createCharacterSettingDto);
      expect(spyFindOneAndUpdate).toBeCalledTimes(1);
    });
  });

  describe('createSkill()', () => {
    it('create new Skill', async () => {
      const createCharacterSkillDto = {
        characterName: 'newName',
        className: 'newClass',
        classEngrave: ['e1, e2'],
        skill: [
          {
            skillName: 'skill1',
            tripodNames: ['tripod1', 'tripod2'],
            runeName: 'rune1',
          },
          {
            skillName: 'skill2',
            tripodNames: ['tripod1', 'tripod2'],
            runeName: 'rune2',
          },
        ],
      };
      const result = await characterService.createSkill(
        createCharacterSkillDto,
      );
      const spyFindOneAndUpdate = jest.spyOn(
        characterSkillModel,
        'findOneAndUpdate',
      );

      expect(result).toStrictEqual(createCharacterSkillDto);
      expect(spyFindOneAndUpdate).toBeCalledTimes(1);
    });
  });
});
