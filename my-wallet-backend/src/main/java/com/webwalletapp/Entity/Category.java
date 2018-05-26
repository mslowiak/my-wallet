package com.webwalletapp.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Column(name = "Category_ID")
    private int categoryId;

    @Column(name="User_ID")
    private Integer userId;

    @Column(name = "Name")
    private String name;

    @Column (name = "color")
    private String color;

    public Category() {
    }

    public Category(Integer userId, String name, String color) {
        this.userId = userId;
        this.name = name;
        this.color = color;
    }
}
