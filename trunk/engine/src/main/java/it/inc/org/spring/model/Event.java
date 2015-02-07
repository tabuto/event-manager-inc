package it.inc.org.spring.model;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Classe che rappresenta un evento.
 * Il formato data è: 2015-01-19T21:30:00
 * N.B. presenta dei fake-attribute per la visualizzazione delle date
 * i fake-attribute user e type sono da eliminare, sono stati mantenuti per retrocompatibilità
 * in quanto le relazioni jpa con le rispettive entity sono state aggiunte dopo.
 * 
 * @author f.didio
 *
 */
@Entity
@Table(name="TBL_EVENTS")
public class Event implements Serializable{
	
	public static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
	


	/**
	 * 
	 */
	private static final long serialVersionUID = 7109500526912048809L;

	@Id
    private String id;
 
    @Column(name = "start_date", nullable = false)
    private Date startDate;
    @Transient
    private String start;
    @Transient
    private String end;

    @Column(name = "end_date", nullable = false)
    private Date endDate;
    
    @Column(name = "text")
    private String text;
    
    @Column(name = "paid")
    private String paid = "N";
    
    @Transient
    private boolean checkPaid;
    
    //@Column(name = "id_user")
    @Transient
    private long user;
    
    @Transient
    private int type;
    
    @ManyToOne
    @JoinColumn(name = "id_user")
    private UserModel userModel;
    
    @ManyToOne
    @JoinColumn(name = "id_type")
    private TypeModel typeModel;
    
    @Transient
    private float price;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		
		this.startDate = startDate;
		
	}

	public String getStart() {
		if(start==null && startDate!=null){
			String formattedDate = new SimpleDateFormat(Event.DATE_FORMAT).format(startDate);
			this.start = formattedDate;
		}
		return start;
	}

	public void setStart(String start) {
		//2015-01-19T21:30:00
		try {
			Date date = new SimpleDateFormat(Event.DATE_FORMAT).parse(start);
			this.start = start;
			this.startDate = date;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
	}

	public String getEnd() {
		if(end==null && endDate!=null){
			String formattedDate = new SimpleDateFormat(Event.DATE_FORMAT).format(endDate);
			this.end = formattedDate;
		}
		return end;
	}

	public void setEnd(String end) {
		try {
			Date date = new SimpleDateFormat(Event.DATE_FORMAT).parse(end);
			this.end = end;
			this.endDate = date;
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
		
		
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public long getUser() {
		if(this.getUserModel() == null)
			this.userModel = new UserModel();
		return userModel.getId();
	}

	public void setUser(long user) {
		if(this.getUserModel() == null)
			this.userModel = new UserModel();

		this.userModel.setId( user);
	}

	public int getType() {
		if(this.getTypeModel()==null)
			this.typeModel = new TypeModel();
		return typeModel.getId();
	}

	public void setType(int type) {
		if(this.getTypeModel()==null)
			this.typeModel = new TypeModel();
		this.typeModel.setId(type);
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

    public UserModel getUserModel() {
		return userModel;
	}

	public void setUserModel(UserModel userModel) {
		this.userModel = userModel;
	}
	
	

	public TypeModel getTypeModel() {
		return typeModel;
	}

	public void setTypeModel(TypeModel typeModel) {
		this.typeModel = typeModel;
	}
	
	

	public String getPaid() {
		return paid;
	}

	public void setPaid(String paid) {
		this.paid = paid;
	}
	

	public boolean isCheckPaid() {
		return "Y".equalsIgnoreCase(paid);
	}

	public void setCheckPaid(boolean checkPaid) {
		this.checkPaid = checkPaid;
	}
	
	

	public float getPrice() {
		if(this.typeModel!=null)
			this.price = this.typeModel.getPrice()*this.typeModel.getSize();
		return price;
	}

	@Override
	public String toString() {
		return "Event [id=" + id + ", startDate=" + startDate + ", start="
				+ start + ", end=" + end + ", endDate=" + endDate + ", text="
				+ text + ", user=" + user + ", type=" + type + "]";
	}

    
    
    
}
