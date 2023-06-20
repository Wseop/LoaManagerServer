import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ApiKeysService } from '../api-keys/api-keys.service';
import axios from 'axios';

@Injectable()
export class ApiRequestService {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async get(url: string): Promise<any> {
    try {
      return await axios.get(url, {
        headers: {
          Authorization: `bearer ${await this.apiKeysService.getApiKey()}`,
        },
      });
    } catch (error) {
      if (error.response.status === HttpStatus.SERVICE_UNAVAILABLE) {
        throw new ServiceUnavailableException(
          null,
          'Lostark api server is under maintenance',
        );
      } else if (error.response.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException();
      } else if (error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
        throw new HttpException(
          'API request limit',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      return await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${await this.apiKeysService.getApiKey()}`,
        },
      });
    } catch (error) {
      if (error.response.status === HttpStatus.SERVICE_UNAVAILABLE) {
        throw new ServiceUnavailableException(
          null,
          'Lostark api server is under maintenance',
        );
      } else if (error.response.status === HttpStatus.BAD_REQUEST) {
        throw new BadRequestException();
      } else if (error.response.status === HttpStatus.TOO_MANY_REQUESTS) {
        throw new HttpException(
          'API request limit',
          HttpStatus.TOO_MANY_REQUESTS,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
