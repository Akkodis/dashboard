import { differenceInDays, startOfMonth } from 'date-fns';

export function getElapsedDaysOfCurrentMonth() {
    const today = new Date();
    const startOfMonthDate = startOfMonth(today);
    return differenceInDays(today, startOfMonthDate);
}