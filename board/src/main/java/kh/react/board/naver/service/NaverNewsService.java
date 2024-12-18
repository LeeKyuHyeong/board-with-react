package kh.react.board.naver.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NaverNewsService {

    @Value("${naver.api.client-id}")
    private String clientId;

    @Value("${naver.api.client-secret}")
    private String clientSecret;

    public List<Map<String, Object>> getBaseballNews() {
        String url = "https://openapi.naver.com/v1/search/news.json?query=야구&display=100&start=1&sort=sim";

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
        List<Map<String, Object>> baseballNews = new ArrayList<>();
        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject jsonResponse = new JSONObject(response.getBody());
            JSONArray items = jsonResponse.getJSONArray("items");

            // 한국 야구 관련 뉴스만 필터링
            for (int i = 0; i < items.length(); i++) {
                JSONObject item = items.getJSONObject(i);

                for(String s : item.keySet()) {
                    System.out.println("key : " + s + ", value : " + item.get(s));
                }

                Map<String, Object> params = new HashMap<>();

                String title = item.getString("title").replaceAll("<b>", " ").replaceAll("</b>", " ");
                String description = item.getString("description").replaceAll("<b>", " ").replaceAll("</b>", " ");

                String link = item.getString("link");
                String originallink = item.getString("originallink");
                String dt = item.getString("pubDate");

                // 한국 야구 관련 키워드로 필터링
                if (title.contains("KBO") || title.contains("한국 야구") || title.contains("프로 야구") || title.contains("kbo") || title.contains("미국프로 야구") || title.contains("리틀 야구")) {

                    params.put("title", title);
                    params.put("link", link);
                    params.put("description", description);
                    params.put("originallink", originallink);
                    params.put("dt", dt);

                    baseballNews.add(params);
                }
            }
        }

        return baseballNews;
    }
}
