import React from 'react';
import { DayPicker } from 'react-day-picker';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';

interface MeuCalendarioProps {
  onSelectDate: (date: Date) => void;
}

export default function MyCalendar(
  {
    onSelectDate
  }: MeuCalendarioProps) {
  const [selected, setSelected] = React.useState<Date>();

  return (
    <div className="calendar-wrapper"> 
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        locale={ptBR}
        showOutsideDays
        components={{
          Chevron: ({ orientation }) => {
            return orientation === 'left' ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronRight size={20} />
            );
          },
        }}
        classNames={{
          months: 'calendar-months',
          month: 'calendar-month',
          month_caption: 'calendar-caption',
          nav: 'calendar-nav',
          button_previous: 'nav-button-prev',
          button_next: 'nav-button-next',
          weekday: 'calendar-weekday',
          day: 'calendar-day',
          selected: 'calendar-day-selected',
          outside: 'calendar-day-outside',
          today: 'calendar-day-today',
        }}
      />

      <button 
        className="calendar-fab"
        onClick={() => {
          if (selected) {
            console.log("Botão clicado", selected);

            onSelectDate(selected)
          }
        }}
      >
        <CalendarDays size={20} color="white" />
      </button>
    </div>
  );
}


