package kh.react.board.minigame.service;

import kh.react.board.minigame.model.BodyLanguageGroup;
import kh.react.board.minigame.model.BodyLanguageItem;
import kh.react.board.minigame.repository.BodyLanguageGroupRepository;
import kh.react.board.minigame.repository.BodyLanguageItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BodyLanguageService {

    @Autowired
    private BodyLanguageGroupRepository groupRepository;

    @Autowired
    private BodyLanguageItemRepository itemRepository;

    public List<BodyLanguageGroup> getAllGroups() {
        return groupRepository.findAll();
    }

    public List<BodyLanguageItem> getItemsByGroup(Integer groupId) {
        return itemRepository.findByGroupId(groupId);
    }

    public BodyLanguageGroup createOrUpdateGroup(BodyLanguageGroup group) {
        return groupRepository.save(group);
    }

    public BodyLanguageItem createOrUpdateItem(BodyLanguageItem item) {
        return itemRepository.save(item);
    }

    public void deleteGroup(Integer groupId) {
        groupRepository.deleteById(groupId);
    }

    public void deleteItem(Integer itemId) {
        itemRepository.deleteById(itemId);
    }

    public BodyLanguageGroup getGroupByGroupId(Integer groupId) {

        return groupRepository.getReferenceById(groupId);
    }
}

