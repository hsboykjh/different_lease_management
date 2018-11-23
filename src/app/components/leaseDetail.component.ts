import {Component, OnInit} from '@angular/core';
import Util from "../utils/util";
import {ActivatedRoute, Router} from "@angular/router";
import {LeaseService} from "../services/lease.service";
import leaseDetail from "../interefaces/leaseDetail";
import lease from "../interefaces/lease";

@Component({
  selector: 'app-lease-detail',
  styleUrls: ['leaseDetail.component.css'],
  templateUrl: 'leaseDetail.component.html'
})

export class LeaseDetailComponent implements OnInit {

  // public leaseInfo: leaseDetail;
  public leaseList: Array<lease> = [];

  constructor(private router: Router, private route: ActivatedRoute, private leaseService: LeaseService) {
  }

  ngOnInit(){
    const queryString = Util.parseQueryString(this.route.snapshot.queryParamMap);
    console.log("queryParamMap : ", this.route.snapshot.queryParamMap);
    console.log("queryString : ", queryString);

    if(queryString['leaseId']){
      //queryString has leaseId
      this.initLeaseDetail(queryString['leaseId']);
    }else{
      console.error("queryString error : leaseId does not exist");
      alert("You should put the site url like this : ex) URL/lease?leaseId=123");
    }
  }

  initLeaseDetail(leaseId){
    //call leaseService to fetch lease data with leaseId
    this.leaseService.getLease(leaseId).subscribe(
      leaseDetail => {
        console.log("getLease success : ", leaseDetail);
        // this.leaseInfo = leaseDetail;
        this.setLeaseList(leaseDetail);
      },
      error => {
        console.log("getLease error : ", error);
      },
      () => {
        console.log("getLease completed");
      }
    );
  }

  setLeaseList(leaseDetail: leaseDetail){
    const frequencyDays = Util.getDaysFromFrequency(leaseDetail.frequency);
    const paymentDayIndex = Util.getWeekDayIndex(leaseDetail.payment_day);
    const startDate = new Date(leaseDetail.start_date);
    const endDate = new Date(leaseDetail.end_date);

    console.log("frequencyDays : ", frequencyDays);
    console.log("paymentDayIndex : ", paymentDayIndex);
    console.log(`startDate : ${startDate} (${startDate.getDay()}) `);
    console.log(`endDate : ${endDate} (${endDate.getDay()}) `);

    //find first payment Date
    const dateGap = (startDate.getDay() <= paymentDayIndex)?(paymentDayIndex - startDate.getDay()):(paymentDayIndex + ( 7 -  startDate.getDay()));

    let toDate = Util.getDateAfterDays(startDate, dateGap);
    let fromDate = startDate;

    //create firstLease info
    const firstLease: lease = {
      from : fromDate,
      to : toDate,
      days : dateGap + 1,
      amount : Util.getAmount(leaseDetail.rent/7 * (dateGap  + 1))
    };

    //check start time is before endDate
    if(toDate.getTime() <= endDate.getTime()){
      //add new lease info
      this.leaseList.push(firstLease);

      fromDate = Util.getDateAfterDays(toDate, 1);
      toDate = Util.getDateAfterDays(toDate, frequencyDays);

      //make leaseList
      while(fromDate.getTime() <= endDate.getTime()){

        let newLease: lease;
        //full frequency days case
        if(toDate.getTime() <= endDate.getTime()){
          newLease = {
            from : fromDate,
            to : toDate,
            days : frequencyDays,
            amount : Util.getAmount(leaseDetail.rent * frequencyDays / 7)
          };
        }else{
          //Not full frequency days case : calculate endDate
          const leftDays = Math.round((endDate.getTime()-fromDate.getTime())/(1000*60*60*24)) + 1;

          newLease = {
            from : fromDate,
            to : endDate,
            days : leftDays,
            amount : Util.getAmount(leaseDetail.rent/7 * leftDays)
          };
        }

        //add new lease info
        this.leaseList.push(newLease);

        //set next StartDate
        fromDate = Util.getDateAfterDays(newLease.to, 1);
        //set next endDate : StartDate + frequencyDays
        toDate = Util.getDateAfterDays(newLease.to, frequencyDays);
      }
    }else{
      //check start time is later than endDate : No payment
      console.error("First date is later than endDate : ", toDate, endDate);
    }

    console.log("leaseList : ", this.leaseList);
  }
}
