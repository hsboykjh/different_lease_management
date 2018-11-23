export default class Util {

  static parseQueryString(query){
    //ParamMap has params
    //if queryString is empty, ParamMap's params is {}
    return query.params;
  }

  static getWeekDayIndex(dayString): number{

    const weekday = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];

    return weekday.indexOf(dayString);
  }

  //return number of days for frequency : weekly , fortnightly , monthly
  static getDaysFromFrequency(frequency): number{

    if(frequency === 'weekly'){
      return 7;
    }else if(frequency === 'fortnightly'){ //2 weeks
      return 14;
    }else if(frequency === 'monthly'){ //4 weeks
      return 28;
    }else{
      //invalid case
      return 0;
    }
  }

  //get Amount of price: integer case or float case
  static getAmount(price){

    //integer
    if(price % 1 ===0){
      return price;
    }else{
      //float case
      return Number(price.toFixed(1));
    }
  }

  //get dstDate(Date type) after n days from oriDate
  static getDateAfterDays(oriDate, days): Date {
    let dstDate = new Date(oriDate);
    dstDate.setDate(oriDate.getDate() + days);

    return dstDate;
  }
}
