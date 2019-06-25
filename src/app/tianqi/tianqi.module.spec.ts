import { TianqiModule } from './tianqi.module';

describe('TianqiModule', () => {
  let tianqiModule: TianqiModule;

  beforeEach(() => {
    tianqiModule = new TianqiModule();
  });

  it('should create an instance', () => {
    expect(tianqiModule).toBeTruthy();
  });
});
