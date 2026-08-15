import React from 'react';
import { Trash2 } from 'lucide-react';

interface Evento {
  description: string;
  date: string;
}

interface EventsListProps {
  events: Evento[];
  onDelete: (index: number) => void; 
}

export default function EventsList({ events, onDelete }: EventsListProps) {
  return (
    <div className="events-container">
      <h3 className="events-title">EVENTOS</h3>

      <div className="events-list">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <div className="event-content">
                <p className="event-text">{event.description}</p>

              <div className="event-info-right">
                    <span className="event-date">
                      {new Date(event.date + "T00:00:00").toLocaleDateString('pt-BR')}
                    </span>
                    
                    <button 
                        className="delete-btn" 
                        onClick={() => onDelete(index)}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}