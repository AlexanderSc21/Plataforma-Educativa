package com.edu.plataforma.controller;

import com.edu.plataforma.model.Certificate;
import com.edu.plataforma.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/certificates")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certificate> getCertificateById(@PathVariable Long id) {
        Optional<Certificate> certificate = certificateRepository.findById(id);
        return certificate.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Certificate createCertificate(@RequestBody Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certificate> updateCertificate(@PathVariable Long id, @RequestBody Certificate certificateDetails) {
        Optional<Certificate> optionalCertificate = certificateRepository.findById(id);
        if (optionalCertificate.isPresent()) {
            Certificate certificate = optionalCertificate.get();
            certificate.setUser(certificateDetails.getUser());
            certificate.setCourse(certificateDetails.getCourse());
            certificate.setIssuedAt(certificateDetails.getIssuedAt());
            certificate.setCertificateCode(certificateDetails.getCertificateCode());
            certificate.setFinalGrade(certificateDetails.getFinalGrade());
            Certificate updatedCertificate = certificateRepository.save(certificate);
            return ResponseEntity.ok(updatedCertificate);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        if (certificateRepository.existsById(id)) {
            certificateRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}