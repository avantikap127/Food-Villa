package com.foodordering.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long customerId;
    private Long restaurantId;
    private String deliveryAddress;
    private String paymentMode;
    private Double totalAmount;
    private String status;
    private LocalDateTime orderedAt;
    private String orderedItems;
    private Long deliveryPartnerId;
    private String otp;
    private Boolean paid;
    private LocalDateTime deliveredAt;

    public Order() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getOrderedAt() {
        return orderedAt;
    }

    public void setOrderedAt(LocalDateTime orderedAt) {
        this.orderedAt = orderedAt;
    }

    public String getOrderedItems() {
    return orderedItems;
}

    public void setOrderedItems(String orderedItems) {
        this.orderedItems = orderedItems;
    }

    public Long getDeliveryPartnerId() {
    return deliveryPartnerId;
}

public void setDeliveryPartnerId(Long deliveryPartnerId) {
    this.deliveryPartnerId = deliveryPartnerId;
}

public String getOtp() {
    return otp;
}

public void setOtp(String otp) {
    this.otp = otp;
}

public Boolean getPaid() {
    return paid;
}

public void setPaid(Boolean paid) {
    this.paid = paid;
}

public LocalDateTime getDeliveredAt() {
    return deliveredAt;
}

public void setDeliveredAt(LocalDateTime deliveredAt) {
    this.deliveredAt = deliveredAt;
}
}