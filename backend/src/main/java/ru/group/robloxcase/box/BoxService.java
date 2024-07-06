package ru.group.robloxcase.box;

import java.util.List;

public interface BoxService {
    Box create(BoxDto boxDto);
    Box patchById(Long boxId, BoxDto boxDto);
    Box findById(Long boxId);
    void deleteById(Long boxId);

    List<Box> findAll();
}
