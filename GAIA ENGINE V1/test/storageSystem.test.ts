import { StorageSystem } from '../src/storageSystem';
import * as fs from 'fs';

describe('StorageSystem', () => {
  const testPath = './GAIA ENGINE V1/test/tmp';
  const key = 'testdata';
  const data = { foo: 'bar' };

  beforeAll(() => {
    if (!fs.existsSync(testPath)) fs.mkdirSync(testPath, { recursive: true });
  });

  afterAll(() => {
    const file = `${testPath}/${key}.json`;
    if (fs.existsSync(file)) fs.unlinkSync(file);
    if (fs.existsSync(testPath)) fs.rmdirSync(testPath);
  });

  it('should save and load data locally', async () => {
    const storage = new StorageSystem({ type: 'local', path: testPath });
    await storage.save(key, data);
    const loaded = await storage.load(key);
    expect(loaded).toEqual(data);
  });
});
