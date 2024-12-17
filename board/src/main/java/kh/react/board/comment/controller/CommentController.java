package kh.react.board.comment.controller;

import jakarta.servlet.http.HttpSession;
import kh.react.board.boardManage.repository.BoardRepository;
import kh.react.board.comment.model.Comment;
import kh.react.board.comment.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BoardRepository boardRepository;

    // 댓글 등록
    @PostMapping("/{boardId}")
    public ResponseEntity<?> addComment(@PathVariable Long boardId, @RequestBody Comment comment, HttpSession session) {
        String loggedInUser = (String) session.getAttribute("userId");

        if (loggedInUser == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        return boardRepository.findById(boardId).map(board -> {
            comment.setBoard(board);
            comment.setAuthor(loggedInUser);
            comment.setCreatedDt(LocalDateTime.now());
            commentRepository.save(comment);
            return ResponseEntity.ok("Comment added successfully");
        }).orElse(ResponseEntity.status(404).body("Board not found"));
    }

    // 댓글 목록 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long boardId) {
        List<Comment> comments = commentRepository.findByBoardId(boardId);
        return ResponseEntity.ok(comments);
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(@PathVariable Long commentId, @RequestBody Comment updatedComment, HttpSession session) {
        String loggedInUser = (String) session.getAttribute("userId");

        return commentRepository.findById(commentId).map(comment -> {
            if (!comment.getAuthor().equals(loggedInUser)) {
                return ResponseEntity.status(403).body("You are not authorized to update this comment.");
            }
            comment.setContent(updatedComment.getContent());
            commentRepository.save(comment);
            return ResponseEntity.ok("Comment updated successfully");
        }).orElse(ResponseEntity.status(404).body("Comment not found"));
    }

    // 댓글 삭제
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId, HttpSession session) {
        String loggedInUser = (String) session.getAttribute("userId");

        return commentRepository.findById(commentId).map(comment -> {
            if (!comment.getAuthor().equals(loggedInUser)) {
                return ResponseEntity.status(403).body("You are not authorized to delete this comment.");
            }
            commentRepository.delete(comment);
            return ResponseEntity.ok("Comment deleted successfully");
        }).orElse(ResponseEntity.status(404).body("Comment not found"));
    }
}
