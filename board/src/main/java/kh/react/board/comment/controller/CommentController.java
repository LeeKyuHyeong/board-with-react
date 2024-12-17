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
}
