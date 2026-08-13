import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { aos } from '../../utils/aos'

export default function CareersForm() {
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const fileInput = form.resume;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Resume file exceeds the 5 MB size limit.');
        return;
      }
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append('full_name', form.full_name.value);
    formData.append('email', form.email.value);
    formData.append('mobile', form.mobile.value);
    formData.append('designation', form.designation.value);
    if (fileInput.files.length > 0) {
      formData.append('resume', fileInput.files[0]);
    }

    try {
      const response = await fetch('/api/careers', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      console.log('API Response:', result);

      if (result.success) {
        alert('Application submitted successfully');
        form.reset();
        navigate('/');
      } else {
        alert(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="row" {...aos('fade-up')}>
        <div className="col-md-6" {...aos('fade-up', 100)}>
          <div className="form-group">
            <input type="text" name="full_name" id="full_name" placeholder="Full Name *" className="form-control" required />
          </div>
        </div>
        <div className="col-md-6" {...aos('fade-up', 150)}>
          <div className="form-group">
            <input type="email" name="email" id="email" placeholder="Your email *" className="form-control" required />
          </div>
        </div>
        <div className="col-md-6" {...aos('fade-up', 200)}>
          <div className="form-group">
            <input type="text" name="mobile" id="mobile" placeholder="Your phone number *" className="form-control" required />
          </div>
        </div>
        <div className="col-md-6" {...aos('fade-up', 250)}>
          <div className="form-group">
            <input type="text" name="designation" id="designation" placeholder="Position applying for *" className="form-control" required />
          </div>
        </div>
        <div className="col-md-12" {...aos('fade-up', 300)}>
          <div className="form-group">
            <label htmlFor="resume" className="font-sm color-grey-500 mb-5 d-block">Upload Resume (PDF, DOC, DOCX - Max 5MB) *</label>
            <input
              type="file"
              name="resume"
              id="resume"
              accept=".pdf,.doc,.docx"
              className="form-control"
              required
              style={{ paddingTop: '12px' }}
            />
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
