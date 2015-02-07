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
		DataTableSource source = new DataTableSource();
		int pageNumber = (filter.getiDisplayStart()  + filter.getiDisplayLength())/filter.getiDisplayLength();
		
		String query = "SELECT e FROM Event e  ";
		
		String joins = " ";
		
		String where = " WHERE 1 = 1 ";
		
		Number totalCount    =  (Number) getSession().createCriteria( Event.class).setProjection(Projections.rowCount()).uniqueResult();
		//int totalCount =  ((Long)getSession().createQuery("select count(*) from Event ").uniqueResult()).intValue();
		Map<String,Object> parMap = new HashMap<String,Object>();
		
		
		
		if(filter.getStartDateFrom()!= null){
			where+=" AND startDate >= :STARTDATE_FROM ";
			parMap.put("STARTDATE_FROM", filter.getStartDateFrom());
		}
		
		if(filter.getStartDateTo()!= null){
			where+=" AND startDate <= :STARTDATE_TO ";
			parMap.put("STARTDATE_TO", filter.getStartDateTo());
		}
		
		if(filter.getEndDateFrom()!=null){
			where+=" AND endDate >= :ENDDATE_FROM ";
			parMap.put("ENDDATE_FROM", filter.getEndDateFrom());
		}
		
		if(filter.getEndDateTo()!=null){
			where+=" AND endDate <= :ENDDATE_TO ";
			parMap.put("ENDDATE_TO", filter.getEndDateTo());
		}
		
		if(filter.getText()!=null && filter.getText().length()>2){
			where+=" AND upper(text) like :TEXT ";
			parMap.put("TEXT", "%"+filter.getText().toUpperCase()+"%");
		}
		
		if(filter.getUserNameTel() != null && filter.getUserNameTel().length()>2){
			joins+=" INNER JOIN e.userModel u ";
			where+=" AND upper( concat(u.name,' ',u.surname,' ',u.tel)) like :USER_NAME_TEL ";
			parMap.put("USER_NAME_TEL", "%"+filter.getUserNameTel().toUpperCase()+"%");
		}
		
		if(filter.getTypeName() != null && filter.getTypeName().length()>=2){
			joins+=" INNER JOIN e.typeModel t ";
			where+=" AND upper( t.name ) like :TYPE_NAME ";
			parMap.put("TYPE_NAME", "%"+filter.getTypeName().toUpperCase()+"%");
		}
		
		if(filter.getPaid()!=null && 
				("SI".equalsIgnoreCase(filter.getPaid()) 
						|| "NO".equalsIgnoreCase(filter.getPaid())  ) ){
			boolean isPaid = "SI".equalsIgnoreCase(filter.getPaid());
			where+=" AND paid = " +(isPaid?"'Y'":"'N'");
			
		}
		
		query+=joins;
		query+=where;
		
//		Query q = getSession().createQuery(query);
		try{
			Query q_withoutPag = getSession().createQuery(query);
			//q_withoutPag.setEntity(arg0, arg1)
			
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
			
			source.setAaData(results);
			source.setDraw(pageNumber);
			source.setiTotalRecords(allFiltered.size()); //tutti filtrati 
			source.setiTotalDisplayRecords(totalCount.intValue()); //tutti
			source.setsEcho(filter.getsEcho());
			
		}catch (Exception e){
			System.out.println(e.getMessage());
			System.out.println("Query: "+ query);
			e.printStackTrace();
			
		}
		
		
		
		return source;
		
	}

}
