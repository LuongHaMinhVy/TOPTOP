package com.back.auth.controller;

import com.back.auth.model.dto.response.AuthResponse;
import com.back.common.utils.exception.AppException;
import com.back.common.utils.exception.ErrorCode;
import com.back.config.OAuth2StateCache;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth/oauth2")
@RequiredArgsConstructor
public class OAuth2CallbackController {

    private final OAuth2StateCache oAuth2StateCache;

    @GetMapping("/exchange")
    public ResponseEntity<AuthResponse> exchange(@RequestParam String state) {
        AuthResponse authResponse = oAuth2StateCache.consumeAndRemove(state);
        if (authResponse == null) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
        return ResponseEntity.ok(authResponse);
    }
}