package it.inc.org.spring.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
/**
 * Classe di utilita' che traforma la mappa di parametri in request
 * inviati dal componente js DataTable nella pagina events.jsp
 * in un bean usato dal dao per preparare la query
 * che contiene tutti i dati per valorizzare la classe
 * DataTableSource
 */
public class EventFilter extends AbstractFilter{

	
	private  String id;
	
	private  Date startDateFrom;
	
	private  Date startDateTo;
	
	private  Date endDateFrom;
	
	private  Date endDateTo;
	
	private  String text;
	
	
	public EventFilter(Map<String,String> map){
		super(map);
		this.id = getSearchFilter(0, map);
		String startDates = getSearchFilter(1, map);
		String endDates = getSearchFilter(2, map);
		this.text = getSearchFilter(3, map);
		
		if(startDates != null && startDates.length()>2 && startDates.indexOf('~') == (startDates.length()-1)){
			//una sola data
			try {
				startDateFrom = new SimpleDateFormat("dd/mm/yyyy").parse(startDates.substring(0,startDates.indexOf('~')));
			} catch (ParseException e) {
				startDateFrom = null;
				e.printStackTrace();
			}
		}else if (startDates != null && startDates.length()>2 &&startDates.indexOf('~') < (startDates.length()-1)){
			//range di date
			//una sola data
			try {
				startDateFrom = new SimpleDateFormat("dd/mm/yyyy").parse(startDates.substring(0,startDates.indexOf('~')));
				startDateTo = new SimpleDateFormat("dd/mm/yyyy").parse(startDates.substring(startDates.indexOf('~')+1,startDates.length()));
			} catch (ParseException e) {
				startDateFrom = null;
				startDateTo = null;
				e.printStackTrace();
			}
		}
		
		
		if(endDates != null && endDates.length()>2 && endDates.indexOf('~') == (endDates.length()-1)){
			//una sola data
			try {
				endDateFrom = new SimpleDateFormat("dd/mm/yyyy").parse(endDates.substring(0,endDates.indexOf('~')));
			} catch (ParseException e) {
				endDateFrom = null;
				e.printStackTrace();
			}
		}else if(endDates != null && endDates.length()>2 && endDates.indexOf('~') < (endDates.length()-1)){
			//range di date
			//una sola data
			try {
				endDateFrom = new SimpleDateFormat("dd/mm/yyyy").parse(endDates.substring(0,endDates.indexOf('~')));
				endDateTo = new SimpleDateFormat("dd/mm/yyyy").parse(endDates.substring(endDates.indexOf('~')+1,endDates.length()));
			} catch (ParseException e) {
				endDateFrom = null;
				endDateTo = null;
				e.printStackTrace();
			}
		}
		System.out.println("Filter build: "+this);
	}


	public String getId() {
		return id;
	}


	public Date getStartDateFrom() {
		return startDateFrom;
	}


	public Date getStartDateTo() {
		return startDateTo;
	}


	public Date getEndDateFrom() {
		return endDateFrom;
	}


	public Date getEndDateTo() {
		return endDateTo;
	}


	public String getText() {
		return text;
	}


	@Override
	public String toString() {
		return "EventFilter [id=" + id + ", startDateFrom=" + startDateFrom
				+ ", startDateTo=" + startDateTo + ", endDateFrom="
				+ endDateFrom + ", endDateTo=" + endDateTo + ", text=" + text
				+ "]";
	}
	
	
	
}
