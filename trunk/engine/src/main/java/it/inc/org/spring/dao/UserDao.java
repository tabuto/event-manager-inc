package it.inc.org.spring.dao;

import java.util.List;

import it.inc.org.spring.model.UserModel;

public interface UserDao {
	
	public UserModel saveUser(UserModel u);
	
	public List<UserModel> getAllUsers();
	
	public UserModel getUser(long id);

}
