import {
  parse,
  eachWeekOfInterval,
  eachMonthOfInterval,
  isSameDay,
  isSameWeek,
  isSameMonth,
} from "date-fns";

export const processEntries = (entries) => {
  // Initialize total accumulators
  let dailyTotalElectricity = 0;
  let dailyTotalGas = 0;
  let weeklyTotalElectricity = 0;
  let weeklyTotalGas = 0;
  let monthlyTotalElectricity = 0;
  let monthlyTotalGas = 0;

  // Initialize structures for chart data
  let weeklyChartData = [];
  let monthlyChartData = [];

  if (!entries || entries.length === 0) {
    return {
      dailyTotalElectricity,
      dailyTotalGas,
      weeklyTotalElectricity,
      weeklyTotalGas,
      monthlyTotalElectricity,
      monthlyTotalGas,
      weeklyChartData,
      monthlyChartData,
    };
  }

  const firstEntryDate = entries[0].date
    ? parse(entries[0].date, "d MMMM yyyy", new Date())
    : new Date();
  const lastEntryDate = entries[entries.length - 1].date
    ? parse(entries[entries.length - 1].date, "d MMMM yyyy", new Date())
    : new Date();

  const weeks = eachWeekOfInterval({
    start: firstEntryDate,
    end: lastEntryDate,
  });
  const months = eachMonthOfInterval({
    start: firstEntryDate,
    end: lastEntryDate,
  });

  // Prepare the chart data structure
  weeks.forEach((week) => {
    weeklyChartData.push({ week: week, electricity: 0, gas: 0 });
  });
  months.forEach((month) => {
    monthlyChartData.push({ month: month, electricity: 0, gas: 0 });
  });

  // Process each entry
  entries.forEach((entry) => {
    const entryDate = parse(entry.date, "d MMMM yyyy", new Date());

    // Daily totals for today
    if (isSameDay(entryDate, new Date())) {
      dailyTotalElectricity += entry.electricityCost;
      dailyTotalGas += entry.gasCost;
    }

    // Weekly totals and chart data
    weeklyChartData.forEach((dataPoint) => {
      if (isSameWeek(entryDate, dataPoint.week)) {
        dataPoint.electricity += entry.electricityCost;
        dataPoint.gas += entry.gasCost;
        weeklyTotalElectricity += entry.electricityCost;
        weeklyTotalGas += entry.gasCost;
      }
    });

    // Monthly totals and chart data
    monthlyChartData.forEach((dataPoint) => {
      if (isSameMonth(entryDate, dataPoint.month)) {
        dataPoint.electricity += entry.electricityCost;
        dataPoint.gas += entry.gasCost;
        monthlyTotalElectricity += entry.electricityCost;
        monthlyTotalGas += entry.gasCost;
      }
    });
  });

  return {
    dailyTotalElectricity,
    dailyTotalGas,
    weeklyTotalElectricity,
    weeklyTotalGas,
    monthlyTotalElectricity,
    monthlyTotalGas,
    weeklyChartData,
    monthlyChartData,
  };
};
