package it.inc.org.spring.dao;

import it.inc.org.spring.model.TypeModel;

import java.util.List;

public interface TypeDao {
	
	public TypeModel saveType(TypeModel t);
	
	public List<TypeModel> getTypeList();
	
	public TypeModel getById(int id);

}
