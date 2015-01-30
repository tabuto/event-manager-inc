package it.inc.org.spring.dao;

import it.inc.org.spring.model.TypeModel;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Component;
@Component
public class TypeDaoImpl extends AbstractDao implements TypeDao {

	@Override
	public TypeModel saveType(TypeModel t) {
		if(t != null && t.getId()>0){
			//update
			return (TypeModel) this.getSession().merge(t);
		}else{
			this.getSession().persist(t);
			return t;
		}
	}

	@Override
	public List<TypeModel> getTypeList() {
		Query q = getSession().createQuery("FROM TypeModel c");
		return q.list();
	}

}
