package it.inc.org.spring.service;

import it.inc.org.spring.dao.EventDao;
import it.inc.org.spring.dao.TypeDao;
import it.inc.org.spring.dao.UserDao;
import it.inc.org.spring.model.DataTableSource;
import it.inc.org.spring.model.Event;
import it.inc.org.spring.model.EventFilter;
import it.inc.org.spring.model.TypeModel;
import it.inc.org.spring.model.UserModel;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("eventService")
@Transactional
public class EventServiceImpl implements EventService{
	
	@Autowired
	private EventDao eventDaoImpl;
	@Autowired
	private UserDao userDaoImpl;
	@Autowired
	private TypeDao typeDaoImpl;
	

	

	public EventDao getEventDaoImpl() {
		return eventDaoImpl;
	}

	public void setEventDaoImpl(EventDao eventDaoImpl) {
		this.eventDaoImpl = eventDaoImpl;
	}

	public UserDao getUserDaoImpl() {
		return userDaoImpl;
	}

	public void setUserDaoImpl(UserDao userDaoImpl) {
		this.userDaoImpl = userDaoImpl;
	}

	public TypeDao getTypeDaoImpl() {
		return typeDaoImpl;
	}

	public void setTypeDaoImpl(TypeDao typeDaoImpl) {
		this.typeDaoImpl = typeDaoImpl;
	}

	@Override
	public List<Event> getAllEvents() {
	
		return getEventDaoImpl().findAllEvents();
	}

	@Override
	public List<Event> getEventList(String startdate, String endDate) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Event getEventById(String id) {
		
		return getEventDaoImpl().findById(id);

	}

	@Override
	public List<Event> findEvents(String startdate, String endDate, Event filter) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteEventById(String id) {
		getEventDaoImpl().deleteEventById(id);
		
	}

	@Override
	public UserModel saveUser(UserModel user) {
		return getUserDaoImpl().saveUser(user);
	}

	@Override
	public List<UserModel> getUserList() {
		
		return getUserDaoImpl().getAllUsers();
	}

	@Override
	public UserModel getUser(long id) {
		return getUserDaoImpl().getUser(id);
	}

	@Override
	public TypeModel saveType(TypeModel toSave) {
		// TODO Auto-generated method stub
		return getTypeDaoImpl().saveType(toSave);
	}

	@Override
	public List<TypeModel> getTypesList() {
		// TODO Auto-generated method stub
		return getTypeDaoImpl().getTypeList();
	}

	@Override
	public boolean saveEvent(Event ev) {
		// TODO Auto-generated method stub
		getEventDaoImpl().saveEvent(ev);
		return true;
	}

	@Override
	public List<Event> getDayEvents(String startdate) {
		return getEventDaoImpl().eventsByDay(startdate);
	}

	@Override
	public DataTableSource getEventList(Map<String, String> map) {
		return getEventDaoImpl().eventsByFilter( new EventFilter(map));
	}



	
}
