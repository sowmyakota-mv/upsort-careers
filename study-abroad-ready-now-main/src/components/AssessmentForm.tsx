import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';

const step1Questions = [
  { id: 1, text: 'How confident are you in managing your tuition fees and living expenses abroad without financial stress?' },
  { id: 2, text: 'How supportive is your family (emotionally or financially) regarding your decision to study abroad?' },
  { id: 3, text: 'To what extent can you work physically or mentally demanding part-time jobs (like hospitality, delivery, retail)?' },
  { id: 4, text: 'How prepared are you to live alone and handle daily responsibilities like cooking, cleaning, and budgeting?' },
  { id: 5, text: 'How familiar are you with your target country’s culture, lifestyle, and academic system?' }
];

const step2Questions = [
  { id: 6, text: 'How good is your English communication (or the language spoken in your destination country)?' },
  { id: 7, text: 'Do you have prior work experience or job knowledge that could help you find part-time work abroad?' },
  { id: 8, text: 'How strong is your mental resilience in handling homesickness, isolation, or cultural shock?' },
  { id: 9, text: 'If your family has a business, how independent are you from that in terms of personal financial planning?' },
  { id: 10, text: 'Can you maintain academic performance while juggling part-time work and personal life?' }
];

const AssessmentForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    answers: Array(step1Questions.length + step2Questions.length).fill(null)
  });

  const [errors, setErrors] = useState({
    name: '',
    contact: '',
    email: '',
    password: '',
    ratings: Array(step1Questions.length + step2Questions.length).fill('')
  });

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleAnswerChange = (index: number, score: number) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = score;

    const updatedErrors = { ...errors };
    updatedErrors.ratings[index] = '';

    setFormData({ ...formData, answers: updatedAnswers });
    setErrors(updatedErrors);
  };

  const validateLogin = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (formData.name.trim() === '') {
      newErrors.name = 'Please enter your name';
      valid = false;
    }
    if (formData.contact.trim() === '') {
      newErrors.contact = 'Please enter your contact number';
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() === '') {
      newErrors.email = 'Please enter your email';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Please enter your password';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const sendLoginEmail = () => {
    const templateParams = {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
    };

    emailjs.send('service_6m3emyd', 'template_9983ir1', templateParams, 'WV4ATcmY4I9TjdaBe')
      .then((response) => {
        console.log('Login email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send login email:', err);
      });
  };

  const handleLogin = () => {
    if (validateLogin()) {
      sendLoginEmail();
      setStep(2);
    }
  };

  const validateStep1 = () => {
    let valid = true;
    let newErrors = { ...errors, ratings: [...errors.ratings] };
    let firstErrorIndex = -1;

    step1Questions.forEach((_, index) => {
      if (formData.answers[index] === null) {
        newErrors.ratings[index] = 'Please select a rating';
        if (firstErrorIndex === -1) firstErrorIndex = index;
        valid = false;
      }
    });

    setErrors(newErrors);

    if (firstErrorIndex !== -1) {
      questionRefs.current[firstErrorIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    let newErrors = { ...errors, ratings: [...errors.ratings] };
    let firstErrorIndex = -1;

    step2Questions.forEach((_, index) => {
      const globalIndex = step1Questions.length + index;
      if (formData.answers[globalIndex] === null) {
        newErrors.ratings[globalIndex] = 'Please select a rating';
        if (firstErrorIndex === -1) firstErrorIndex = globalIndex;
        valid = false;
      }
    });

    setErrors(newErrors);

    if (firstErrorIndex !== -1) {
      questionRefs.current[firstErrorIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(3);
  };

  const handleBack = () => {
    setStep(2);
  };

  const sendAssessmentEmail = () => {
    const allQuestions = [...step1Questions, ...step2Questions];

    const answersList = allQuestions.map((question, index) => {
      return `${index + 1}. ${question.text}\nAnswer: ${formData.answers[index]}`;
    }).join('\n\n');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      answers: answersList,
    };

    emailjs.send('service_6m3emyd', 'template_9983ir1', templateParams, 'WV4ATcmY4I9TjdaBe')
      .then((response) => {
        console.log('Assessment email sent successfully!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Failed to send assessment email:', err);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) {
      sendAssessmentEmail();
      alert('Assessment submitted successfully!');
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen flex ${step === 1 ? 'items-center justify-center' : 'items-start justify-end'} p-6`}>
  <div className={`bg-white shadow-lg rounded-2xl transition-all duration-500 ${step === 1 ? 'w-[550px]' : 'w-[1000px] mr-20'} p-6`}>
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-6">
          <img src="/lovable-uploads/Upsort-career.png" alt="Upsort Careers" className="h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Upsort Career</h2>
        </div>

        {/* Step 1: Login */}
        {step === 1 && (
          <>
          <div className='min-h-screen w-[550px] flex flex-col items-center justify-center'>
            <div className="mb-4">
              <label className="block font-medium mb-1 ">Name *</label>
              <input
                type="text"
                name="name"
                placeholder='Enter your Name'
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 h-[50px] w-[300px] rounded"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Contact *</label>
              <input
                type="text"
                name="contact"
                placeholder='Enter your Contact Number'
                value={formData.contact}
                onChange={handleInputChange}
                className="w-[300px] border p-2 h-[50px] rounded"
              />
              {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                placeholder='Enter your Email'
                value={formData.email}
                onChange={handleInputChange}
                className="w-[300px] border p-2 h-[50px] rounded"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block font-medium mb-1">Password *</label>
              <input
                type="password"
                name="password"
                placeholder='Enter your Password'
                value={formData.password}
                onChange={handleInputChange}
                className="w-[300px] border p-2 h-[50px] rounded"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <Button type="button" onClick={handleLogin}>
              Register & Continue
            </Button>
            </div>
          </>
        )}

        {/* Step 2: Step 1 Questions */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Study Abroad Readiness Assessment</h2>
            <p className="text-lg font-semibold mb-4">Please rank the following questions on a scale from 1 to 10:</p>

            {step1Questions.map((question, index) => (
              <div key={question.id} className="mb-8" ref={(el) => (questionRefs.current[index] = el)}>
                <h3 className="text-lg font-semibold mb-4">
                  {index + 1}. {question.text}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <Button
                      key={num}
                      type="button"
                      variant={formData.answers[index] === num ? 'default' : 'outline'}
                      size="icon"
                      className={formData.answers[index] === num ? 'bg-blue-500 text-white' : ''}
                      onClick={() => handleAnswerChange(index, num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>

                {errors.ratings[index] && (
                  <p className="text-red-500 text-sm mt-1">{errors.ratings[index]}</p>
                )}
              </div>
            ))}

            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          </>
        )}

        {/* Step 3: Step 2 Questions */}
        {step === 3 && (
          <>
            {step2Questions.map((question, index) => {
              const globalIndex = step1Questions.length + index;

              return (
                <div key={question.id} className="mb-8" ref={(el) => (questionRefs.current[globalIndex] = el)}>
                  <h3 className="text-lg font-semibold mb-4">
                    {globalIndex + 1}. {question.text}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <Button
                        key={num}
                        type="button"
                        variant={formData.answers[globalIndex] === num ? 'default' : 'outline'}
                        size="icon"
                        className={formData.answers[globalIndex] === num ? 'bg-blue-500 text-white' : ''}
                        onClick={() => handleAnswerChange(globalIndex, num)}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>

                  {errors.ratings[globalIndex] && (
                    <p className="text-red-500 text-sm mt-1">{errors.ratings[globalIndex]}</p>
                  )}
                </div>
              );
            })}

            <div className="flex gap-4">
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit">
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
    </div>
  );
}

export default AssessmentForm;
