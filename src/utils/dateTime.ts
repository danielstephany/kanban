import { format } from "date-fns";
import { toZonedTime } from 'date-fns-tz'
const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

export const displayDateAndTime = (date:string) => format(toZonedTime(date, tz), 'MM-dd-yyyy hh:mm.ss a')