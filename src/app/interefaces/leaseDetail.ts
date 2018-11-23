export default interface lease {
  id : string,
  frequency : string, //weekly | fortnightly | monthly
  rent : number,
  payment_day : string, //monday | tuesday | wednesday | thursday | friday
  start_date : string,
  end_date : string
}
