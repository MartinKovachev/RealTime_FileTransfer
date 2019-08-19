import { TestBed } from '@angular/core/testing';

import { FilesTransferService } from './files-transfer.service';

describe('FilesTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilesTransferService = TestBed.get(FilesTransferService);
    expect(service).toBeTruthy();
  });
});
