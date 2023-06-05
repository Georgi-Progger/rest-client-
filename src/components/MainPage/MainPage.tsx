import React , { useState , useEffect} from 'react';
import "./MainPage.css"
import axios from "axios";
import InputMask from 'react-input-mask';


interface FormData {
  firstName: string;
  lastName: string;
  telephone: string;
  course: string;
  comment: string;
}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  telephone: string;
  course: string;
  comment: string;
}


const MainPage : React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    telephone: '',
    course: '',
    comment: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/v1/users/create', formData);
      console.log('Data submitted successfully!');
    } catch (error) {
      // Request failed, handle error
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:8080/api/v1/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Введите имя студента</p>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <p>Введите фамилию студента</p>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <p>Введите телефон студента</p>
            <p>Введите телефое студента</p>
            <InputMask className='phone form-control'
                id="input"
                name="telephone"
                value={formData.telephone}
                onChange={handleInputChange}
                mask="+7 999 999 99 99"
                maskPlaceholder=" "
                required
                style={{ display: "block" }}
              />
          </label>
        <label>
          <p>Введите курс студента</p>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <p>Введите комментарий студента</p>
          <input
            type="text"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Отправить</button>
    </form>
    
    <div>
      <h1>Список студентов</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            ID {user.id}<br />
            Имя {user.firstName}  <br></br>
            Фамилия{user.lastName}  <br></br>
            Телефон {user.telephone} <br></br>
            Курс {user.course} и комментарий к курсу "{user.comment}"
          </li>
        ))}
      </ul>
    </div>
  </div>
);
}

export default MainPage;
