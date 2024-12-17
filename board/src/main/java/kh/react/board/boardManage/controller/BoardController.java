package kh.react.board.boardManage.controller;

import jakarta.servlet.http.HttpSession;
import kh.react.board.boardManage.model.Board;
import kh.react.board.boardManage.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BoardController {

    @Autowired
    private BoardRepository boardRepository;

    // 게시글 등록
    @PostMapping("/board/")
    public ResponseEntity<?> createBoard(@RequestBody Board board, HttpSession session) {

        String userId = (String) session.getAttribute("userId");

        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized: Please login first.");
        }

        try {
            board.setAuthor(userId); // 서버에서 로그인한 ID를 author로 설정
            Board savedBoard = boardRepository.save(board);
            return ResponseEntity.ok(savedBoard);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error occurred while saving board.");
        }
    }

    // 게시글 목록 조회
    @GetMapping("/board/lists/")
    public ResponseEntity<List<Board>> getAllBoards() {
        return ResponseEntity.ok(boardRepository.findAll());
    }

    // 게시글 상세 조회
    @GetMapping("/board/{id}")
    public ResponseEntity<?> getBoardById(@PathVariable Long id) {
        Optional<Board> board = boardRepository.findById(id);
        if (board.isPresent()) {
            return ResponseEntity.ok(board.get());
        } else {
            return ResponseEntity.status(404).body("Board not found");
        }
    }

    // 게시글 수정
    @PutMapping("/board/{id}")
    public ResponseEntity<?> updateBoard(@PathVariable Long id, @RequestBody Board updatedBoard, HttpSession session) {
        String loggedInUser = (String) session.getAttribute("userId");

        Optional<Board> boardOptional = boardRepository.findById(id);
        if (boardOptional.isPresent()) {
            Board existingBoard = boardOptional.get();

            // 작성자와 로그인된 사용자가 일치하는지 검증
            if (!existingBoard.getAuthor().equals(loggedInUser)) {
                return ResponseEntity.status(403).body("You are not authorized to edit this board.");
            }

            // 제목과 내용만 수정 (작성자와 ID는 변경하지 않음)
            existingBoard.setTitle(updatedBoard.getTitle());
            existingBoard.setContent(updatedBoard.getContent());

            boardRepository.save(existingBoard);
            return ResponseEntity.ok("Board updated successfully");
        } else {
            return ResponseEntity.status(404).body("Board not found");
        }
    }

    // 게시글 삭제
    @DeleteMapping("/board/{id}")
    public ResponseEntity<?> deleteBoard(@PathVariable Long id, HttpSession session) {
        // 세션에서 로그인된 사용자 정보 가져오기
        String userId = (String) session.getAttribute("userId");

        Optional<Board> boardOptional = boardRepository.findById(id);
        if (boardOptional.isPresent()) {
            Board board = boardOptional.get();

            // 작성자와 로그인된 사용자가 같은지 확인
            if (board.getAuthor().equals(userId)) {
                boardRepository.deleteById(id);
                return ResponseEntity.ok("Board deleted successfully");
            } else {
                return ResponseEntity.status(403).body("You are not authorized to delete this board.");
            }
        } else {
            return ResponseEntity.status(404).body("Board not found");
        }
    }
}
