package it.inc.org.spring.model;

import java.util.Map;

public class AbstractFilter {
	
	protected int iDisplayStart;
	protected int iDisplayLength;
	protected String sEcho;

	
	public AbstractFilter(Map<String,String> map){
		if(map.containsKey("iDisplayStart")){
			this.iDisplayStart = Integer.valueOf(map.get("iDisplayStart"));
		}
		if(map.containsKey("iDisplayLength")){
			this.iDisplayLength = Integer.valueOf(map.get("iDisplayLength"));
		}
		if(map.containsKey("sEcho")){
			this.sEcho = map.get("sEcho");
		}
	}
	
	public static String getSearchFilter(int colId, Map<String,String> map){
		if(map.containsKey( "sSearch_"+colId ) && 
				map.get( "sSearch_"+colId ) != null &&
				!"".equals(map.get( "sSearch_"+colId ) )){
			return map.get( "sSearch_"+colId ) ;
		}else{
			return null;
		}
	}


	public int getiDisplayStart() {
		return iDisplayStart;
	}


	public int getiDisplayLength() {
		return iDisplayLength;
	}

	public String getsEcho() {
		return sEcho;
	}
	
	

}
