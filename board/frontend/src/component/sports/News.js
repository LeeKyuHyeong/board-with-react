import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonUtils from '../common/CommonUtils';

const News = () => {
    const [news, setNews] = useState([]); // 뉴스 데이터
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [total, setTotal] = useState(0); // 전체 데이터 개수
    const [filters, setFilters] = useState({
        newsType: 'baseball',
        pubDate: new Date().toISOString().split('T')[0], // 오늘 날짜로 기본값 설정
        title: '',
    }); // 검색 조건
    const [page, setPage] = useState(1); // 현재 페이지

    const fetchNews = async (currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8011/api/news/baseball', {
                params: {
                    newsType: filters.newsType,
                    pubDate: filters.pubDate,
                    title: filters.title,
                    page: currentPage - 1,
                    size: 10, // 페이지 당 항목 수
                },
            });
            setNews(response.data.content); // 데이터 설정
            setTotal(response.data.totalElements); // 전체 개수 설정
        } catch (error) {
            console.error('Failed to fetch news', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(page);
    }, [filters, page]);

    const handleSearch = () => {
        setPage(1); // 검색 조건 변경 시 페이지 초기화
        fetchNews(1);
    };

    return (
        <div>
            <h1>News Search</h1>
            <div style={{ marginBottom: '20px' }}>
                <label>
                    News Type:
                    <select
                        value={filters.newsType}
                        onChange={(e) => setFilters({ ...filters, newsType: e.target.value })}
                        style={{ margin: '0 10px' }}
                    >
                        <option value="baseball">Baseball</option>
                        <option value="soccer">Soccer</option>
                        <option value="volleyball">Volleyball</option>
                    </select>
                </label>
                <input
                    type="text"
                    placeholder="Title (optional)"
                    style={{ width: '200px', marginRight: '10px' }}
                    value={filters.title}
                    onChange={(e) => setFilters({ ...filters, title: e.target.value })}
                />
                <input
                    type="date"
                    style={{ marginRight: '10px' }}
                    value={filters.pubDate}
                    onChange={(e) => setFilters({ ...filters, pubDate: e.target.value })}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Publication Date</th>
                                <th>Original Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.length > 0 ? (
                                news.map((item) => (
                                    <tr key={item.originalLink}>
                                        <td>{CommonUtils.decodeHtml(item.title)}</td>
                                        <td>{item.pubDate}</td>
                                        <td>
                                            <a href={item.originalLink} target="_blank" rel="noopener noreferrer">
                                                {item.originalLink}
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center' }}>
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        {Array.from({ length: Math.ceil(total / 10) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index + 1)}
                                style={{
                                    margin: '0 5px',
                                    padding: '5px 10px',
                                    backgroundColor: page === index + 1 ? '#007bff' : '#f0f0f0',
                                    color: page === index + 1 ? '#fff' : '#000',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default News;
