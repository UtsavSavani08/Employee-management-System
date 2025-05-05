import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function EmployeeForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        employeeType: 'Full-time',
        profilePic: null
    });

    useEffect(() => {
        if (id) {
            fetchEmployee();
        }
    }, [id]);

    const fetchEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const { name, email, position, employeeType } = response.data;
            setFormData({ name, email, position, employeeType });
        } catch (error) {
            setError('Failed to fetch employee details');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePic') {
            setFormData(prev => ({
                ...prev,
                profilePic: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            if (id) {
                await axios.put(`http://localhost:5000/api/employees/${id}`, formDataToSend, config);
            } else {
                await axios.post('http://localhost:5000/api/employees', formDataToSend, config);
            }
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to save employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="employee-form">
            <h2>{id ? 'Edit Employee' : 'Add New Employee'}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Employee Type:</label>
                    <select
                        name="employeeType"
                        value={formData.employeeType}
                        onChange={handleChange}
                        required
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        name="profilePic"
                        onChange={handleChange}
                        accept="image/*"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : (id ? 'Update Employee' : 'Add Employee')}
                </button>
            </form>
        </div>
    );
}

export default EmployeeForm;