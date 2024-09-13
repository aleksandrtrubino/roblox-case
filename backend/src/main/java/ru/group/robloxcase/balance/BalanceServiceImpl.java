package ru.group.robloxcase.balance;

import jakarta.annotation.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.balance_event.BalanceEvent;
import ru.group.robloxcase.balance_event.BalanceEventRepository;
import ru.group.robloxcase.promocode.PromoCode;
import ru.group.robloxcase.promocode.PromoCodeRepository;
import ru.group.robloxcase.promocode.type.PromoCodeType;
import ru.group.robloxcase.user.User;

@Service
public class BalanceServiceImpl implements BalanceService{

    private final BalanceRepository balanceRepository;
    private final BalanceEventRepository balanceEventRepository;
    private final PromoCodeRepository promoCodeRepository;

    public BalanceServiceImpl(BalanceRepository balanceRepository, BalanceEventRepository balanceEventRepository, PromoCodeRepository promoCodeRepository) {
        this.balanceRepository = balanceRepository;
        this.balanceEventRepository = balanceEventRepository;
        this.promoCodeRepository = promoCodeRepository;
    }

    @Transactional
    @Override
    public void deposit(Long userId, int sum, @Nullable String promoCodeString) {
        Balance balance = balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with id %1$s not found",userId)));
        User user = balance.getUser();
        int currentBalance = balance.getBalance();

        int sumToDeposit = 0;
        if(promoCodeString != null){
            PromoCode promoCode = promoCodeRepository.findByCode(promoCodeString)
                    .orElseThrow(()->new NotFoundException(String.format("PromoCode %1$s not found",promoCodeString)));
            if (promoCode.getUsesNumber() > promoCode.getUsers().size()){
                if(promoCode.getUsers().contains(user))
                    throw new NotFoundException(String.format("User with ID = %1$s already used PromoCode",userId));
                if(promoCode.getType().getId().equals(PromoCodeType.SUM.getId())){
                    sumToDeposit = sum + promoCode.getNumber();
                } else if (promoCode.getType().getId().equals(PromoCodeType.PERCENT.getId())) {
                    if(sum == 0)
                        throw new NotFoundException("Sum cannot be equal to 0");
                    sumToDeposit = (int)Math.ceil(sum * ((double)(promoCode.getNumber() + 100) / 100));
                }
                else
                    throw new NotFoundException("PromoCodeType does not exist");
                promoCode.getUsers().add(user);
            }
            else
                throw new NotFoundException("PromoCode is no more valid");
            promoCodeRepository.save(promoCode);
        }
        else{
            sumToDeposit = sum;
        }

        balance.setBalance(currentBalance + sumToDeposit);
        BalanceEvent balanceEvent = new BalanceEvent(balance, sumToDeposit);
        balanceRepository.save(balance);
        balanceEventRepository.save(balanceEvent);
    }

    @Transactional
    @Override
    public void spend(Long userId, int price) {
        Balance balance = balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with id %1$s not found",userId)));
        int currentBalance = balance.getBalance();
        if(currentBalance < price) {
            throw new NotFoundException("Not enough money");
        }
        else {
            balance.setBalance(currentBalance - price);
        }
        balanceRepository.save(balance);
    }

    @Override
    public Balance findByUserId(Long userId) {
        return balanceRepository.findByUserId(userId)
                .orElseThrow(()->new NotFoundException(String.format("Balance for user with id %1$s not found",userId)));
    }

}
