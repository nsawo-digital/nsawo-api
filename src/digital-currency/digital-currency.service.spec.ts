import { Test, TestingModule } from '@nestjs/testing';
import { DigitalCurrencyService } from './digital-currency.service';

describe('DigitalCurrencyService', () => {
  let service: DigitalCurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitalCurrencyService],
    }).compile();

    service = module.get<DigitalCurrencyService>(DigitalCurrencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
