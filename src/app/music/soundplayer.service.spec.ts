import { TestBed, inject } from '@angular/core/testing';

import { SoundplayerService } from './soundplayer.service';

describe('SoundplayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoundplayerService]
    });
  });

  it('should be created', inject([SoundplayerService], (service: SoundplayerService) => {
    expect(service).toBeTruthy();
  }));
});
