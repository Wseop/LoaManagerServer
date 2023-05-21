import { Injectable } from '@nestjs/common';
import { ChaosRewardsService } from './chaos-rewards/chaos-rewards.service';
import { GuardianRewardsService } from './guardian-rewards/guardian-rewards.service';
import { ArmorySettingsService } from './armory-settings/armory-settings.service';
import { SkillSettingsService } from './skill-settings/skill-settings.service';
import { GuardianReward } from './guardian-rewards/schemas/guardian-reward.schema';
import { ChaosReward } from './chaos-rewards/schemas/chaos-reward.schema';
import { StatsChaosReward } from './interfaces/stats-chaos-reward.interface';
import { StatsGuardianReward } from './interfaces/stats-guardian-reward.interface';
import { CreateChaosRewardDto } from './chaos-rewards/dto/create-chaos-reward.dto';
import { CreateGuardianRewardDto } from './guardian-rewards/dto/create-guardian-reward.dto';
import { CreateArmorySettingDto } from './armory-settings/dto/create-armory-setting.dto';
import { CreateSkillSettingDto } from './skill-settings/dto/create-skill-setting.dto';
import { StatsArmorySetting } from './interfaces/stats-armory-setting.interface';
import { EngraveService } from 'src/resources/engrave/engrave.service';
import { StatsSkillSetting } from './interfaces/stats-skill-setting.interface';

@Injectable()
export class StatisticsService {
  constructor(
    private readonly chaosRewardsService: ChaosRewardsService,
    private readonly guardianRewardsService: GuardianRewardsService,
    private readonly armorySettingsService: ArmorySettingsService,
    private readonly skillSettingsService: SkillSettingsService,

    private readonly engraveService: EngraveService,
  ) {}

  async getStatsChaosReward(level: string) {
    const chaosRewards: ChaosReward[] =
      await this.chaosRewardsService.findChaosRewardByLevel(level);
    const statsChaosReward: StatsChaosReward = {
      count: 0,
      level: level,
      itemCounts: {
        silling: 0,
        shard: 0,
        destructionStone: 0,
        protectionStone: 0,
        leapStone: 0,
        gem: 0,
      },
    };
    const items = Object.keys(statsChaosReward.itemCounts);

    // rewards 합산
    for (const chaosReward of chaosRewards) {
      statsChaosReward.count += chaosReward.count;

      for (const item of items) {
        statsChaosReward.itemCounts[item] += chaosReward[item];
      }
    }

    return statsChaosReward;
  }

  async createChaosReward(createChaosRewardDto: CreateChaosRewardDto) {
    return await this.chaosRewardsService.createChaosReward(
      createChaosRewardDto,
    );
  }

  async getStatsGuardianReward(level: string) {
    const guardianRewards: GuardianReward[] =
      await this.guardianRewardsService.findGuardianRewardByLevel(level);
    const statsGuardianReward: StatsGuardianReward = {
      count: 0,
      level: level,
      itemCounts: {
        destructionStone: 0,
        protectionStone: 0,
        leapStone: 0,
      },
    };
    const items = Object.keys(statsGuardianReward.itemCounts);

    // rewards 합산
    for (const guardianReward of guardianRewards) {
      statsGuardianReward.count += guardianReward.count;

      for (const item of items) {
        statsGuardianReward.itemCounts[item] += guardianReward[item];
      }
    }

    return statsGuardianReward;
  }

  async createGuardianReward(createGuardianRewardDto: CreateGuardianRewardDto) {
    return await this.guardianRewardsService.createGuardianReward(
      createGuardianRewardDto,
    );
  }

  async getStatsArmorySetting(className: string) {
    // 직업 각인 목록 초기화
    const classEngraveCodes = await this.engraveService.findClassEngraveCodes(
      className,
    );
    if (classEngraveCodes.length === 0) return null;
    else classEngraveCodes.push('pair');

    // StatsArmorySetting 초기화
    const statsArmorySetting: StatsArmorySetting = {
      count: 0,
    };
    for (const classEngraveCode of classEngraveCodes) {
      statsArmorySetting[classEngraveCode] = {
        count: 0,
        abilities: {},
        engraves: [{}, {}, {}],
        itemSets: {},
        elixirs: {},
      };
    }

    // armorySetting 데이터 합산
    (
      await this.armorySettingsService.findArmorySettingByClassName(className)
    ).forEach((armorySetting) => {
      const classEngraveCode =
        armorySetting.classEngraves.length === 1
          ? armorySetting.classEngraves[0].code
          : 'pair';

      if (statsArmorySetting[classEngraveCode] !== undefined) {
        // count
        statsArmorySetting.count++;
        statsArmorySetting[classEngraveCode]['count']++;

        // ability
        statsArmorySetting[classEngraveCode]['abilities'][
          armorySetting.ability
        ] === undefined
          ? (statsArmorySetting[classEngraveCode]['abilities'][
              armorySetting.ability
            ] = 1)
          : statsArmorySetting[classEngraveCode]['abilities'][
              armorySetting.ability
            ]++;

        // engrave (normal)
        armorySetting.engraves.forEach((engrave) => {
          statsArmorySetting[classEngraveCode]['engraves'][engrave.level - 1][
            engrave.code
          ] === undefined
            ? (statsArmorySetting[classEngraveCode]['engraves'][
                engrave.level - 1
              ][engrave.code] = 1)
            : statsArmorySetting[classEngraveCode]['engraves'][
                engrave.level - 1
              ][engrave.code]++;
        });

        // engrave (class)
        armorySetting.classEngraves.forEach((classEngrave) => {
          statsArmorySetting[classEngraveCode]['engraves'][
            classEngrave.level - 1
          ][classEngrave.code] === undefined
            ? (statsArmorySetting[classEngraveCode]['engraves'][
                classEngrave.level - 1
              ][classEngrave.code] = 1)
            : statsArmorySetting[classEngraveCode]['engraves'][
                classEngrave.level - 1
              ][classEngrave.code]++;
        });

        // itemSet
        statsArmorySetting[classEngraveCode]['itemSets'][
          armorySetting.itemSet
        ] === undefined
          ? (statsArmorySetting[classEngraveCode]['itemSets'][
              armorySetting.itemSet
            ] = 1)
          : statsArmorySetting[classEngraveCode]['itemSets'][
              armorySetting.itemSet
            ]++;

        // elixir
        statsArmorySetting[classEngraveCode]['elixirs'][
          armorySetting.elixir
        ] === undefined
          ? (statsArmorySetting[classEngraveCode]['elixirs'][
              armorySetting.elixir
            ] = 1)
          : statsArmorySetting[classEngraveCode]['elixirs'][
              armorySetting.elixir
            ]++;
      }
    });

    return statsArmorySetting;
  }

  async createArmorySetting(createArmorySettingDto: CreateArmorySettingDto) {
    return await this.armorySettingsService.createArmorySetting(
      createArmorySettingDto,
    );
  }

  async getStatsSkillSetting(className: string) {
    // 직업 각인 목록 초기화
    const classEngraveNames = await this.engraveService.findClassEngraveNames(
      className,
    );
    if (classEngraveNames.length === 0) return null;
    else classEngraveNames.push('pair');

    // StatsSkillSetting 초기화
    const statsSkillSetting: StatsSkillSetting = {
      count: 0,
    };
    for (const classEngraveName of classEngraveNames) {
      statsSkillSetting[classEngraveName] = {
        count: 0,
      };
    }

    // skillSetting 데이터 합산
    (
      await this.skillSettingsService.findSkillSettingByClassName(className)
    ).forEach((skillSetting) => {
      const classEngraveName =
        skillSetting.classEngraves.length === 1
          ? skillSetting.classEngraves[0]
          : 'pair';

      if (statsSkillSetting[classEngraveName] !== undefined) {
        statsSkillSetting.count++;
        statsSkillSetting[classEngraveName]['count']++;

        skillSetting.skillUsages.forEach((skillUsage) => {
          // skillCount
          statsSkillSetting[classEngraveName][skillUsage.skillName] ===
          undefined
            ? (statsSkillSetting[classEngraveName][skillUsage.skillName] = {
                count: 1,
                levels: {},
                tripods: {},
                runes: {},
              })
            : statsSkillSetting[classEngraveName][skillUsage.skillName][
                'count'
              ]++;

          // skillLevel
          statsSkillSetting[classEngraveName][skillUsage.skillName]['levels'][
            skillUsage.skillLevel
          ] === undefined
            ? (statsSkillSetting[classEngraveName][skillUsage.skillName][
                'levels'
              ][skillUsage.skillLevel] = 1)
            : statsSkillSetting[classEngraveName][skillUsage.skillName][
                'levels'
              ][skillUsage.skillLevel]++;

          // tripod
          skillUsage.tripodNames.forEach((tripodName) => {
            statsSkillSetting[classEngraveName][skillUsage.skillName][
              'tripods'
            ][tripodName] === undefined
              ? (statsSkillSetting[classEngraveName][skillUsage.skillName][
                  'tripods'
                ][tripodName] = 1)
              : statsSkillSetting[classEngraveName][skillUsage.skillName][
                  'tripods'
                ][tripodName]++;
          });

          // rune
          const runeName =
            skillUsage.runeName === '' ? '미착용' : skillUsage.runeName;
          statsSkillSetting[classEngraveName][skillUsage.skillName]['runes'][
            runeName
          ] === undefined
            ? (statsSkillSetting[classEngraveName][skillUsage.skillName][
                'runes'
              ][runeName] = 1)
            : statsSkillSetting[classEngraveName][skillUsage.skillName][
                'runes'
              ][runeName]++;
        });
      }
    });

    return statsSkillSetting;
  }

  async createSkillSetting(createSkillSettingDto: CreateSkillSettingDto) {
    return await this.skillSettingsService.createSkillSetting(
      createSkillSettingDto,
    );
  }
}
