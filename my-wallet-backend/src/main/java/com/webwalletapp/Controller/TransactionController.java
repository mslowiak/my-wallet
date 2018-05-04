package com.webwalletapp.Controller;

import com.webwalletapp.CategoryExpense;
import com.webwalletapp.Entity.Transaction;
import com.webwalletapp.MonthlyBalance;
import com.webwalletapp.Repository.TransactionRepository;
import com.webwalletapp.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalDate;
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
    public List<CategoryExpense> getTransactionsFromCurrentMonth() {
        List<Object[]> transactionsFromCurrentMonth = transactionRepository.getTransactionsFromCurrentMonth();
        List<CategoryExpense> categoryMonthlyStatistics = new ArrayList<>();
        for (Object[] o : transactionsFromCurrentMonth) {
            categoryMonthlyStatistics.add(new CategoryExpense((String) o[0], new BigDecimal((Double) o[1], MathContext.DECIMAL64)));
        }
        return categoryMonthlyStatistics;
    }

    @CrossOrigin
    @GetMapping("/transactions/expenses")
    public List<Transaction> getAllExpenses() {
        return transactionRepository.findByType("Wydatek");
    }

    @CrossOrigin
    @GetMapping("/transactions/expenses/date-range/{startDate}/{endDate}")
    public List<Transaction> getAllExpensesWithDateRange(@PathVariable(value = "startDate") String startDate,
                                                         @PathVariable(value = "endDate") String endDate) {
        LocalDate startLocalDate = LocalDate.parse(startDate);
        LocalDate endLocalDate = LocalDate.parse(endDate);
        return transactionRepository
                .findByTypeAndDateBetween("Wydatek", startLocalDate, endLocalDate);
    }

    @CrossOrigin
    @GetMapping("/transactions/balance-history")
    public List<MonthlyBalance> getMonthlyBalance() {
        List<Object[]> monthlyBalance = transactionRepository.getMonthlyBalance();
        int actualYear = LocalDate.now().getYear();
        int actualMonth = LocalDate.now().getMonthValue();
        List<MonthlyBalance> monthlyBalancesOutput = new ArrayList<>();

        for (int i = 0; i < monthlyBalance.size(); ) {
            String dateCode = actualYear + String.format("%02d", actualMonth);
            BigDecimal expenses = new BigDecimal(0);
            BigDecimal incomes = new BigDecimal(0);

            Object[] actualRow = monthlyBalance.get(i);

            if (actualRow[1].equals(dateCode)) {
                if (actualRow[3].equals("Wydatek")) {
                    expenses = (BigDecimal) actualRow[2];
                    if (i + 1 < monthlyBalance.size()) {
                        Object[] nextPos = monthlyBalance.get(i + 1);
                        if (nextPos[1].equals(dateCode) && nextPos[3].equals("Przychod")) {
                            incomes = (BigDecimal) nextPos[2];
                            i++;
                        }
                    }
                } else {
                    incomes = (BigDecimal) actualRow[2];
                }
                i++;
                monthlyBalancesOutput.add(new MonthlyBalance(actualYear, actualMonth, expenses, incomes));
            }
            actualMonth--;
            if (actualMonth == 0) {
                actualMonth = 12;
                actualYear--;
            }
        }
        return monthlyBalancesOutput;
    }
}
