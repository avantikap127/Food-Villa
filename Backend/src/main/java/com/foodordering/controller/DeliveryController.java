package com.foodordering.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodordering.entity.Order;
import com.foodordering.service.DeliveryService;

@RestController
@RequestMapping("/api/delivery")
@CrossOrigin(origins = "http://localhost:3000")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @GetMapping("/pending")
    public List<Order> getPendingOrders() {
        return deliveryService.getPendingOrders();
    }

    @PutMapping("/accept/{orderId}/{partnerId}")
    public String acceptOrder(
            @PathVariable Long orderId,
            @PathVariable Long partnerId
    ) {
        return deliveryService.acceptOrder(orderId, partnerId);
    }

    @PutMapping("/verify-otp/{orderId}")
    public String verifyOtp(
            @PathVariable Long orderId,
            @RequestParam String otp
    ) {
        return deliveryService.verifyOtpAndDeliver(orderId, otp);
    }

    @GetMapping("/partner/{partnerId}")
    public List<Order> getPartnerOrders(
            @PathVariable Long partnerId
    ) {
        return deliveryService.getPartnerDeliveries(partnerId);
    }

    @GetMapping("/dashboard/{partnerId}")
    public long getDeliveredCount(
            @PathVariable Long partnerId
    ) {
        return deliveryService.getDeliveredCount(partnerId);
    }
}