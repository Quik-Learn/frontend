// utils/auth.ts
export function isProtectedRoute(pathname: string) {
  const authRegex = /^\/auth\/.*/; // Match any path that starts with /auth/
  return !authRegex.test(pathname); // Return true if it's a protected route, false for auth paths
}
export const timeAgo = (dateString: string) => {
  const date: any = new Date(dateString);
  const now: any = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000, // seconds in a year
    month: 2592000, // seconds in a month (30 days)
    week: 604800, // seconds in a week
    day: 86400, // seconds in a day
    hour: 3600, // seconds in an hour
    minute: 60, // seconds in a minute
    second: 1, // seconds
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${unit}${interval !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};
export function formatToDateString(isoString: any): string {
  const date = new Date(isoString); // Parse ISO string to Date object
  const year = date.getFullYear(); // Get the full year
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad to 2 digits
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad to 2 digits
  console.log(`${year}-${month}-${day}`);
  return `${year}-${month}-${day}`; // Return in 'YYYY-MM-DD' format
}
export function convertTimeAndAddOneHour(timeString: any): {
  originalTime: string;
  oneHourLater: string;
} {
  // Extract the hour and period (am/pm) from the input
  const timePattern = /(\d+)(am|pm)/i;
  const match = timeString.match(timePattern);

  if (!match) {
    throw new Error('Invalid time format');
  }

  let hour = parseInt(match[1], 10); // Convert the hour part to a number
  const period = match[2].toLowerCase(); // Get am or pm

  // Adjust for 12-hour clock to 24-hour format
  if (period === 'pm' && hour !== 12) {
    hour += 12; // PM hours are 12+ for 24-hour time
  } else if (period === 'am' && hour === 12) {
    hour = 0; // 12am is 00:00 in 24-hour time
  }

  // Format hour to 2 digits
  const formattedHour = String(hour).padStart(2, '0');
  const oneHourLater = String((hour + 1) % 24).padStart(2, '0'); // Get the next hour, wrap at 24 for 24-hour format

  // Return the times with 'hh:mm:ss' format
  return {
    originalTime: `${formattedHour}:00:00`,
    oneHourLater: `${oneHourLater}:00:00`,
  };
}
export const convertTo12HourFormatt = (time24: string) => {
  const [hour, minute] = time24?.split(':');
  const hourNumber = parseInt(hour, 10);
  const ampm = hourNumber >= 12 ? 'pm' : 'am';
  const hour12 = hourNumber % 12 || 12;
  return `${hour12}${ampm}`;
};

const convertToFullDate = (time: any, date: any) => {
  // Combine date and time into an ISO string
  const dateTimeString = `${date}T${time}`;

  // Create a new Date object
  const fullDate = new Date(dateTimeString);

  return fullDate;
};

export const formatData = (data: any) => {
  return (
    data ||
    []?.map((item: any) => {
      const formattedStartTime = convertToFullDate(item.start_time, item.date);
      const formattedEndTime = convertToFullDate(item.end_time, item.date);

      // Combine date with 23:00:00 and append Z for UTC
      const formattedDate = `${item.date}T23:00:00.000Z`;
      console.log(formattedStartTime);
      return {
        desc: item?.title,
        start: formattedStartTime,
        end: formattedEndTime,
        date: formattedDate,
        instructor: item?.instructor,
        id: item?.id,
        subject: item?.subject,
        meeting_link: item?.meeting_link,
      };
    })
  );
};
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
export const getRandomSoftColor = () => {
  const getRandomValue = () => Math.floor(Math.random() * 56) + 200; // Values between 200 and 255
  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();

  return `rgb(${r}, ${g}, ${b})`;
};
export function convertTo12HourFormat(dateString: string) {
  // Create a Date object from the date string
  const date = new Date(dateString);

  // Format the time to 12-hour format
  const options: any = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options);
}
export function getTimeFromToday(dateString: any) {
  // Create a Date object from the date string
  const inputDate = new Date(dateString);

  // Get the current date and time
  const now = new Date();

  // Set the current date's time to midnight to compare only the time
  now.setHours(0, 0, 0, 0);

  // If the input date is today, get the hours and minutes
  if (inputDate.setHours(0, 0, 0, 0) === now.getTime()) {
    const hours = inputDate.getHours().toString().padStart(2, '0'); // Add leading zero
    const minutes = inputDate.getMinutes().toString().padStart(2, '0'); // Add leading zero
    return `${hours}:${minutes}`; // Format as "HH:mm"
  }

  return null; // Return null if the date is not today
}
export const addRandomColorsToEvents: any = (events: any) => {
  return events?.map((event: any) => ({
    ...event,
    color: getRandomColor(),
  }));
};
export const addRandomSoftColorsToEvents: any = (data: any) => {
  return data?.map((item: any) => ({
    ...item,
    color: getRandomSoftColor(),
  }));
};

export const eventStyleGetter = (event: any) => {
  console.log(event);
  const backgroundColor = event.color || 'blue';
  const style = {
    backgroundColor,
    borderRadius: '5px',
    color: 'white',
    display: 'block',
    padding: '5px',
  };
  return {
    style,
  };
};
export const customDayPropGetter = (date: any) => {
  if (date.getDay() === 6 || date.getDay() === 0) {
    return {
      style: {
        border: '',
      },
    };
  }
  return {};
};
export const customSlotPropGetter = (date: any) => {
  return {
    style: {
      border: 'none',
      borderWidth: '0px',
      borderColor: 'transparent',
    },
  };
};
