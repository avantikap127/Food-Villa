package com.foodordering.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodordering.entity.Order;
import com.foodordering.repository.OrderRepository;

@Service
public class DeliveryService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getPendingOrders() {
        List<Order> allOrders = orderRepository.findAll();

        return allOrders.stream()
                .filter(order ->
                        "PLACED".equals(order.getStatus()) ||
                        "OUT_FOR_DELIVERY".equals(order.getStatus()))
                .toList();//here we are filtering the orders to get only those that are either in "PLACED" or "OUT_FOR_DELIVERY" status, which means they are pending for delivery.     
                }
    public String acceptOrder(Long orderId, Long partnerId) {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            return "Order not found";
        }

        order.setDeliveryPartnerId(partnerId);
        order.setStatus("OUT_FOR_DELIVERY");

        orderRepository.save(order);

        return "Order accepted for delivery";
    }

    public String verifyOtpAndDeliver(Long orderId, String enteredOtp) {
        Order order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            return "Order not found";
        }

        if (!order.getOtp().equals(enteredOtp)) {
            return "Invalid OTP";
        }

        order.setStatus("DELIVERED");
        order.setDeliveredAt(LocalDateTime.now());

        orderRepository.save(order);

        return "Order delivered successfully";
    }

    public List<Order> getPartnerDeliveries(Long partnerId) {
        return orderRepository.findByDeliveryPartnerId(partnerId);
    }

    public long getDeliveredCount(Long partnerId) {
        return orderRepository
                .findByDeliveryPartnerId(partnerId)
                .stream()
                .filter(order -> "DELIVERED".equals(order.getStatus()))
                .count();
    }
}