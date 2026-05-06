package com.back.user.service;

import com.back.user.model.dto.response.UserInfo;

public interface IUserService{
    UserInfo getUserInfo(String accessToken);
}
