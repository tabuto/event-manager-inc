package it.inc.org.spring.dao;

import it.inc.org.spring.model.TypeModel;
import it.inc.org.spring.model.UserModel;

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
		Query q = getSession().createQuery("FROM TypeModel c WHERE wActive = 'Y' ");
		return q.list();
	}

	@Override
	public TypeModel getById(int id) {
		Query q = getSession().createQuery("FROM TypeModel c where c.id = :ID");
		q.setParameter("ID",id);
		List<TypeModel> results = q.list();
		if(results !=null && results.size()>0)
			return results.get(0);
		
		return null;
		
	}

}
