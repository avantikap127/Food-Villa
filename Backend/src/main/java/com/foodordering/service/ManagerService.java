package com.foodordering.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodordering.entity.FoodItem;
import com.foodordering.entity.Restaurant;
import com.foodordering.repository.FoodItemRepository;
import com.foodordering.repository.RestaurantRepository;

@Service
public class ManagerService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    public Restaurant addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public List<Restaurant> getRestaurantsByManager(Long managerId) {
        return restaurantRepository.findByManagerId(managerId);
    }

    public FoodItem addFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public void deleteFoodItem(Long foodId) {
        foodItemRepository.deleteById(foodId);
    }

    public List<FoodItem> getFoodByRestaurant(Long restaurantId) {
        return foodItemRepository.findByRestaurantId(restaurantId);
    }

    public void deleteRestaurant(Long restaurantId) {
    restaurantRepository.deleteById(restaurantId);
}
}