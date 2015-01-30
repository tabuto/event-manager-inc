package it.inc.org.spring.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="TBL_USERS")
public class UserModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 2261984369112342120L;
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID")
	private long id;
	
	@Column(name="NAME")
	private String name;
	@Column(name="SURNAME")
	private String surname;
	@Column(name="EMAIL")
	private String email;
	@Column(name="TEL")
	private String tel;
	@Column(name="ROLE")
	private String role;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "UserModel [id=" + id + ", name=" + name + ", surname="
				+ surname + ", email=" + email + ", tel=" + tel + ", role="
				+ role + "]";
	}
	
	
}
