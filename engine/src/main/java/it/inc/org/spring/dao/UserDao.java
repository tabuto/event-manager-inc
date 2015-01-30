package it.inc.org.spring.dao;

import it.inc.org.spring.model.UserModel;

import java.util.List;

public interface UserDao {
	
	public UserModel saveUser(UserModel u);
	
	public List<UserModel> getAllUsers();
	
	public UserModel getUser(long id);

}
