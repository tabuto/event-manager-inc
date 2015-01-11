package it.inc.org.spring.dao;

import it.inc.org.spring.model.Event;

import java.util.List;

import org.hibernate.Criteria;

public class EventDaoImpl extends AbstractDao implements EventDao {

	public void saveEvent(Event event) {
        persist(event);
	}

	@SuppressWarnings("unchecked")
	public List<Event> findAllEvents() {
        Criteria criteria = getSession().createCriteria(Event.class);
        return (List<Event>) criteria.list();
	}

	public void deleteEventById(int id) {
		// TODO Auto-generated method stub

	}

	public Event findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public void updateEvent(Event event) {
		update(event);
	}

}
