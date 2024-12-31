package kh.react.board.minigame.controller;

import jakarta.servlet.http.HttpSession;
import kh.react.board.minigame.model.BodyLanguageGroup;
import kh.react.board.minigame.model.BodyLanguageItem;
import kh.react.board.minigame.service.BodyLanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/body-language")
public class BodyLanguageController {

    @Autowired
    private BodyLanguageService bodyLanguageService;

    @GetMapping("/groups")
    public List<BodyLanguageGroup> getAllGroups() {
        return bodyLanguageService.getAllGroups();
    }

    @GetMapping("/groups/{groupId}/items")
    public List<BodyLanguageItem> getItemsByGroup(@PathVariable Integer groupId) {
        return bodyLanguageService.getItemsByGroup(groupId);
    }

//    @PostMapping("/groups")
//    public BodyLanguageGroup createGroup(@RequestBody BodyLanguageGroup group) {
//        return bodyLanguageService.createOrUpdateGroup(group);
//    }

    @PostMapping("/groups")
    public ResponseEntity<BodyLanguageGroup> addGroup(@RequestBody BodyLanguageGroup group, HttpSession session) {
        // 이력 정보 설정
        group.setRegDt(new Date());
        group.setRegId(session.getId());
        group.setUseYn("Y");

        BodyLanguageGroup savedGroup = bodyLanguageService.createOrUpdateGroup(group);
        return ResponseEntity.ok(savedGroup);
    }

//    @PostMapping("/items")
//    public BodyLanguageItem createItem(@RequestBody BodyLanguageItem item, @PathVariable Integer groupId) {
//        System.out.println("createItem : " + item.getName());
//        System.out.println("groupId : " + groupId);
//        item.setGroup(bodyLanguageService.getGroupByGroupId(groupId));
//        return bodyLanguageService.createOrUpdateItem(item);
//    }

    @PostMapping("/items")
    public ResponseEntity<BodyLanguageItem> addItem(@RequestBody BodyLanguageItem item, HttpSession session) {
        // 이력 정보 설정
        item.setRegDt(new Date());
        item.setRegId(session.getId());
        item.setUseYn("Y");

        BodyLanguageItem savedItem = bodyLanguageService.createOrUpdateItem(item);
        return ResponseEntity.ok(savedItem);
    }

    @DeleteMapping("/groups/{groupId}")
    public void deleteGroup(@PathVariable Integer groupId) {
        bodyLanguageService.deleteGroup(groupId);
    }

    @DeleteMapping("/items/{itemId}")
    public void deleteItem(@PathVariable Integer itemId) {
        bodyLanguageService.deleteItem(itemId);
    }
}
