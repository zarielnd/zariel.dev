import React from 'react'
import { useState } from 'react';
import emailjs from '@emailjs/browser'
import Alert from './Alert';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlertMessage = (type:string, message:string) =>{
    setAlertType(type);
    setAlertMessage(message)
    setShowAlert(true);
    setTimeout(()=>{
      setShowAlert(false);
    }, 5000);
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setIsLoading(true);
    try{
      await emailjs.send("service_xuhg247", "template_lbkm8eb", {
      from_name: formData.name,
      to_name: "Zariel",
      from_email: formData.email,
      to_email: "zariel.nd@gmail.com",
      message: formData.message
    },"fKYaXr8qFMGlJKjxG");
    setIsLoading(false);
    showAlertMessage("success","Your message have been sent")
    setFormData({name:"", email:"", message:""});
    }catch(error){
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", "Something went wrong!")
    }
    
    //service_xuhg247
    //template_ilo8a1l
  };
  return (
    <section id='contact' className='relative flex items-center c-space bg-white section-spacing'>
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className='flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-black
        rounded-2xl bg-white'>
        <div className='flex flex-col items-start w-full gap-5 mb-10'>
          <h2 className='text-3xl text-black'>Let&rsquo;s Talk</h2>
          <p className='text-gray-600'>
            Whether you&rsquo;re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I&rsquo;m here to help
          </p>
        </div>
        <form className='w-full' onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label htmlFor="name" className='field-label !font-bold text-black'>Full Name</label>
            <input
              id='name'
              name='name'
              className='field-input field-input-focus !border-black text-black'
              type="text"
              placeholder='Jane Doe'
              required
              autoComplete='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='mb-5'>
            <label htmlFor="email" className='field-label !font-bold text-black'>Email</label>
            <input
              id='email'
              name='email'
              className='field-input field-input-focus !border-black text-black'
              type="text"
              placeholder='JaneDoe@gmail.com'
              required
              autoComplete='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='mb-5'>
            <label htmlFor="message" className='field-label !font-bold text-black'>Message</label>
            <textarea
              id='message'
              name='message'
              className='field-input field-input-focus !border-black text-black'
              rows={4}
              placeholder='Share your thoughts'
              required
              autoComplete='message'
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer
            bg-black from-black to-gray-800 hover-animation'>
            {!isLoading?"Send":"Sending"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact