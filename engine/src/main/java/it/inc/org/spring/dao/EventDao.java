package it.inc.org.spring.dao;

import it.inc.org.spring.model.DataTableSource;
import it.inc.org.spring.model.Event;
import it.inc.org.spring.model.EventFilter;

import java.util.List;

public interface EventDao {
	
    void saveEvent(Event event);
    
    List<Event> findAllEvents();
    
    List<Event> eventsByDay(String today);
    
    DataTableSource eventsByFilter(EventFilter filter);
    
    void deleteEventById(String id);
     
    Event findById(String id);
     
    void updateEvent(Event event);

    
}
