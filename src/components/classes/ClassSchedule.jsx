import React from 'react';
import { useTranslation } from 'react-i18next';

const scheduleData = [
  // Monday
  { name: 'Strong Mama', day: 'Mon', startTime: '10:30', endTime: '11:30' },
  { name: 'Strength & Conditioning', day: 'Mon', startTime: '12:00', endTime: '13:00' },
  { name: 'Strength & Conditioning', day: 'Mon', startTime: '17:30', endTime: '18:30' },
  // Tuesday
  { name: 'Strength & Conditioning', day: 'Tue', startTime: '06:30', endTime: '07:15' },
  { name: 'Plus Power', day: 'Tue', startTime: '10:00', endTime: '11:00' },
  { name: 'Strength & Conditioning', day: 'Tue', startTime: '12:00', endTime: '13:00' },
  { name: 'Youth Class', day: 'Tue', startTime: '16:00', endTime: '16:50' },
  { name: 'Strength & Conditioning', day: 'Tue', startTime: '17:30', endTime: '18:30' },
  // Wednesday
  { name: 'Strength & Conditioning', day: 'Wed', startTime: '12:00', endTime: '13:00' },
  { name: 'Strength & Conditioning', day: 'Wed', startTime: '17:30', endTime: '18:30' },
  // Thursday
  { name: 'Strength & Conditioning', day: 'Thu', startTime: '06:30', endTime: '07:15' },
  { name: 'Plus Power', day: 'Thu', startTime: '10:00', endTime: '11:00' },
  { name: 'Strength & Conditioning', day: 'Thu', startTime: '12:00', endTime: '13:00' },
  { name: 'Youth Class', day: 'Thu', startTime: '16:00', endTime: '16:50' },
  { name: 'Strength & Conditioning', day: 'Thu', startTime: '17:30', endTime: '18:30' },
  // Friday
  { name: 'Strength & Conditioning', day: 'Fri', startTime: '11:30', endTime: '12:15' },
  { name: 'Strength & Conditioning', day: 'Fri', startTime: '12:15', endTime: '13:00' },
  // Saturday
  { name: 'Movement', day: 'Sat', startTime: '08:45', endTime: '09:45' },
  { name: 'Strength & Conditioning', day: 'Sat', startTime: '10:00', endTime: '11:00' },
  { name: 'Strength & Conditioning', day: 'Sat', startTime: '11:00', endTime: '12:00' },
  // Sunday
  { name: 'Funky Monkeys', day: 'Sun', startTime: '10:00', endTime: '10:50' },
];

const dayKeys = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getClassesForDay = (day) =>
  scheduleData
    .filter((item) => item.day === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

const getClassStyles = (className) => {
  if (!className) return 'bg-white';
  const lower = className.toLowerCase();
  if (lower.includes('strength')) return 'bg-gray-200 text-gray-800';
  if (lower.includes('movement')) return 'bg-gray-300 text-gray-800';
  if (lower.includes('mama')) return 'bg-gray-400 text-gray-900';
  if (lower.includes('plus power')) return 'bg-gray-500 text-white';
  if (lower.includes('funky monkeys') || lower.includes('youth class')) return 'bg-gray-600 text-white';
  return 'bg-gray-100';
};

const ClassSchedule = () => {
  const { t } = useTranslation();
  const schedule = t('class_schedule', { returnObjects: true });

  const scheduleStartHour = 6;
  const scheduleEndHour = 21;
  const intervalMinutes = 15;
  const timeLabelIntervalMinutes = 60; // Show a label every 60 minutes

  // Generate a list of time slots for the schedule's vertical axis
  const timeMarkers = [];
  for (let hour = scheduleStartHour; hour < scheduleEndHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervalMinutes) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeMarkers.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  // Helper function to convert a time string to a grid row index
  const timeToGridRow = (timeStr) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    const totalMinutes = (hour - scheduleStartHour) * 60 + minute;
    return Math.floor(totalMinutes / intervalMinutes) + 2; // +2 for header row
  };

  const getDisplayName = (name, isShort = false) => {
    if (name === 'Strength & Conditioning' && isShort) {
      return schedule.class_names['Strength & Conditioning_short'];
    }

    return schedule.class_names[name] || name;
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">{schedule.title}</h2>
          <p className="mt-3 text-lg text-gray-600">{schedule.subtitle}</p>
        </div>
        <div className="space-y-4 md:hidden">
          {dayKeys.map((dayKey, dayIndex) => {
            const classes = getClassesForDay(dayKey);

            return (
              <section key={dayKey} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h3 className="text-left text-lg font-bold text-gray-900">{schedule.days[dayIndex]}</h3>
                <div className="mt-3 space-y-3">
                  {classes.map((item) => (
                    <div key={`${item.day}-${item.startTime}-${item.name}`} className="flex items-start gap-3 rounded-md bg-gray-50 p-3">
                      <div className="w-24 shrink-0 text-left text-sm font-semibold text-gray-800">
                        {item.startTime}-{item.endTime}
                      </div>
                      <div className="text-left text-sm font-medium text-gray-700">
                        {getDisplayName(item.name)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="hidden overflow-hidden rounded-lg bg-white shadow-lg md:block">
          <div
            className="grid grid-cols-8"
            style={{ gridTemplateRows: `auto repeat(${timeMarkers.length}, minmax(1.25rem, auto))` }}
          >
            {/* Header: Time */}
            <div className="col-start-1 row-start-1 p-2 bg-gray-800 text-white font-semibold text-xs text-center sticky top-0 z-10">{t('Time')}</div>
            {/* Header: Days */}
            {schedule.days.map((day, i) => (
              <div key={day} style={{ gridColumn: i + 2, gridRow: 1 }} className="p-2 bg-gray-800 text-white font-semibold text-xs text-center sticky top-0 z-10">{day}</div>
            ))}

            {/* Time Gutter */}
            {timeMarkers.map((time, index) => {
              const minute = parseInt(time.substring(3), 10);
              if (minute % timeLabelIntervalMinutes === 0) {
                return (
                  <div 
                    key={time} 
                    style={{ 
                      gridRow: index + 2, 
                      gridColumn: 1, 
                      gridRowEnd: `span ${timeLabelIntervalMinutes / intervalMinutes}` 
                    }} 
                    className="p-1 text-xs text-right text-gray-500 border-r border-t border-gray-200 flex items-start justify-end"
                  >
                    <strong>{time}</strong>
                  </div>
                );
              }
              return null;
            })}

            {/* Day Gutters with horizontal lines */}
            {dayKeys.map((_, dayIndex) => (
                timeMarkers.map((__, rowIndex) => (
                    <div key={`${dayIndex}-${rowIndex}`} style={{gridColumn: dayIndex + 2, gridRow: rowIndex + 2}} className="border-b border-r border-gray-100"></div>
                ))
            ))}

            {/* Classes */}
            {scheduleData.map((item, index) => {
              const [startH, startM] = item.startTime.split(':').map(Number);
              const [endH, endM] = item.endTime.split(':').map(Number);
              const duration = (endH * 60 + endM) - (startH * 60 + startM);
              const numRows = Math.ceil(duration / intervalMinutes);

              const rowStart = timeToGridRow(item.startTime);
              const rowEnd = rowStart + numRows;
              const colStart = dayKeys.indexOf(item.day) + 2;

              return (
                <div
                  key={index}
                  className={`m-0.5 p-1 rounded text-xs font-bold flex justify-center items-center text-center shadow-sm ${getClassStyles(item.name)}`}
                  style={{ gridColumn: colStart, gridRow: `${rowStart} / ${rowEnd}` }}
                >
                  {item.name === 'Strength & Conditioning' ? (
                    <>
                      <span>{getDisplayName(item.name)}</span>
                    </>
                  ) : (
                    getDisplayName(item.name)
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;
