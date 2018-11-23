import { TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LeaseService } from './lease.service';
import {environment} from "../../environments/environment";

describe(`LeaseService`, () => {

  beforeEach(() => {
    // 0. set up the test environment
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        LeaseService
      ]
    });
  });

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('expects service to fetch data with leaseId',
    inject([HttpTestingController, LeaseService],
      (httpMock: HttpTestingController, leaseService: LeaseService) => {
        //call the service
        const leaseId = '123';
        leaseService.getLease(leaseId).subscribe(data => {
          expect(data.id).toBe(leaseId);
          expect(data.frequency).toBe('weekly');
          expect(data.rent).toBe(520);
          expect(data.payment_day).toBe('friday');
          expect(data.start_date).toBe('2018-07-12');
          expect(data.end_date).toBe('2018-11-17');
        });
        //set the expectations for the HttpClient mock
        const req = httpMock.expectOne(environment.leaseService.base_url + '/'  + leaseId);
        expect(req.request.method).toEqual('GET');

        //set the fake data to be returned by the mock
        req.flush({
          id: leaseId,
          frequency: 'weekly',
          rent: 520,
          payment_day: 'friday',
          start_date: '2018-07-12',
          end_date: '2018-11-17'
        });
      })
  );
});
