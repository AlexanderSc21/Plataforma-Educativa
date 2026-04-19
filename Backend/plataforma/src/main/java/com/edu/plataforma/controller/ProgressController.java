package com.edu.plataforma.controller;

import com.edu.plataforma.model.Progress;
import com.edu.plataforma.repository.ProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    @Autowired
    private ProgressRepository progressRepository;

    @GetMapping
    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(@PathVariable Long id) {
        Optional<Progress> progress = progressRepository.findById(id);
        return progress.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Progress createProgress(@RequestBody Progress progress) {
        return progressRepository.save(progress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Progress> updateProgress(@PathVariable Long id, @RequestBody Progress progressDetails) {
        Optional<Progress> optionalProgress = progressRepository.findById(id);
        if (optionalProgress.isPresent()) {
            Progress progress = optionalProgress.get();
            progress.setUser(progressDetails.getUser());
            progress.setLesson(progressDetails.getLesson());
            progress.setCompleted(progressDetails.getCompleted());
            progress.setCompletionDate(progressDetails.getCompletionDate());
            Progress updatedProgress = progressRepository.save(progress);
            return ResponseEntity.ok(updatedProgress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgress(@PathVariable Long id) {
        if (progressRepository.existsById(id)) {
            progressRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}