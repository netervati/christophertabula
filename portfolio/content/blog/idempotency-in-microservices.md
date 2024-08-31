---
title: Idempotency in microservices
sitemap:
  loc: /blog/idempotency-in-microservices
  lastmod: 2024-08-07
  changefreq: monthly
  priority: 0.8
---

<span class="text-cyan-500">August 04, 2024</span>

# Idempotency in microservices

<span class="inline-block bg-cyan-400 my-8 h-1 w-[5rem]"></span>

When working with microservices, one of the most problematic issues you might encounter is duplicate records. This typically happens when a service with a retry mechanism attempts to create a record in another service but fails to complete the transaction. Consequently, the service retries the transaction, which can result in duplicate records.

This problem often remains hidden until the system scales up and starts experiencing issues like performance degradation and timeouts, making it more damaging when it eventually surfaces. Therefore, it is crucial to design the system to handle retries safely. In other words, the system should be _idempotent_.

## Description

**Idempotence** means that performing an operation multiple times will produce the same result as performing it only once. This can apply to scenarios such as a background job creating a new record in the database and being re-executed with the same job signature, or a service sending a POST request to another service multiple times with the same request body. In both cases, the result should be that only one record is created.

## Implementation

Let's have a look at this example below:

![A distributed system with no idempotency](/img/distributed-system-with-no-idempotency.png)

The **Checkouts microservice** sent a POST request with the parameters `customer_id` and `amount` to record a payment in the **Transactions microservice** but failed to receive a response due to a timeout. It then retried the request, resulting in duplicate records. The issue with this system is that the Transactions microservice does not have sufficient information to determine if a request is a duplicate. It cannot use `customer_id` and `amount` as the basis for this check because the same customer may perform multiple payments with the same amount in the future. Therefore, a different ID is needed to ensure only one entry per transaction. This ID is called the _idempotency key_.

Here's the re-designed architecture with idempotency key:

![An idempotent distributed system](/img/an-idempotent-distributed-system.png)

Before sending a POST request to the Transactions microservice, the Checkouts microservice sends a GET request with the `idempotency_key` as a parameter to check if a payment with the same ID already exists in the server's database. If no such entry is found, it proceeds with sending a POST request containing the parameters `customer_id`, `amount`, and `idempotency_key`. Otherwise, it skips sending the POST request.

It’s important to note that the `idempotency_key` column in the Transactions microservice's database must have a unique constraint. This ensures that if the client fails to perform an existence check, the microservice does not accept a POST request with the same ID, which could otherwise lead to duplicate payments. Additionally, the Checkouts microservice must ensure that the ID it generates is immutable for each transaction; otherwise, it may bypass the constraint in the Transactions microservice.

## Conclusion

In summary, **idempotency** is a crucial property in microservices that ensures they can handle duplicate requests without creating duplicate records. It promotes horizontal scaling and provides fault tolerance against network and server-related issues.
