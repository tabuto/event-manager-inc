package it.inc.org.spring.dao;

import it.inc.org.spring.model.Event;

import java.util.List;

public interface EventDao {
	
    void saveEvent(Event event);
    
    List<Event> findAllEvents();
     
    void deleteEventById(int id);
     
    Event findById(int id);
     
    void updateEvent(Event event);
}
