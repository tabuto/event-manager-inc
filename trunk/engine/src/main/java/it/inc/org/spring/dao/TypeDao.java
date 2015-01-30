package it.inc.org.spring.dao;

import java.util.List;

import it.inc.org.spring.model.TypeModel;

public interface TypeDao {
	
	public TypeModel saveType(TypeModel t);
	
	public List<TypeModel> getTypeList();

}
