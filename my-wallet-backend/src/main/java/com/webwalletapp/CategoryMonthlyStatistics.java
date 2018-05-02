package com.webwalletapp;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CategoryMonthlyStatistics {

    private String categoryName;
    private BigDecimal totalMoney;

    public CategoryMonthlyStatistics(String categoryName, BigDecimal totalMoney) {
        this.categoryName = categoryName;
        this.totalMoney = totalMoney;
    }
}
