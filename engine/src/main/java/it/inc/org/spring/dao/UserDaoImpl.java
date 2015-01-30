package it.inc.org.spring.dao;

import it.inc.org.spring.model.UserModel;

import java.util.List;

import org.hibernate.Query;
import org.springframework.stereotype.Component;

import com.sun.corba.se.spi.legacy.connection.GetEndPointInfoAgainException;
@Component
public class UserDaoImpl extends AbstractDao implements UserDao {

	
	public UserModel saveUser(UserModel u) {
		
		if(u!=null && u.getId()>0){
			update(u);
			
		}else{
			System.out.println(getSession().save(u));
			getSession().refresh(u);
			System.out.println("new user saved: "+u.getId());
		}
		
		return u;
	}

	
	public List<UserModel> getAllUsers() {
		Query q = getSession().createQuery("FROM UserModel c");
		
		return q.list();
	}


	@Override
	public UserModel getUser(long id) {
		Query q = getSession().createQuery("FROM UserModel c where c.id = :ID");
		q.setParameter("ID",id);
		List<UserModel> results = q.list();
		if(results !=null && results.size()>0)
			return results.get(0);
		
		return null;
	}

}
