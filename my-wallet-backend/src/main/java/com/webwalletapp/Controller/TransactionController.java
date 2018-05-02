package com.webwalletapp.Controller;

import com.webwalletapp.CategoryMonthlyStatistics;
import com.webwalletapp.Entity.Transaction;
import com.webwalletapp.Repository.TransactionRepository;
import com.webwalletapp.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.MathContext;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @CrossOrigin
    @GetMapping("/transactions")
    public List<Transaction> getAllCategories() {
        return transactionRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/transactions/{id}")
    public Transaction getTransactionById(@PathVariable(value = "id") Integer transactionId) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", transactionId));
    }

    @CrossOrigin
    @GetMapping("/transactions/this-month")
    public List<CategoryMonthlyStatistics> getTransactionsFromCurrentMonth() {
        List<Object[]> transactionsFromCurrentMonth = transactionRepository.getTransactionsFromCurrentMonth();
        List<CategoryMonthlyStatistics> categoryMonthlyStatistics = new ArrayList<>();
        for (Object [] o : transactionsFromCurrentMonth){
            categoryMonthlyStatistics.add(new CategoryMonthlyStatistics((String) o[0], new BigDecimal((Double)o[1], MathContext.DECIMAL64)));
        }
        return categoryMonthlyStatistics;
    }
}
