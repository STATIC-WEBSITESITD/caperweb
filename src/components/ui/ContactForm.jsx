import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aos } from '../../utils/aos'

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmitting(true);

    const formData = {
      name: form.name.value,
      email: form.email.value,
      mobile: form.mobile.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log('API Response:', result);

      if (result.success) {
        alert('Form submitted successfully');
        form.reset();
        navigate('/');
      } else {
        alert('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row" {...aos('fade-up')}>
        <div className="col-md-6" {...aos('fade-up', 100)}>
          <div className="form-group">
            <input type="text" name="name" id="name" placeholder="Your name *" className="form-control" required />
          </div>
        </div>
        <div className="col-md-6" {...aos('fade-up', 150)}>
          <div className="form-group">
            <input type="email" name="email" id="email" placeholder="Your email *" className="form-control" required />
          </div>
        </div>
        <div className="col-md-6" {...aos('fade-up', 200)}>
          <div className="form-group">
            <input type="text" name="mobile" id="mobile" placeholder="Your phone number" className="form-control" required />
          </div>
        </div>
        <div className="col-md-6" {...aos('fade-up', 250)}>
          <div className="form-group">
            <input type="text" name="subject" id="subject" placeholder="Subject" className="form-control" required />
          </div>
        </div>
        <div className="col-md-12" {...aos('fade-up', 300)}>
          <div className="form-group">
            <textarea name="message" id="message" placeholder="Message / Note" rows="8" className="form-control" required />
          </div>
        </div>
        <div className="col-md-12 text-center" {...aos('fade-up', 350)}>
          <button
            className="btn btn-brand-1-big"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Now'}
          </button>
        </div>
      </div>
    </form>
  )
}
