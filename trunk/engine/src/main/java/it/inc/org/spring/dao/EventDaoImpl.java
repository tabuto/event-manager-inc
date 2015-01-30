package it.inc.org.spring.dao;

import it.inc.org.spring.model.DataTableSource;
import it.inc.org.spring.model.Event;
import it.inc.org.spring.model.EventFilter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

@Component
public class EventDaoImpl extends AbstractDao implements EventDao {

	public void saveEvent(Event event) {	
		getSession().saveOrUpdate(event);
		System.out.println("save or update Event: "+event);
	}

	@SuppressWarnings("unchecked")
	public List<Event> findAllEvents() {
        Criteria criteria = getSession().createCriteria(Event.class);
        return (List<Event>) criteria.list();
	}

	public void deleteEventById(String id) {
		getSession().delete(findById(id));

	}

	public Event findById(String id) {
		Query q = getSession().createQuery("FROM Event c where c.id = :ID");
		q.setParameter("ID",id);
		List<Event> results = q.list();
		if(results !=null && results.size()>0)
			return results.get(0);
		
		return null;
	}

	public void updateEvent(Event event) {
		update(event);
	}

	@Override
	public List<Event> eventsByDay(String today) {
		Query q = getSession().createQuery("FROM Event c where c.startDate >= :STARTDATE ");
		try {
			q.setParameter("STARTDATE",new SimpleDateFormat("yyyy-MM-dd").parse(today.substring(0, today.indexOf('T'))));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<Event> results = q.list();
		return results;
	}
	
	public List<Event> findEvents(int pageNumber, int pageSize, int orderColumn, int orderType, int searchCol, String searchStr){
		Query q = getSession().createQuery("FROM Event c ");
		q.setFirstResult((pageNumber-1) * pageSize); //page no
		q.setMaxResults(pageSize);//no of rows
		List<Event> results = q.list();
		return results;
	}

	@Override
	public DataTableSource eventsByFilter(EventFilter filter) {
		int pageNumber = (filter.getiDisplayStart()  + filter.getiDisplayLength())/filter.getiDisplayLength();
		
		String query = "FROM Event c  WHERE 1 = 1 ";
		
		Number totalCount    =  (Number) getSession().createCriteria( Event.class).setProjection(Projections.rowCount()).uniqueResult();
		//int totalCount =  ((Long)getSession().createQuery("select count(*) from Event ").uniqueResult()).intValue();
		Map<String,Object> parMap = new HashMap<String,Object>();
		
		
		
		if(filter.getStartDateFrom()!= null){
			query+=" AND startDate >= :STARTDATE_FROM ";
			parMap.put("STARTDATE_FROM", filter.getStartDateFrom());
		}
		
		if(filter.getStartDateTo()!= null){
			query+=" AND startDate <= :STARTDATE_TO ";
			parMap.put("STARTDATE_TO", filter.getStartDateTo());
		}
		
//		Query q = getSession().createQuery(query);
		Query q_withoutPag = getSession().createQuery(query);
		
		
		for(String key:parMap.keySet()){
			q_withoutPag.setParameter(key, parMap.get(key));
		}
		List<Event> allFiltered = q_withoutPag.list();
		
//		q.setFirstResult((pageNumber-1) * filter.getiDisplayLength()); //page no
//		q.setMaxResults( filter.getiDisplayLength());//no of rows
		
		int startIndx = (pageNumber-1) * filter.getiDisplayLength();
		int endIndx = ((pageNumber-1) * filter.getiDisplayLength())+ filter.getiDisplayLength();
		if(endIndx> allFiltered.size())
			endIndx=allFiltered.size();
		
		List<Event> results = q_withoutPag.list().subList(startIndx ,endIndx);
		System.out.println("Query: "+ query);
		System.out.println("Result size: " +results.size());
		
		DataTableSource source = new DataTableSource();
		source.setAaData(results);
		source.setDraw(pageNumber);
		source.setiTotalRecords(allFiltered.size()); //tutti filtrati 
		source.setiTotalDisplayRecords(totalCount.intValue()); //tutti
		source.setsEcho(filter.getsEcho());
		return source;
		
	}

}
