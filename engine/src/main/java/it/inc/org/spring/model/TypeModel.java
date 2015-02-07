package it.inc.org.spring.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="TBL_TYPES")
public class TypeModel implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -5177819064187883451L;
	
	@Id
	@Column(name="ID")
	private int id;
	@Column(name="type")
	private String type;
	@Column(name="description")
	private String description;
	@Column(name="name")
	private String name;
	@Column(name="price")
	private float price;
	@Column(name="size")
	private int size;
	@Column(name="color")
	private String color;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	@Override
	public String toString() {
		return "TypeModel [id=" + id + ", type=" + type + ", description="
				+ description + ", name=" + name + ", price=" + price
				+ ", size=" + size + "]";
	}
	
	

}
