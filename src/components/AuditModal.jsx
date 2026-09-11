import React, { useState, useEffect } from 'react';

/**
 * AuditModal component - Modal dialog for booking an automation audit.
 * Features strict validation:
 * - Email must consist of @gmail.com, otherwise displays "incorrect email"
 * - Number must be in number datatype only, and if > 10 digits displays "incorrect number"
 * - Right-tick submission confirmation screen
 * Driven strictly by props.
 */
export function AuditModal({ isOpen, onClose, modalData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idNumber: '',
    message: '',
    acceptedTerms: true,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    idNumber: '',
    terms: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Validate a single field
  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
      if (!value.trim()) {
        error = 'Please enter your Name';
      }
    }

    if (name === 'email') {
      const trimmed = value.trim();
      if (!trimmed) {
        error = 'Please enter your email';
      } else if (
        !trimmed.toLowerCase().includes('@gmail.com') ||
        !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(trimmed)
      ) {
        error = 'incorrect email';
      }
    }

    if (name === 'idNumber') {
      const trimmed = value.trim();
      if (!trimmed) {
        error = 'Please enter your number';
      } else if (!/^\d+$/.test(trimmed)) {
        // Must be in number datatype only
        error = 'incorrect number';
      } else if (trimmed.length > 10) {
        // Cannot exceed 10 digits
        error = 'incorrect number';
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newVal,
    }));

    // Live validation if there was already an error or for immediate feedback
    if (type !== 'checkbox') {
      const fieldError = validateField(name, newVal);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        terms: checked ? '' : 'Please accept the Terms of Service',
      }));
    }

    if (generalError) setGeneralError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const numErr = validateField('idNumber', formData.idNumber);
    const termsErr = formData.acceptedTerms ? '' : 'Please accept the Terms of Service';

    const newErrors = {
      name: nameErr,
      email: emailErr,
      idNumber: numErr,
      terms: termsErr,
    };

    setErrors(newErrors);

    // If any error exists, block submission and display error
    if (nameErr || emailErr || numErr || termsErr) {
      const activeErrors = [];
      if (emailErr) activeErrors.push(emailErr);
      if (numErr) activeErrors.push(numErr);
      if (nameErr) activeErrors.push(nameErr);
      if (termsErr) activeErrors.push(termsErr);

      setGeneralError(activeErrors.join(', '));
      return;
    }

    // Submission succeeded: transition to right-tick screen
    setGeneralError('');
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setGeneralError('');
    setErrors({
      name: '',
      email: '',
      idNumber: '',
      terms: '',
    });
    setFormData({
      name: '',
      email: '',
      idNumber: '',
      message: '',
      acceptedTerms: true,
    });
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="audit-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with close button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            {/* Super title and card title matching the reference image */}
            <div className="modal-title-wrap">
              <span className="modal-kicker">Get Started</span>
              <h2 id="modal-title" className="modal-heading">
                {modalData.title}
              </h2>
              {modalData.subtitle && (
                <p className="modal-subtitle">{modalData.subtitle}</p>
              )}
            </div>

            {generalError && (
              <div className="modal-error-banner" role="alert">
                {generalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="modal-form" noValidate>
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="audit-name" className="form-label">
                  {modalData.fields.name.label}
                </label>
                <input
                  type="text"
                  id="audit-name"
                  name="name"
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  placeholder={modalData.fields.name.placeholder}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && (
                  <span className="field-error-text">{errors.name}</span>
                )}
              </div>

              {/* Email Field - Must consist of @gmail.com */}
              <div className="form-group">
                <label htmlFor="audit-email" className="form-label">
                  {modalData.fields.email.label}
                </label>
                <input
                  type="email"
                  id="audit-email"
                  name="email"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder={modalData.fields.email.placeholder}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && (
                  <span className="field-error-text">{errors.email}</span>
                )}
              </div>

              {/* Number Field - Number datatype only & max 10 digits */}
              <div className="form-group">
                <label htmlFor="audit-idNumber" className="form-label">
                  {modalData.fields.idNumber.label}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="audit-idNumber"
                  name="idNumber"
                  className={`form-input ${errors.idNumber ? 'form-input-error' : ''}`}
                  placeholder={modalData.fields.idNumber.placeholder}
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  required
                />
                {errors.idNumber && (
                  <span className="field-error-text">{errors.idNumber}</span>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="audit-message" className="form-label">
                  {modalData.fields.message.label}
                </label>
                <textarea
                  id="audit-message"
                  name="message"
                  rows="3"
                  className="form-textarea"
                  placeholder={modalData.fields.message.placeholder}
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              {/* Terms Checkbox */}
              <div className="form-checkbox-wrap">
                <input
                  type="checkbox"
                  id="audit-terms"
                  name="acceptedTerms"
                  className="form-checkbox"
                  checked={formData.acceptedTerms}
                  onChange={handleInputChange}
                />
                <label htmlFor="audit-terms" className="form-checkbox-label">
                  {modalData.fields.terms}
                </label>
              </div>
              {errors.terms && (
                <span className="field-error-text">{errors.terms}</span>
              )}

              {/* Action Buttons: Submit & Cancel */}
              <div className="modal-actions-wrap">
                <button
                  type="submit"
                  className="btn btn-modal-submit"
                >
                  {modalData.submitLabel}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-modal-cancel"
                  onClick={handleClose}
                >
                  {modalData.cancelLabel}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen with Right Tick Logo */
          <div className="modal-success-screen" role="region" aria-live="polite">
            <div className="success-tick-circle" aria-hidden="true">
              <svg
                width="42"
                height="42"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" fill="#ecfdf5" />
                <path d="M8 12.5l2.8 2.8 5.4-5.6" stroke="#10b981" />
              </svg>
            </div>

            <h3 className="success-heading">{modalData.successTitle}</h3>
            <p className="success-message">
              {modalData.successMessage}
            </p>

            <div className="success-receipt-box">
              <div className="receipt-row">
                <span className="receipt-label">Applicant:</span>
                <span className="receipt-value">{formData.name}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Email:</span>
                <span className="receipt-value">{formData.email}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Number:</span>
                <span className="receipt-value">{formData.idNumber}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Status:</span>
                <span className="receipt-value receipt-status-tag">Dispatched to Engineer</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleClose}
            >
              {modalData.closeLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
