package kh.react.board.util;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public class PagingUtil {

    public static <T> Page<T> getPagedData(List<T> data, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        int start = Math.min((int) pageable.getOffset(), data.size());
        int end = Math.min((start + pageable.getPageSize()), data.size());
        List<T> pagedData = data.subList(start, end);
        return new PageImpl<>(pagedData, pageable, data.size());
    }
}
