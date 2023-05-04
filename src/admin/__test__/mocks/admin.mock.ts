import { Admin } from 'src/admin/schemas/admin.schema';

export class MockAdminModel {
  datas: Admin[] = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' },
    { key: 'key3', value: 'value3' },
  ];

  find() {
    return this.datas;
  }

  findOne({ key }) {
    return this.datas.find((data) => data.key === key);
  }
}
