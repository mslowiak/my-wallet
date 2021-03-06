package com.webwalletapp.Controller;

import com.webwalletapp.Entity.Category;
import com.webwalletapp.Repository.CategoryRepository;
import com.webwalletapp.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @CrossOrigin
    @GetMapping("/categories/")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @CrossOrigin
    @GetMapping("/categories/all/{userId}")
    public List<Category> getAllCategoriesForUser(@PathVariable(value = "userId") Integer userId) {
        return categoryRepository.findAllByUserId(userId);
    }

    @CrossOrigin
    @GetMapping("/categories/{id}")
    public Category getCategoryById(@PathVariable(value = "id") Integer categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
    }

    @CrossOrigin
    @DeleteMapping("/categories/{id}")
    public void deleteById(@PathVariable(value = "id") Integer id) {
        categoryRepository.deleteById(id);
    }

}
