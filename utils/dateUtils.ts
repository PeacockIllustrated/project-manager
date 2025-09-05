
export const getMonthCalendarDays = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days: Date[] = [];
    let currentDate = new Date(startDate);
    
    while(currentDate <= endDate) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
};

export const getWeekDays = (date: Date): Date[] => {
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(day.getDate() + i);
        days.push(day);
    }
    return days;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
};

export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
};

export const shortDayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
export const monthYearFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
