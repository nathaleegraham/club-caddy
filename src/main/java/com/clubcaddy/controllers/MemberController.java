package com.clubcaddy.controllers;

import com.clubcaddy.models.Member;
import com.clubcaddy.repositories.MemberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberRepository memberRepository;

    public MemberController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @GetMapping
    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    @GetMapping("/{memberId}")
    public Member getMemberById(@PathVariable("memberId") long memberId) {
        return memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<Member> addMember(Member member) throws URISyntaxException {
        Member savedMember = memberRepository.save(member);
        return ResponseEntity.created(new URI("/members/" + savedMember.getMemberId())).body(savedMember);
    }

    @PutMapping("/{memberId}")
    public ResponseEntity<Member> updateMember(@PathVariable("memberId") long memberId, @RequestBody Member memberUpdated) throws URISyntaxException {
        Member existingMember = memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
        existingMember.setFirstName(memberUpdated.getFirstName());
        existingMember.setLastName(memberUpdated.getLastName());
        existingMember.setCartSpace(memberUpdated.getCartSpace());
        existingMember.setClubSpace(memberUpdated.getClubSpace());
        existingMember.setHasCartLease(memberUpdated.getHasCartLease());
        memberRepository.save(existingMember);
        return ResponseEntity.created(new URI("/members/" + existingMember.getMemberId())).body(existingMember);
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<Member> deleteMember(@PathVariable("memberId") long memberId) {
        Member memberById = getMemberById(memberId);
        memberRepository.deleteById(memberById.getId());
        return ResponseEntity.ok().build();
    }
}
