package kh.react.board.naver.service;

import kh.react.board.naver.model.News;
import kh.react.board.naver.repository.NewsRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
public class NewsService {

    @Value("${naver.api.client-id}")
    private String clientId;

    @Value("${naver.api.client-secret}")
    private String clientSecret;

    @Autowired
    NewsRepository newsRepository;

    public Page<News> getFilteredNews(String newsType, Date pubDate, String title, Pageable pageable) {
        return newsRepository.findByNewsTypeAndPubDateAndTitleContaining(newsType, pubDate, title, pageable);
    }

    //통합
    public int fetchAndSaveNews(String newsType) {
        int result = 0;

        String queryName = switch (newsType) {
            case "baseball" -> "야구";
            case "soccer" -> "축구";
            case "volleyball" -> "배구";
            default -> "";
        };

        try {
            String url = "https://openapi.naver.com/v1/search/news.json?query="+queryName+"&start=1&sort=sim&display=100";

            // REST 요청 설정
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-Naver-Client-Id", clientId);
            headers.set("X-Naver-Client-Secret", clientSecret);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

            // 응답 데이터 처리
            List<News> newsList = new ArrayList<>();
            if (response.getStatusCode() == HttpStatus.OK) {
                JSONObject jsonResponse = new JSONObject(response.getBody());
                JSONArray items = jsonResponse.getJSONArray("items");

                // 패치로 저장된 기사 수
                int cnt = 0;

                for (int i = 0; i < items.length(); i++) {
                    JSONObject item = items.getJSONObject(i);

                    String originalLink = (String) item.get("originallink"); // originalLink 값

                    // 중복 체크
                    if (newsRepository.existsById(originalLink)) {
                        continue; // 중복된 링크는 건너뜀
                    }

                    News news = new News();
                    news.setOriginalLink(originalLink);
                    news.setTitle(item.get("title").toString().replaceAll("<[^>]*>", "")); // HTML 태그 제거
                    news.setDescription(item.get("description").toString().replaceAll("<[^>]*>", ""));

                    news.setNewsType(newsType); // 구분자
                    news.setCreatedDate(LocalDate.now()); // 저장 날짜

                    SimpleDateFormat parseDateFormat = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss Z", Locale.ENGLISH);

                    Date parseDate = parseDateFormat.parse(item.get("pubDate").toString());

                    news.setPubDate(parseDate); //보도날짜

                    newsList.add(news);
                    cnt++;
                }
                // 데이터 저장
                newsRepository.saveAll(newsList);

                System.out.println("News fetched and saved successfully at " + LocalDate.now());
                result = cnt;
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error occurred during news fetch.");
        }
        return result;
    }

    /*배치*/
}
