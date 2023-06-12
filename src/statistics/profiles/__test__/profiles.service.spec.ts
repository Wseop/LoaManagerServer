import { Model } from "mongoose";
import { ProfilesService } from "../profiles.service";
import { Profile } from "../schemas/profile.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";

class MockProfileModel {
    find = jest.fn().mockResolvedValue(
        [
            {
                "characterName": "쿠키바닐라쉐이크",
                "className": "홀리나이트",
                "itemLevel": 1621.67
            }
        ]
    );
    findOne = jest.fn().mockResolvedValue(
        {
            "characterName": "쿠키바닐라쉐이크",
            "className": "홀리나이트",
            "itemLevel": 1621.67
        }
    );
    findOneAndUpdate = jest.fn().mockResolvedValue(
        {
            "characterName": "쿠키바닐라쉐이크",
            "className": "홀리나이트",
            "itemLevel": 1621.67
        }
    );
    deleteOne = jest.fn().mockResolvedValue(true);
}

describe('ProfilesService', () => {
    let profilesService: ProfilesService;
    let profileModel: Model<Profile>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProfilesService,
                {
                    provide: getModelToken(Profile.name),
                    useClass: MockProfileModel
                }
            ]
        }).compile();

        profilesService = module.get<ProfilesService>(ProfilesService);
        profileModel = module.get<Model<Profile>>(getModelToken(Profile.name));
    });

    describe('findProfiles', () => {
        it('should return array of Profile', async () => {
            const result = await profilesService.findProfiles();
            expect(result).toStrictEqual(
                [
                    {
                        "characterName": "쿠키바닐라쉐이크",
                        "className": "홀리나이트",
                        "itemLevel": 1621.67
                    }
                ]
            )
            expect(jest.spyOn(profileModel, 'find')).toBeCalledTimes(1);
        });
    });

    describe('findProfileByName', () => {
        it('should return a Profile', async () => {
            const result = await profilesService.findProfileByName('name');
            expect(result).toStrictEqual(
                {
                    "characterName": "쿠키바닐라쉐이크",
                    "className": "홀리나이트",
                    "itemLevel": 1621.67
                }
            )
            expect(jest.spyOn(profileModel, 'findOne')).toBeCalledTimes(1);
        });
    });

    describe('findProfilesByClassName', () => {
        it('should return array of Profile', async () => {
            const result = await profilesService.findProfilesByClassName('class');
            expect(result).toStrictEqual(
                [
                    {
                        "characterName": "쿠키바닐라쉐이크",
                        "className": "홀리나이트",
                        "itemLevel": 1621.67
                    }
                ]
            )
            expect(jest.spyOn(profileModel, 'find')).toBeCalledTimes(1);
        });
    });

    describe('upsertProfile', () => {
        it('should return Profile', async () => {
            const result = await profilesService.upsertProfile(
                {
                    "characterName": "쿠키바닐라쉐이크",
                    "className": "홀리나이트",
                    "itemLevel": 1621.67
                }
            );
            expect(result).toStrictEqual(
                {
                    "characterName": "쿠키바닐라쉐이크",
                    "className": "홀리나이트",
                    "itemLevel": 1621.67
                }
            );
            expect(jest.spyOn(profileModel, 'findOneAndUpdate')).toBeCalledTimes(1);
        });
    });

    describe('deleteProfile', () => {
        it('should return true', async () => {
            const result = await profilesService.deleteProfile('name');
            expect(result).toBe(true);
            expect(jest.spyOn(profileModel, 'deleteOne')).toBeCalledTimes(1);
        });
    });
});