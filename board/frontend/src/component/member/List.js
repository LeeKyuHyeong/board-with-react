import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const MemberListContainer = styled.div`
  padding: 2rem;
  background-color: #f4f4f4;
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 1rem;
  background-color: #333;
  color: white;
  font-size: 1.1rem;
`;

const TableData = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin: 0.5rem;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const PageButton = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const PageNumber = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
  background-color: ${props => (props.active ? '#333' : '#ccc')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const SizeSpan = styled.span`
	
`;

const SizeSelect = styled.select`
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 4px;
	
`;

const List = () => {
  const [members, setMembers] = useState([]);
	const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
	const [page, setPage] = useState(0); // 현재 페이지
  const [size, setSize] = useState(3); // 페이지 크기 (한 번에 보여줄 사용자 수)
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수


	// 페이지 로드 시 기본적으로 모든 회원을 가져오기
	useEffect(() => {
		fetchMembers('', '');  // 초기값은 빈 문자열로 전체 회원 조회
	}, []);

  // 서버에서 사용자 목록을 가져오는 함수
  // useEffect(() => {
	const fetchMembers = async (name, email, page, size) => {
		try {
			setLoading(true);
			const response = await axios.get(`http://localhost:8011/api/members?`, {params : {name, email, page, size}});
			setMembers(response.data.content); // 'content'는 페이징된 데이터
			setTotalPages(response.data.totalPages); // 전체 페이지 수
			setSize(response.data.size);
			setLoading(false);
		} catch (error) {
			setError('Error fetching members');
			setLoading(false);
		}
	};

    // fetchMembers();
  // }, [page, size]);
	
	// 검색 버튼 클릭 시
  const handleSearch = () => {
    fetchMembers(name, email, page, size);  // 현재 입력된 검색 조건으로 회원 목록을 가져옴
  };

	// 페이지 변경 시
  const handlePageChange = (newPage) => {
		setPage(newPage);
    fetchMembers(name, email, newPage, size);  // 페이지 번호 변경 시 회원 목록 갱신
  };

	// 페이지 로드 시 기본적으로 모든 회원을 가져오기
  useEffect(() => {
    fetchMembers('', '');  // 초기값은 빈 문자열로 전체 회원 조회
  }, []);

	const handleDelete = async (id) => {
		const confirmDelete = window.confirm('Are you sure you want to delete this member?');
    if(confirmDelete) {
			try {
				await axios.delete(`http://localhost:8011/api/members/${id}`);
				setMembers(members.filter((member) => member.id !== id)); // 삭제된 회원을 리스트에서 제거
			} catch (error) {
				alert('Failed to delete member');
			}
		}
  };

	const activeEnter = (e) => {
    if(e.key === "Enter") {
      handleSearch();
    }
  }

	const handleBtnClick = (newPage) => {
    setPage(newPage);
    fetchMembers(name, email, newPage, size);  // 페이지 번호 변경 시 회원 목록 갱신
  };

	const handleSize = (newSize) => {
		setSize(newSize);
		setPage(0);
		fetchMembers(name, email, page, newSize);  // 페이지 번호 변경 시 회원 목록 갱신
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MemberListContainer>
      <h2>Member List</h2>

			{/* 검색 폼 */}
			<div>
				<Input
					type="text"
					placeholder="Search by name"
					value={name}
					onChange={(e) => setName(e.target.value)} // 이름 입력 처리
					onKeyDown={(e) => activeEnter(e)}
				/>
				<Input
					type="email"
					placeholder="Search by email"
					value={email}
					onChange={(e) => setEmail(e.target.value)} // 이메일 입력 처리
					onKeyDown={(e) => activeEnter(e)}
				/>
				<Button onClick={handleSearch}>Search</Button>
				<div style={{"float":"right"}}>
				<SizeSpan>Size</SizeSpan>
				<SizeSelect 
					name="size"
					value={size}
					onChange={(e) => handleSize(e.target.value)}>
						<option value="3">3</option>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="30">30</option>
						<option value="100">100</option>
				</SizeSelect>
				</div>
			</div>

      <Table>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Password</TableHeader>
						<TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
							<TableData>{member.name}</TableData>
              <TableData>{member.email}</TableData>
              <TableData>{member.password}</TableData>
							<TableData>
                <Button><Link to={`/members/${member.id}`} style={{"color":"white", "textDecoration":"none"}}>View Details</Link></Button>
                <DeleteButton onClick={() => handleDelete(member.id)}>Delete</DeleteButton>
								<Button><Link to={`/members/edit/${member.id}`} style={{"color":"white", "textDecoration":"none"}}>Edit</Link></Button>
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>

			{/* 페이지 번호 출력 */}
			<div style={{"display":"flex", "justifyContent":"center"}}>
        {Array.from({ length: totalPages }, (_, index) => (
          <PageNumber
            key={index}
            onClick={() => handlePageChange(index)}
            active={index === page} // 현재 페이지는 스타일 다르게
          >
            {index + 1}
          </PageNumber>
        ))}
      </div>

			{/* 페이지 이동 버튼 */}
			<div style={{"display":"flex", "justifyContent":"flex-end"}}>
        <PageButton onClick={() => handleBtnClick(page > 0 ? page - 1 : 0)}
				disabled={page === 0}>
          Previous
        </PageButton>
        <PageButton onClick={() => handleBtnClick(page < totalPages - 1 ? page + 1 : totalPages - 1)}
				disabled={page === totalPages - 1}>
          Next
        </PageButton>
      	<PageButton onClick={() => window.location.reload()}>Refresh</PageButton>
      </div>
    </MemberListContainer>
  );
};

export default List;