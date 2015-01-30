package it.inc.org.spring.model;

import java.io.Serializable;
import java.util.List;

public class DataTableSource implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2877587407741132988L;

	private int draw; //page_no
	
	private int iTotalRecords;
	
	private int iTotalDisplayRecords;
	
	private List aaData;
	
	private String error;

	private String sEcho;
	
	public int getDraw() {
		return draw;
	}

	public void setDraw(int draw) {
		this.draw = draw;
	}



	public List getAaData() {
		return aaData;
	}

	public void setAaData(List aaData) {
		this.aaData = aaData;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public int getiTotalRecords() {
		return iTotalRecords;
	}

	public void setiTotalRecords(int iTotalRecords) {
		this.iTotalRecords = iTotalRecords;
	}

	public int getiTotalDisplayRecords() {
		return iTotalDisplayRecords;
	}

	public void setiTotalDisplayRecords(int iTotalDisplayRecords) {
		this.iTotalDisplayRecords = iTotalDisplayRecords;
	}

	public String getsEcho() {
		return sEcho;
	}

	public void setsEcho(String sEcho) {
		this.sEcho = sEcho;
	}

	@Override
	public String toString() {
		return "DataTableSource [draw=" + draw + ", iTotalRecords="
				+ iTotalRecords + ", iTotalDisplayRecords="
				+ iTotalDisplayRecords + ", aaData=" + (aaData !=null?aaData.size():aaData)+ ", error="
				+ error + ", sEcho=" + sEcho + "]";
	}


	
	
	
	

}
