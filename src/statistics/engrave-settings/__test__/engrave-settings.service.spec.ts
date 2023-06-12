import { Model } from "mongoose";
import { EngraveSettingsService } from "../engrave-settings.service";
import { EngraveSetting } from "../schemas/engrave-setting.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";

class MockEngraveSettingModel {
    find = jest.fn().mockResolvedValue(
        [
            {
                "characterName": "쿠키바닐라밀크쉐이크",
                "classEngrave": "광전사의 비기",
                "className": "버서커",
                "engraves": [
                    {
                        "engraveName": "돌격대장",
                        "engraveLevel": 3
                    },
                    {
                        "engraveName": "원한",
                        "engraveLevel": 3
                    },
                    {
                        "engraveName": "예리한 둔기",
                        "engraveLevel": 3
                    },
                    {
                        "engraveName": "광전사의 비기",
                        "engraveLevel": 3
                    },
                    {
                        "engraveName": "기습의 대가",
                        "engraveLevel": 3
                    },
                    {
                        "engraveName": "에테르 포식자",
                        "engraveLevel": 1
                    }
                ]
            }
        ]
    );
    findOneAndUpdate = jest.fn().mockResolvedValue(
        {
            "characterName": "쿠키바닐라밀크쉐이크",
            "classEngrave": "광전사의 비기",
            "className": "버서커",
            "engraves": [
                {
                    "engraveName": "돌격대장",
                    "engraveLevel": 3
                },
                {
                    "engraveName": "원한",
                    "engraveLevel": 3
                },
                {
                    "engraveName": "예리한 둔기",
                    "engraveLevel": 3
                },
                {
                    "engraveName": "광전사의 비기",
                    "engraveLevel": 3
                },
                {
                    "engraveName": "기습의 대가",
                    "engraveLevel": 3
                },
                {
                    "engraveName": "에테르 포식자",
                    "engraveLevel": 1
                }
            ]
        }
    );
    deleteOne = jest.fn().mockResolvedValue(true);
}

describe('EngraveSettingsService', () => {
    let engraveSettingsService: EngraveSettingsService;
    let engraveSettingModel: Model<EngraveSetting>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EngraveSettingsService,
                {
                    provide: getModelToken(EngraveSetting.name),
                    useClass: MockEngraveSettingModel
                }
            ]
        }).compile();

        engraveSettingsService =
            module.get<EngraveSettingsService>(EngraveSettingsService);
        engraveSettingModel =
            module.get<Model<EngraveSetting>>(getModelToken(EngraveSetting.name));
    });

    describe('findEngraveSettings', () => {
        it('should return array of EngraveSetting', async () => {
            const result = await engraveSettingsService.findEngraveSettings('className');
            expect(result).toStrictEqual(
                [
                    {
                        "characterName": "쿠키바닐라밀크쉐이크",
                        "classEngrave": "광전사의 비기",
                        "className": "버서커",
                        "engraves": [
                            {
                                "engraveName": "돌격대장",
                                "engraveLevel": 3
                            },
                            {
                                "engraveName": "원한",
                                "engraveLevel": 3
                            },
                            {
                                "engraveName": "예리한 둔기",
                                "engraveLevel": 3
                            },
                            {
                                "engraveName": "광전사의 비기",
                                "engraveLevel": 3
                            },
                            {
                                "engraveName": "기습의 대가",
                                "engraveLevel": 3
                            },
                            {
                                "engraveName": "에테르 포식자",
                                "engraveLevel": 1
                            }
                        ]
                    }
                ]
            );
            expect(jest.spyOn(engraveSettingModel, 'find')).toBeCalledTimes(1);
        });
    });

    describe('upsertEngraveSetting', () => {
        it('should return an EngraveSetting', async () => {
            const result = await engraveSettingsService.upsertEngraveSetting(
                {
                    "characterName": "쿠키바닐라밀크쉐이크",
                    "classEngrave": "광전사의 비기",
                    "className": "버서커",
                    "engraves": [
                        {
                            "engraveName": "돌격대장",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "원한",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "예리한 둔기",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "광전사의 비기",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "기습의 대가",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "에테르 포식자",
                            "engraveLevel": 1
                        }
                    ]
                });
            expect(result).toStrictEqual(
                {
                    "characterName": "쿠키바닐라밀크쉐이크",
                    "classEngrave": "광전사의 비기",
                    "className": "버서커",
                    "engraves": [
                        {
                            "engraveName": "돌격대장",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "원한",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "예리한 둔기",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "광전사의 비기",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "기습의 대가",
                            "engraveLevel": 3
                        },
                        {
                            "engraveName": "에테르 포식자",
                            "engraveLevel": 1
                        }
                    ]
                }
            )
            expect(jest.spyOn(engraveSettingModel, 'findOneAndUpdate')).toBeCalledTimes(1);
        });
    });

    describe('deleteEngraveSetting', () => {
        it('should return true', async () => {
            const result = await engraveSettingsService.deleteEngraveSetting('name');
            expect(result).toBe(true);
            expect(jest.spyOn(engraveSettingModel, 'deleteOne')).toBeCalledTimes(1);
        });
    });
});