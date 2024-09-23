export const TimeAgoDate = (dt: string):string => {
    const inputDate: number = new Date(dt).getTime();
    const span: number = Date.now() - inputDate
    const days: number = Math.floor(span / (1000 * 60 * 60 * 24));
    const hours: number = Math.floor((span % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes: number = Math.floor((span % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((span % (1000 * 60)) / 1000);

    if (days > 365) {
        const years: number = Math.floor(days / 365) + (days % 365 !== 0 ? 1 : 0);
        return `حدود ${years} سال پیش`;
    }
    if (days > 30) {
        const months: number = Math.floor(days / 30) + (days % 31 !== 0 ? 1 : 0);
        return `حدود ${months} ماه پیش`;
    }
    if (days > 0) {
        return `حدود ${days} روز پیش`;
    }
    if (hours > 0) {
        return `حدود ${hours} ساعت پیش`;
    }
    if (minutes > 0) {
        return `حدود ${minutes} دقیقه پیش`;
    }
    if (seconds > 5) {
        return `حدود ${seconds} ثانیه پیش`;
    }
    if (seconds <= 5) {
        return "همین الان";
    }
    return '';
};
