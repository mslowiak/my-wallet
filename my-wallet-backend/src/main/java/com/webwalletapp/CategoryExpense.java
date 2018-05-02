package com.webwalletapp;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CategoryExpense {

    private String categoryName;
    private BigDecimal totalMoney;

    public CategoryExpense(String categoryName, BigDecimal totalMoney) {
        this.categoryName = categoryName;
        this.totalMoney = totalMoney;
    }
}
