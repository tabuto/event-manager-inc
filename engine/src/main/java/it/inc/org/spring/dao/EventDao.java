package it.inc.org.spring.dao;

import it.inc.org.spring.model.DataTableSource;
import it.inc.org.spring.model.Event;
import it.inc.org.spring.model.EventFilter;

import java.util.List;

public interface EventDao {
	
    void saveEvent(Event event);
    
    /*
     * non utilizzata
     */
    List<Event> findAllEvents();
    
    /*
     * Restituisce tutti gli eventi del giorno
     * Usata dallo scheduler per caricare gli eventi da visualizzare
     */
    List<Event> eventsByDay(String today);
    
    /*
     * Restiuisce tutti gli eventi in funzione dei filtri
     * Il filtro e' un oggetto valorizzato dal componente js DataTable
     * che si occupa della gestione della paginazione, ordinamento e ricerca
     * nella pagina events.jsp
     */
    DataTableSource eventsByFilter(EventFilter filter);
    
    void deleteEventById(String id);
     
    Event findById(String id);
     
    void updateEvent(Event event);

    
}
