package it.inc.org.spring.service;

import it.inc.org.spring.model.DataTableSource;
import it.inc.org.spring.model.Event;
import it.inc.org.spring.model.TypeModel;
import it.inc.org.spring.model.UserModel;

import java.util.List;
import java.util.Map;



public interface EventService {
	

    
    
	/*
	 * Eventi
	 */
	
	public boolean saveEvent(Event ev);
	
	public List<Event> getAllEvents();
	
	public List<Event> getEventList(String startdate, String endDate);
	
	public DataTableSource getEventList(Map<String,String> map);
	
	public Event getEventById(String id);
	
	public List<Event> findEvents(String startdate, String endDate, Event filter);
	
	public List<Event> getDayEvents(String startdate);
	
	void deleteEventById(String id);
	
	
	
	
	
	
	public UserModel saveUser(UserModel user);
	
	public List<UserModel> getUserList();
	
	public UserModel getUser(long id);
	
	
	public TypeModel saveType(TypeModel toSave);
	
	public List<TypeModel> getTypesList();
     
    
}
