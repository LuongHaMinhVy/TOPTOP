package com.back.user.service;

import com.back.auth.security.jwt.JwtService;
import com.back.common.utils.exception.AppException;
import com.back.common.utils.exception.ErrorCode;
import com.back.user.mapper.UserInfoMapper;
import com.back.user.model.dto.response.UserInfo;
import com.back.user.model.entity.User;
import com.back.user.repo.IRoleRepo;
import com.back.user.repo.IUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService{
    private final IUserRepo userRepo;
    private final IRoleRepo roleRepo;
    private final JwtService jwtService;

    @Override
    public UserInfo getUserInfo(String accessToken){
        User user = userRepo.findByEmail(jwtService.extractEmail(accessToken))
                .orElseThrow(() -> new AppException(ErrorCode.WRONG_EMAIL_OR_PASSWORD));

        return UserInfoMapper.buildUserInfo(user);
    }
}
