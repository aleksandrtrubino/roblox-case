package ru.group.robloxcase.promocode;

import java.util.List;

public interface PromoCodeService {

//    User create(UserDto user);
//    User patchById(Long userId, UserDto userDto);
//    User findById(Long userId);
//    void deleteById(Long userId);
//
//    List<User> findAll();

    PromoCode create(PromoCodeDto promoCodeDto);
    PromoCode patchById(Long promoCodeId, PromoCodeDto promoCodeDto);
    PromoCode findById(Long promoCodeId);
    void deleteById(Long promoCodeId);

    List<PromoCode> findAll();
    PromoCode findByCode(String code);
}
