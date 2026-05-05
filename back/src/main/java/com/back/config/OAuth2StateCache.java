package com.back.config;

import com.back.auth.model.dto.response.AuthResponse;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Component
public class OAuth2StateCache {

    private final Map<String, AuthResponse> cache = new ConcurrentHashMap<>();

    public String store(AuthResponse authResponse) {
        String key = UUID.randomUUID().toString();
        cache.put(key, authResponse);

        Executors.newSingleThreadScheduledExecutor()
                .schedule(() -> cache.remove(key), 2, TimeUnit.MINUTES);

        return key;
    }
    
    public AuthResponse consumeAndRemove(String key) {
        return cache.remove(key);
    }
}