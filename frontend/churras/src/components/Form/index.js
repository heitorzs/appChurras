import React, { useState } from 'react';
import './style.css'

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    };

    return (
        <section className='formulario'>
            <form className="form" onSubmit={handleSubmit}>
            <h2>Cadastra seu evento:</h2>
             <label>
                    Date:
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                </label>
                    <input placeholder="Digite Nome do Evento" type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    <input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                <label>
                    Message:
                    <textarea name="message" value={formData.message} onChange={handleInputChange} />
                </label>
                <button type="submit">Cadastrar</button>
            </form>
        </section>
    );
}

export default Form;

