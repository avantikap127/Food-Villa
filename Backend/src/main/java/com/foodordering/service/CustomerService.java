package com.foodordering.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodordering.entity.Cart;
import com.foodordering.entity.CartItem;
import com.foodordering.entity.FoodItem;
import com.foodordering.entity.Order;
import com.foodordering.entity.OrderItem;
import com.foodordering.entity.Restaurant;
import com.foodordering.repository.CartItemRepository;
import com.foodordering.repository.CartRepository;
import com.foodordering.repository.FoodItemRepository;
import com.foodordering.repository.OrderItemRepository;
import com.foodordering.repository.OrderRepository;
import com.foodordering.repository.RestaurantRepository;

@Service
public class CustomerService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();//when this method is called, it will return a list of all the restaurants available in the database. The findAll() method is provided by the JpaRepository interface and it retrieves all the records from the restaurant table in the database and maps them to a list of Restaurant objects that we can use in our application. when hibernate executes this method, it will generate a SQL query like "SELECT * FROM restaurant" to fetch all the restaurant records from the database and then convert those records into Restaurant objects that we can work with in our Java code.
    }

    public List<FoodItem> getFoodByRestaurant(Long restaurantId) {
        return foodItemRepository.findByRestaurantId(restaurantId);
    }
public String addToCart(Long customerId, Long foodItemId, Integer quantity) { //In this method, we are adding a food item to the customer's cart. We first check if the food item exists in the database using the foodItemRepository. If it doesn't exist, we return a message saying "Food item not found". If it does exist, we then check if the customer already has a cart. If they don't have a cart, we create a new cart for them and save it to the database. Next, we check if the food item is already in the customer's cart. If it is, we update the quantity and subtotal for that cart item. If it's not, we create a new cart item with the specified quantity and price, and save it to the database. Finally, we return a message saying "Item added to cart".
    FoodItem foodItem = foodItemRepository.findById(foodItemId).orElse(null);

    if (foodItem == null) {
        return "Food item not found";
    }

    Cart cart = cartRepository.findByCustomerId(customerId).orElse(null);

    if (cart == null) {
        cart = new Cart();
        cart.setCustomerId(customerId);
        cart = cartRepository.save(cart);
    }

    CartItem cartItem = cartItemRepository
            .findByCartIdAndFoodItemId(cart.getId(), foodItemId)
            .orElse(null);

    if (cartItem != null) {
        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartItem.setSubtotal(cartItem.getQuantity() * cartItem.getPrice());
    } else {
        cartItem = new CartItem();
        cartItem.setCartId(cart.getId());
        cartItem.setFoodItemId(foodItemId);
        cartItem.setQuantity(quantity);
        cartItem.setPrice(foodItem.getPrice());
        cartItem.setSubtotal(quantity * foodItem.getPrice());
    }

    cartItemRepository.save(cartItem);
    return "Item added to cart";
}
    public List<CartItem> viewCart(Long customerId) {
        Cart cart = cartRepository.findByCustomerId(customerId).orElse(null);

        if (cart == null) {
            return List.of();
        }

        return cartItemRepository.findByCartId(cart.getId());
    }

    public String increaseQuantity(Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId).orElse(null);

        if (item == null) return "Item not found";

        item.setQuantity(item.getQuantity() + 1);
        item.setSubtotal(item.getQuantity() * item.getPrice());
        cartItemRepository.save(item);

        return "Quantity increased";
    }

    public String decreaseQuantity(Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId).orElse(null);

        if (item == null) return "Item not found";

        if (item.getQuantity() > 1) {
            item.setQuantity(item.getQuantity() - 1);
            item.setSubtotal(item.getQuantity() * item.getPrice());
            cartItemRepository.save(item);
        } else {
            cartItemRepository.delete(item);
        }

        return "Quantity updated";
    }

    public String deleteCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
        return "Item removed";
    }

    public String placeOrder(Long customerId, String address, String paymentMode) { // In this method, we are placing an order for the customer. We first check if the customer has a cart and if the cart has any items in it. If the cart is empty, we return a message saying "Cart is empty". If the cart has items, we calculate the total amount for the order and create a new Order object. We set the customer ID, restaurant ID (which we get from the cart), delivery address, payment mode, total amount, status (initially set to "PLACED"), OTP (a random 6-digit number), delivery partner ID (initially set to null), paid status (based on the payment mode), ordered at timestamp, and ordered items (a string representation of the food items and their quantities). We then save the order to the database. After that, we loop through each cart item and create corresponding OrderItem objects for eg. if the cart has 2 burgers and 1 pizza, we will create two OrderItem records for the burger and one OrderItem record for the pizza, and save them to the database.We also update the available quantity of each food item in the database by subtracting the quantity ordered. Finally, we clear the customer's cart by deleting all cart items and the cart itself, and return a message saying "Order placed successfully".
        Cart cart = cartRepository.findByCustomerId(customerId).orElse(null);

        if (cart == null) return "Cart is empty";

        List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getId());

        if (cartItems.isEmpty()) return "Cart is empty";

        double total = 0;
        StringBuilder orderedItems = new StringBuilder();
        

        for (CartItem item : cartItems) {
            total += item.getSubtotal();

            FoodItem food = foodItemRepository.findById(item.getFoodItemId()).orElse(null);

            if (food != null) {
                orderedItems.append(food.getFoodName())
                        .append(" x")
                        .append(item.getQuantity())
                        .append(", ");
            }
        }

        if (orderedItems.length() > 2) {
            orderedItems.setLength(orderedItems.length() - 2);
        }

        String otp = String.valueOf((int)(100000 + Math.random() * 900000));
        Order order = new Order();
        order.setCustomerId(customerId);
        order.setRestaurantId(cart.getRestaurantId());
        order.setDeliveryAddress(address);
        order.setPaymentMode(paymentMode);
        order.setTotalAmount(total);
        order.setStatus("PLACED");
        order.setOtp(otp);
        order.setDeliveryPartnerId(null);
        order.setPaid(paymentMode.equalsIgnoreCase("ONLINE"));
        order.setOrderedAt(LocalDateTime.now());
        order.setOrderedItems(orderedItems.toString());

        order = orderRepository.save(order);

        for (CartItem item : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(order.getId());
            orderItem.setFoodItemId(item.getFoodItemId());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());
            orderItem.setSubtotal(item.getSubtotal());

            orderItemRepository.save(orderItem);

            FoodItem food = foodItemRepository.findById(item.getFoodItemId()).orElse(null);

            if (food != null) {
                food.setAvailableQuantity(
                        food.getAvailableQuantity() - item.getQuantity()
                );
                foodItemRepository.save(food);
            }
        }

        cartItemRepository.deleteAll(cartItems);
        cartRepository.delete(cart);

        return "Order placed successfully";
    }

    public List<Order> getOrderHistory(Long customerId) {
        return orderRepository.findByCustomerIdOrderByOrderedAtDesc(customerId);
    }
}