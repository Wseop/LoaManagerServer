import { ApiKey } from 'src/apikey/schemas/apikey.schema';

export class MockApiKeyModel {
  datas = [{ apiKey: 'key1' }, { apiKey: 'key2' }, { apiKey: 'key3' }];

  find() {
    return this.datas;
  }
}
