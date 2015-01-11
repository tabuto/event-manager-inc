package it.inc.org.spring.service;

import it.inc.org.spring.dao.EventDao;
import it.inc.org.spring.model.Event;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("eventService")
@Transactional
public class EventServiceImpl implements EventService{
	
	@Autowired
	private EventDao dao;

	public void saveEvent(Event event) {
		dao.saveEvent(event);
	}

	public List<Event> findAllEvents() {
		return dao.findAllEvents();
	}

	public void deleteEventById(int id) {
		dao.deleteEventById(id);
	}

	public Event findById(int id) {
		return dao.findById(id);
	}

	public void updateEvent(Event event) {
		dao.updateEvent(event);
	}

}
