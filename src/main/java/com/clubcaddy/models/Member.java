package com.clubcaddy.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue
    private Long id;

    private String firstName;
    private String lastName;
    private Long memberId;
    private Long clubSpace;
    private String cartSpace;
    private Boolean hasCartLease;

    public Member() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public Long getClubSpace() {
        return clubSpace;
    }

    public void setClubSpace(Long clubSpace) {
        this.clubSpace = clubSpace;
    }

    public String getCartSpace() {
        return cartSpace;
    }

    public void setCartSpace(String cartSpace) {
        this.cartSpace = cartSpace;
    }

    public Boolean getHasCartLease() {
        return hasCartLease;
    }

    public void setHasCartLease(Boolean hasCartLease) {
        this.hasCartLease = hasCartLease;
    }
}
