import Util from './util';

//getWeekDayIndex
describe('getWeekDayIndex success', () => {
  it('sunday', () => {
    expect(Util.getWeekDayIndex("sunday"))
      .toEqual(0);
  });

  it('monday', () => {
    expect(Util.getWeekDayIndex("monday"))
      .toEqual(1);
  });

  it('tuesday', () => {
    expect(Util.getWeekDayIndex("tuesday"))
      .toEqual(2);
  });

  it('wednesday', () => {
    expect(Util.getWeekDayIndex("wednesday"))
      .toEqual(3);
  });

  it('thursday', () => {
    expect(Util.getWeekDayIndex("thursday"))
      .toEqual(4);
  });

  it('friday', () => {
    expect(Util.getWeekDayIndex("friday"))
      .toEqual(5);
  });

  it('saturday', () => {
    expect(Util.getWeekDayIndex("saturday"))
      .toEqual(6);
  });

});

describe('getWeekDayIndex failed', () => {
  it('case sensitive 1', () => {
    expect(Util.getWeekDayIndex("Sunday"))
      .toEqual(-1);
  });

  it('case sensitive 2', () => {
    expect(Util.getWeekDayIndex("suNday"))
      .toEqual(-1);
  });

});


//getDaysFromFrequency
describe('getDaysFromFrequency success', () => {
  it('weekly', () => {
    expect(Util.getDaysFromFrequency("weekly"))
      .toEqual(7);
  });

  it('fortnightly', () => {
    expect(Util.getDaysFromFrequency("fortnightly"))
      .toEqual(14);
  });

  it('monthly', () => {
    expect(Util.getDaysFromFrequency("monthly"))
      .toEqual(28);
  });
});

//getDaysFromFrequency
describe('getDaysFromFrequency failed', () => {
  it('quarterly', () => {
    expect(Util.getDaysFromFrequency("quarterly"))
      .toEqual(0);
  });

  it('week', () => {
    expect(Util.getDaysFromFrequency("week"))
      .toEqual(0);
  });

  it('year', () => {
    expect(Util.getDaysFromFrequency("year"))
      .toEqual(0);
  });

});

//getAmount
describe('getAmount success', () => {
  it('integer', () => {
    expect(Util.getAmount(123))
      .toEqual(123);
  });

  it('float', () => {
    expect(Util.getAmount(52.2))
      .toEqual(52.2);
  });

  it('float', () => {
    expect(Util.getAmount(123.456))
      .toEqual(123.5);
  });

  it('float', () => {
    expect(Util.getAmount(0.001))
      .toEqual(0.0);
  });
});

//getDateAfterDays
describe('getDateAfterDays success', () => {
  it('next day', () => {

    const testDate = new Date('2018-01-01');
    expect(Util.getDateAfterDays(testDate, 1))
      .toEqual(new Date('2018-01-02'));
  });

  it('test n day1', () => {
    const testDate = new Date('2018-01-01');
    expect(Util.getDateAfterDays(testDate, 2))
      .toEqual(new Date('2018-01-03'));
  });

  it('test n day2', () => {
    const testDate = new Date('2018-01-01');
    expect(Util.getDateAfterDays(testDate, 31))
      .toEqual(new Date('2018-02-01'));
  });
});
