package ru.group.robloxcase.promocode;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.group.robloxcase.exception.NotFoundException;
import ru.group.robloxcase.promocode.type.PromoCodeType;

import java.util.List;

@Service
public class PromoCodeServiceImpl implements PromoCodeService {

    private final PromoCodeRepository promoCodeRepository;

    public PromoCodeServiceImpl(PromoCodeRepository promoCodeRepository) {
        this.promoCodeRepository = promoCodeRepository;
    }

    @Transactional
    @Override
    public PromoCode create(PromoCodeDto promoCodeDto) {
        String code = promoCodeDto.code();
        Integer number = promoCodeDto.number(); // Added to handle the number field
        Long typeId = promoCodeDto.typeId();
        Integer usesLeft = promoCodeDto.usesLeft();

        // Determine the PromoCodeType based on typeId
        PromoCodeType promoCodeType = getPromoCodeTypeById(typeId);

        // Create the PromoCode entity including the new number field
        PromoCode promoCode = new PromoCode(code, number, promoCodeType, usesLeft);
        return promoCodeRepository.save(promoCode);
    }

    @Transactional
    @Override
    public PromoCode patchById(Long promoCodeId, PromoCodeDto promoCodeDto) {
        PromoCode promoCode = promoCodeRepository.findById(promoCodeId)
                .orElseThrow(() -> new NotFoundException(String.format("PromoCode with id %1$s not found", promoCodeId)));

        String code = promoCodeDto.code();
        Integer number = promoCodeDto.number(); // Added to handle the number field
        Long typeId = promoCodeDto.typeId();
        Integer usesLeft = promoCodeDto.usesLeft();

        if (code != null) {
            promoCode.setCode(code);
        }
        if (number != null) {
            promoCode.setNumber(number);
        }
        if (typeId != null) {
            PromoCodeType promoCodeType = getPromoCodeTypeById(typeId);
            promoCode.setType(promoCodeType);
        }
        if (usesLeft != null) {
            promoCode.setUsesNumber(usesLeft);
        }

        return promoCodeRepository.save(promoCode);
    }

    @Override
    public PromoCode findById(Long promoCodeId) {
        return promoCodeRepository.findById(promoCodeId)
                .orElseThrow(() -> new NotFoundException(String.format("PromoCode with id %1$s not found", promoCodeId)));
    }

    @Override
    public void deleteById(Long promoCodeId) {
        promoCodeRepository.deleteById(promoCodeId);
    }

    @Override
    public List<PromoCode> findAll() {
        return promoCodeRepository.findAll();
    }

    @Override
    public PromoCode findByCode(String code) {
        return promoCodeRepository.findByCode(code)
                .orElseThrow(() -> new NotFoundException(String.format("PromoCode with code %1$s not found", code)));
    }

    /**
     * Helper method to get the PromoCodeType based on typeId.
     */
    private PromoCodeType getPromoCodeTypeById(Long typeId) {
        if (typeId.equals(PromoCodeType.SUM.getId())) {
            return PromoCodeType.SUM;
        } else if (typeId.equals(PromoCodeType.PERCENT.getId())) {
            return PromoCodeType.PERCENT;
        } else {
            throw new NotFoundException(String.format("PromoCodeType with ID=%1$s not found", typeId));
        }
    }
}
