package it.inc.org.spring.service;

import it.inc.org.spring.model.Event;

import java.util.List;

public interface EventService {
	
    void saveEvent(Event event);
    
    List<Event> findAllEvents();
     
    void deleteEventById(int id);
     
    Event findById(int id);
     
    void updateEvent(Event event);
}
