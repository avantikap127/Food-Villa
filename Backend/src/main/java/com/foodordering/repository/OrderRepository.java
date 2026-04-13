package com.foodordering.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.foodordering.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerIdOrderByOrderedAtDesc(Long customerId);
    List<Order> findByStatus(String status);
    List<Order> findByDeliveryPartnerId(Long deliveryPartnerId);
}