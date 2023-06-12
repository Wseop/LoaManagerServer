import { Model } from "mongoose";
import { SetSettingsService } from "../set-settings.service";
import { SetSetting } from "../schemas/set-setting.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";

class MockSetSettingModel {
    find = jest.fn().mockResolvedValue(
        [
            {
                "characterName": "쿠키바닐라쉐이크",
                "classEngrave": "축복의 오라",
                "className": "홀리나이트",
                "set": "6갈망"
            }
        ]
    );
    findOneAndUpdate = jest.fn().mockResolvedValue(
        {
            "characterName": "쿠키바닐라쉐이크",
            "classEngrave": "축복의 오라",
            "className": "홀리나이트",
            "set": "6갈망"
        }
    );
    deleteOne = jest.fn().mockResolvedValue(true);
}

describe('SetSettingsService', () => {
    let setSettingsService: SetSettingsService;
    let setSettingModel: Model<SetSetting>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SetSettingsService,
                {
                    provide: getModelToken(SetSetting.name),
                    useClass: MockSetSettingModel
                }
            ]
        }).compile();

        setSettingsService = module.get<SetSettingsService>(SetSettingsService);
        setSettingModel = module.get<Model<SetSetting>>(getModelToken(SetSetting.name));
    });

    describe('findSetSettings', () => {
        it('should return array of SetSetting', async () => {
            const result = await setSettingsService.findSetSettings('className');
            expect(result).toStrictEqual(
                [
                    {
                        "characterName": "쿠키바닐라쉐이크",
                        "classEngrave": "축복의 오라",
                        "className": "홀리나이트",
                        "set": "6갈망"
                    }
                ]
            );
            expect(jest.spyOn(setSettingModel, 'find')).toBeCalledTimes(1);
        });
    });

    describe('upsertSetSetting', () => {
        it('should return SetSetting', async () => {
            const result = await setSettingsService.upsertSetSetting(
                {
                    "characterName": "쿠키바닐라쉐이크",
                    "classEngrave": "축복의 오라",
                    "className": "홀리나이트",
                    "set": "6갈망"
                }
            );
            expect(result).toStrictEqual(
                {
                    "characterName": "쿠키바닐라쉐이크",
                    "classEngrave": "축복의 오라",
                    "className": "홀리나이트",
                    "set": "6갈망"
                }
            );
            expect(jest.spyOn(setSettingModel, 'findOneAndUpdate')).toBeCalledTimes(1);
        });
    });

    describe('deleteSetSetting', () => {
        it('should return true', async () => {
            const result = await setSettingsService.deleteSetSetting('name');
            expect(result).toBe(true);
            expect(jest.spyOn(setSettingModel, 'deleteOne')).toBeCalledTimes(1);
        });
    });

    describe('parseSet', () => {
        it('should return string of Set', () => {
            const result = setSettingsService.parseSet(
                {
                    '무기': {
                        type: 'type',
                        name: 'name',
                        iconPath: 'icon',
                        itemGrade: 'grade',
                        itemSet: {
                            setName: '갈망',
                            setLevel: 3
                        }
                    },
                    '투구': {
                        type: 'type',
                        name: 'name',
                        iconPath: 'icon',
                        itemGrade: 'grade',
                        itemSet: {
                            setName: '갈망',
                            setLevel: 3
                        }
                    },
                    '상의': {
                        type: 'type',
                        name: 'name',
                        iconPath: 'icon',
                        itemGrade: 'grade',
                        itemSet: {
                            setName: '지배',
                            setLevel: 3
                        }
                    },
                    '하의': {
                        type: 'type',
                        name: 'name',
                        iconPath: 'icon',
                        itemGrade: 'grade',
                        itemSet: {
                            setName: '지배',
                            setLevel: 3
                        }
                    },
                    '장갑': {
                        type: 'type',
                        name: 'name',
                        iconPath: 'icon',
                        itemGrade: 'grade',
                        itemSet: {
                            setName: '악몽',
                            setLevel: 3
                        }
                    },
                    '어깨': {
                        type: 'type',
                        name: 'name',
                        iconPath: 'icon',
                        itemGrade: 'grade',
                        itemSet: {
                            setName: '악몽',
                            setLevel: 3
                        }
                    }
                }
            );
            expect(result).toBe('2악몽2지배2갈망');
        });
    });
});