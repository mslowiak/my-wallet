package com.webwalletapp.Controller;

import com.webwalletapp.CategoryExpense;
import com.webwalletapp.Entity.Transaction;
import com.webwalletapp.MonthlyBalance;
import com.webwalletapp.Repository.TransactionRepository;
import com.webwalletapp.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.MathContext;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @CrossOrigin
    @GetMapping("/transactions/")
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/transactions/all/{userId}")
    public List<Transaction> getAllTransactionsForUser(@PathVariable(value = "userId") Integer userId) {
        return transactionRepository.findAllByUserId(userId);
    }

    @CrossOrigin
    @GetMapping("/transactions/{id}")
    public Transaction getTransactionById(@PathVariable(value = "id") Integer transactionId) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction", "id", transactionId));
    }

    @CrossOrigin
    @GetMapping("/transactions/expenses")
    public List<Transaction> getAllExpenses() {
        return transactionRepository.findByType("Wydatek");
    }

    @CrossOrigin
    @GetMapping("/transactions/expenses/last-month/{id}")
    public List<CategoryExpense> getTransactionsFromCurrentMonth(@PathVariable(value = "id") Integer id) {
        List<Object[]> transactionsFromCurrentMonth = transactionRepository.getExpensesFromCurrentMonth(id);
        List<CategoryExpense> categoryMonthlyStatistics = new ArrayList<>();
        for (Object[] o : transactionsFromCurrentMonth) {
            categoryMonthlyStatistics.add(new CategoryExpense((String) o[0], new BigDecimal((Double) o[1], MathContext.DECIMAL64)));
        }
        return categoryMonthlyStatistics;
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
    @GetMapping("/transactions/balance-history/{id}")
    public List<MonthlyBalance> getMonthlyBalance(@PathVariable(value = "id") Integer id){
        List<Object[]> monthlyBalance = transactionRepository.getMonthlyBalance(id);
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

    @CrossOrigin
    @DeleteMapping("/transactions/{ids}")
    public void deleteById(@PathVariable(value = "ids") String ids) {
        int[] ints = Arrays.stream(ids.split("=")[1].split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
        transactionRepository.deleteTransactionsByTransactionIdIn(ints);
    }

    @CrossOrigin
    @PostMapping("/transactions/upload")
    public ResponseEntity fileUpload(@RequestParam("file") MultipartFile file) {
        try {
            String extension = "";
            int i = file.getOriginalFilename().lastIndexOf('.');
            if (i >= 0) {
                extension = file.getOriginalFilename().substring(i + 1);
            }
            System.out.println(extension);
            if (!extension.equals("txt")) {
                return new ResponseEntity(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
            }
            byte[] bytes = file.getBytes();
            File f = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().getPath());
            String downloadsDir = f.getParentFile().getParentFile().getParentFile() + "\\downloaded\\";
            Path path = Paths.get(downloadsDir + file.getOriginalFilename());
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
