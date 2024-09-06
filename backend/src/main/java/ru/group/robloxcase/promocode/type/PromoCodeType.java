package ru.group.robloxcase.promocode.type;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "promo_code_types")
public class PromoCodeType {

    public static final PromoCodeType SUM = new PromoCodeType(1L, "sum");
    public static final PromoCodeType PERCENT = new PromoCodeType(2L, "percent");

    @Id
    @Column(name = "id")
    Long id;

    @Column(name = "name")
    String name;

    public PromoCodeType() {
    }

    public PromoCodeType(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
