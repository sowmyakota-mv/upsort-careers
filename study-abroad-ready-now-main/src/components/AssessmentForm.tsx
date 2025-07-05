import React, { useState, useRef } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
  const [step, setStep] = useState<number>(1);
  const [contactError, setContactError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    answers: Array(step1Questions.length + step2Questions.length).fill(null)
  });

  const [errors, setErrors] = useState({
    name: '',
    contact: '',
    email: '',
    ratings: Array(step1Questions.length + step2Questions.length).fill('')
  });

  const [submitted, setSubmitted] = useState(false);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^\+?[1-9]\d{6,14}$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let fieldError = '';
    if (name === 'email') {
      if (value.trim() === '') {
        fieldError = 'Please enter your email';
      } else if (!emailRegex.test(value)) {
        fieldError = 'Please enter a valid email';
      }
    }

    if (name === 'contact') {
      if (value.trim() === '') {
        fieldError = 'Please enter your contact number';
      } else if (!contactRegex.test(value)) {
        fieldError = 'Please enter a valid contact number';
      }
    }

    if (name === 'name' && value.trim() === '') {
      fieldError = 'Please enter your name';
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: fieldError });
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
    } else if (!contactRegex.test(formData.contact)) {
      newErrors.contact = 'Please enter a valid contact number';
      valid = false;
    }

    if (formData.email.trim() === '') {
      newErrors.email = 'Please enter your email';
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateLogin()) {
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
      return `Q${index + 1}: ${question.text}\nSelected Answer: ${formData.answers[index]}\n`;
    }).join('\n');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      answer: answersList,
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
      setSubmitted(true);
    }
  };

  const handleAnswerChange = (index: number, value: number) => {
    const updatedAnswers = [...formData.answers];
    updatedAnswers[index] = value;

    let newErrors = { ...errors, ratings: [...errors.ratings] };
    newErrors.ratings[index] = '';

    setFormData((prevData) => ({ ...prevData, answers: updatedAnswers }));
    setErrors(newErrors);
  };

  const handleContactChange = (value: string, data: any) => {
    setFormData(prev => ({ ...prev, contact: value }));

    if (value.length < 7 || value.length > 15) {
      setContactError('Contact number must be between 7 and 15 digits.');
    } else {
      setContactError('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-[700px] p-8">
        {submitted ? (
          <div className="text-center p-4">
            <h2 className="text-3xl font-bold ">Thank you for submitting the assessment.</h2>
            <p className="text-lg">We will reach out to you soon.</p>
            <Button className="mt-6" onClick={() => navigate('/')}>
              Go to Home
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="text-center">
              <img src="/lovable-uploads/Upsort-career.png" alt="Upsort Careers" className="h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-1">Upsort Careers</h2>
            </div>

            {step === 1 && (
              <div className="flex flex-col items-center w-full max-w-[550px] mx-auto">
                <h2 className="text-2xl font-bold mb-4">Registration Form</h2>

                <div className="mb-4 w-full">
                  <label className="block font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border p-2 h-[50px] w-full rounded"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4 w-full">
                  <label className="block font-medium mb-1">Contact Number *</label>
                  <PhoneInput
                    country={'auto'}
                    enableSearch={true}
                    value={formData.contact}
                    onChange={handleContactChange}
                    placeholder="Enter your Phone Number"
                    inputStyle={{ width: '100%', height: '50px' }}
                  />
                  {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                </div>

                <div className="mb-4 w-full">
                  <label className="block font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border p-2 h-[50px] w-full rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <Button type="button" onClick={handleLogin} className="w-full mt-4">
                  Register & Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-center">Study Abroad Readiness Assessment</h2>
                <p className="text-lg font-semibold text-center">Please rank the following questions on a scale from 1 to 10:</p>

                {step1Questions.map((question, index) => (
                  <div key={question.id} ref={(el) => (questionRefs.current[index] = el)}>
                    <h3 className="text-lg font-semibold mb-2">
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

                <Button type="button" onClick={handleNext} className="mx-auto block">
                  Next
                </Button>
              </>
            )}

            {step === 3 && (
              <>
                {step2Questions.map((question, index) => {
                  const globalIndex = step1Questions.length + index;

                  return (
                    <div key={question.id} ref={(el) => (questionRefs.current[globalIndex] = el)}>
                      <h3 className="text-lg font-semibold mb-1">
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

                <div className="flex gap-4 justify-center">
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
        )}
      </div>
    </div>
  );
};

export default AssessmentForm;
