package com.foodordering.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.foodordering.entity.FoodItem;
import com.foodordering.entity.Restaurant;
import com.foodordering.service.ManagerService;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin("*")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @PostMapping("/restaurants")
    public Restaurant addRestaurant(@RequestBody Restaurant restaurant) {
        return managerService.addRestaurant(restaurant);
    }

    @GetMapping("/restaurants/{managerId}")
    public List<Restaurant> getRestaurants(@PathVariable Long managerId) {
        return managerService.getRestaurantsByManager(managerId);
    }

    @PostMapping("/foods")
    public FoodItem addFood(@RequestBody FoodItem foodItem) {
        return managerService.addFoodItem(foodItem);
    }

    @DeleteMapping("/foods/{foodId}")
    public String deleteFood(@PathVariable Long foodId) {
        managerService.deleteFoodItem(foodId);
        return "Food item deleted successfully";
    }

    @GetMapping("/foods/{restaurantId}")
    public List<FoodItem> getFoods(@PathVariable Long restaurantId) {
        return managerService.getFoodByRestaurant(restaurantId);
    }
    @DeleteMapping("/restaurants/{restaurantId}")
    public ResponseEntity<String> deleteRestaurant(@PathVariable Long restaurantId) {
        managerService.deleteRestaurant(restaurantId);
        return ResponseEntity.ok("Restaurant deleted successfully");
    }
}