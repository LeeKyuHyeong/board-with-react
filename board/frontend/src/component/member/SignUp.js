import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const FormContainer = styled.div`
  background-color: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 93%;
  padding: 0.8rem;
  margin: 0.8rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin: 0.8rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const SignUp = () => {
	const [formData, setFormData] = useState({
		id:'',
    name: '',
    email: '',
    password: '',
		role: ''
  });

	const [message, setMessage] = useState('');

	const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

	const navi = useNavigate();

	const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입 처리 로직을 추가하면 됩니다.

		try {
      // Spring Boot 서버로 POST 요청
			console.log('회원가입 데이터:', formData);

      const response = await axios.post('http://localhost:8011/api/members/', formData);

      alert(response.data); // 성공 메시지
			navi('/login');
    } catch (error) {
      setMessage(error.response.data); // 에러 메시지
    }
  };


	return (
		<SignUpContainer>
      <FormContainer>
        <Title>Sign Up</Title>
        <form onSubmit={handleSubmit}>
					<Input
            type="text"
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
						required
          />
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
						required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
						required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
						required
          />
					<Select name="role" required onChange={handleChange}>
						<option value="">===select role===</option>
						<option value="user">user</option>
					</Select>
          <Button type="submit">Sign Up</Button>
        </form>
				{message && <p>{message}</p>}
      </FormContainer>
    </SignUpContainer>
	);
};

export default SignUp;