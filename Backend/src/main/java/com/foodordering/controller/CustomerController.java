package com.foodordering.controller;

import com.foodordering.entity.CartItem;
import com.foodordering.entity.FoodItem;
import com.foodordering.entity.Order;
import com.foodordering.entity.Restaurant;
import com.foodordering.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/restaurants")
    public List<Restaurant> getAllRestaurants() {
        return customerService.getAllRestaurants();
    }

    @GetMapping("/foods/{restaurantId}")
    public List<FoodItem> getFoodByRestaurant(@PathVariable Long restaurantId) {
        return customerService.getFoodByRestaurant(restaurantId);
    }

    @PostMapping("/cart/add")
    public String addToCart(@RequestParam Long customerId,
                            @RequestParam Long foodItemId,
                            @RequestParam Integer quantity) {
        return customerService.addToCart(customerId, foodItemId, quantity);
    }

    @GetMapping("/cart/{customerId}")
    public List<CartItem> viewCart(@PathVariable Long customerId) {
        return customerService.viewCart(customerId);
    }

    @PutMapping("/cart/increase/{cartItemId}")
    public String increaseQuantity(@PathVariable Long cartItemId) {
        return customerService.increaseQuantity(cartItemId);
    }

    @PutMapping("/cart/decrease/{cartItemId}")
    public String decreaseQuantity(@PathVariable Long cartItemId) {
        return customerService.decreaseQuantity(cartItemId);
    }

    @DeleteMapping("/cart/{cartItemId}")
    public String deleteCartItem(@PathVariable Long cartItemId) {
        return customerService.deleteCartItem(cartItemId);
    }

    @PostMapping("/order/place")
    public String placeOrder(@RequestParam Long customerId,
                             @RequestParam String address,
                             @RequestParam String paymentMode) {
        return customerService.placeOrder(customerId, address, paymentMode);
    }

    @GetMapping("/orders/{customerId}")
    public List<Order> getOrderHistory(@PathVariable Long customerId) {
        return customerService.getOrderHistory(customerId);
    }
}