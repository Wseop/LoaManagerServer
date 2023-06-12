import { Model } from "mongoose";
import { AbilitySetting } from "../schemas/ability-setting.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { AbilitySettingsService } from "../ability-settings.service";
import { getModelToken } from "@nestjs/mongoose";

class MockAbilitySettingModel {
    find = jest.fn().mockResolvedValue([{
        "characterName": "쿠키바닐라쉐이크",
        "ability": "신특",
        "classEngrave": "축복의 오라",
        "className": "홀리나이트"
    }]);
    findOneAndUpdate = jest.fn().mockResolvedValue({
        "characterName": "쿠키바닐라쉐이크",
        "ability": "신특",
        "classEngrave": "축복의 오라",
        "className": "홀리나이트"
    });
    deleteOne = jest.fn().mockResolvedValue(true);
}

describe('AbilitySettingsService', () => {
    let abilitySettingsService: AbilitySettingsService;
    let abilitySettingModel: Model<AbilitySetting>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AbilitySettingsService,
                {
                    provide: getModelToken(AbilitySetting.name),
                    useClass: MockAbilitySettingModel
                }
            ]
        }).compile();

        abilitySettingsService =
            module.get<AbilitySettingsService>(AbilitySettingsService);
        abilitySettingModel =
            module.get<Model<AbilitySetting>>(getModelToken(AbilitySetting.name));
    });

    describe('findAbilitySettings', () => {
        it('should return array of AbilitySetting', async () => {
            const result = await abilitySettingsService.findAbilitySettings('className');
            expect(result).toStrictEqual([
                {
                    "characterName": "쿠키바닐라쉐이크",
                    "ability": "신특",
                    "classEngrave": "축복의 오라",
                    "className": "홀리나이트"
                }
            ]);
            expect(jest.spyOn(abilitySettingModel, 'find')).toBeCalledTimes(1);
        });
    });

    describe('upsertAbilitySetting', () => {
        it('should return an AbilitySetting', async () => {
            const result = await abilitySettingsService.upsertAbilitySetting({
                "characterName": "쿠키바닐라쉐이크",
                "ability": "신특",
                "classEngrave": "축복의 오라",
                "className": "홀리나이트"
            });
            expect(result).toStrictEqual({
                "characterName": "쿠키바닐라쉐이크",
                "ability": "신특",
                "classEngrave": "축복의 오라",
                "className": "홀리나이트"
            });
            expect(jest.spyOn(abilitySettingModel, 'findOneAndUpdate'))
                .toBeCalledTimes(1);
        });
    });

    describe('deleteAbilitySetting', () => {
        it('should return true', async () => {
            const result = await abilitySettingsService.deleteAbilitySetting('name');
            expect(result).toBe(true);
            expect(jest.spyOn(abilitySettingModel, 'deleteOne'))
                .toBeCalledTimes(1);
        });
    });

    describe('parseMainAbilities', () => {
        it('should return parsed abilities', () => {
            const result = abilitySettingsService.parseMainAbilities(
                {
                    '치명': 201,
                    '특화': 1800,
                    '신속': 202,
                    '제압': 20,
                    '인내': 199,
                    '숙련': 10,
                }
            );
            expect(result).toStrictEqual('특신치');
        });
    });
});