import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from '../character.controller';
import { CharacterService } from '../character.service';
import { CreateCharacterSettingDto } from '../dto/createCharacterSetting.dto';
import { CreateCharacterSkillDto } from '../dto/createCharacterSkill.dto';

class MockCharacterService {
  settings = [
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
  skills = [
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

  findCharacters = jest.fn((category) => {
    if (category === 'setting') {
      return this.settings;
    } else if (category === 'skill') {
      return this.skills;
    }
  });

  findCharactersByClass = jest.fn((category, className) => {
    if (category === 'setting') {
      return this.settings.filter((setting) => setting.className === className);
    } else if (category === 'skill') {
      return this.skills.filter((skill) => skill.className === className);
    }
  });

  createSetting = jest.fn(
    (createCharacterSettingDto: CreateCharacterSettingDto) => {
      this.settings.push(createCharacterSettingDto);
      return this.settings[this.settings.length - 1];
    },
  );

  createSkill = jest.fn((createCharacterSkillDto: CreateCharacterSkillDto) => {
    this.skills.push(createCharacterSkillDto);
    return this.skills[this.skills.length - 1];
  });
}

describe('CharacterController', () => {
  let characterController: CharacterController;
  let characterService: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useClass: MockCharacterService,
        },
      ],
    }).compile();

    characterController = module.get<CharacterController>(CharacterController);
    characterService = module.get<CharacterService>(CharacterService);
  });

  describe('findCharacters()', () => {
    it('return an array of Settings', () => {
      const result = characterController.findCharacters('setting');
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
      const spyFindCharacters = jest.spyOn(characterService, 'findCharacters');

      expect(result).toStrictEqual(expected);
      expect(spyFindCharacters).toBeCalledTimes(1);
    });

    it('return an array of Skills', () => {
      const result = characterController.findCharacters('skill');
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
      const spyFindCharacters = jest.spyOn(characterService, 'findCharacters');

      expect(result).toStrictEqual(expected);
      expect(spyFindCharacters).toBeCalledTimes(1);
    });
  });

  describe('findCharactersByClass()', () => {
    it('find an array of Settings by className and return', () => {
      const result = characterController.findCharactersByClass(
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
      const spyFindCharactersByClass = jest.spyOn(
        characterService,
        'findCharactersByClass',
      );

      expect(result).toStrictEqual(expected);
      expect(spyFindCharactersByClass).toBeCalledTimes(1);
    });

    it('find an array of Skills by className and return', () => {
      const result = characterController.findCharactersByClass(
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
      const spyFindCharactersByClass = jest.spyOn(
        characterService,
        'findCharactersByClass',
      );

      expect(result).toStrictEqual(expected);
      expect(spyFindCharactersByClass).toBeCalledTimes(1);
    });
  });

  describe('createSetting()', () => {
    it('create a Setting and return', () => {
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
      const result = characterController.createSetting(
        createCharacterSettingDto,
      );
      const spyCreateSetting = jest.spyOn(characterService, 'createSetting');

      expect(result).toStrictEqual(createCharacterSettingDto);
      expect(spyCreateSetting).toBeCalledTimes(1);
    });
  });

  describe('createSkill()', () => {
    it('create a Skill and return', () => {
      const createCharacterSkillDto = {
        characterName: 'newName',
        className: 'newClass',
        classEngrave: ['e1, e2'],
        skill: [
          {
            skillName: 'newSkill1',
            tripodNames: ['tripod1', 'tripod2'],
            runeName: 'rune1',
          },
          {
            skillName: 'newSkill2',
            tripodNames: ['tripod1', 'tripod2'],
            runeName: 'rune2',
          },
        ],
      };
      const result = characterController.createSkill(createCharacterSkillDto);
      const spyCreateSkill = jest.spyOn(characterService, 'createSkill');

      expect(result).toStrictEqual(createCharacterSkillDto);
      expect(spyCreateSkill).toBeCalledTimes(1);
    });
  });
});
