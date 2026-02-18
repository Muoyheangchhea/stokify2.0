import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaHeart, FaLungs, FaWineBottle, FaApple, 
  FaBed, FaArrowRight, FaArrowLeft, FaCheck, FaClock,
  FaBrain, FaHeartbeat, FaTint, FaLungsVirus, FaSmoking,
  FaWeight, FaRuler, FaUsers, FaMapMarkerAlt, FaInfoCircle
} from 'react-icons/fa';
import '../styles/SymptomDetector.css';

const SymptomDetector = () => {
  // ---------- Current Step State ----------
  const [currentStep, setCurrentStep] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState(0);

  // ---------- Form Data State ----------
  const [formData, setFormData] = useState({
    // Section 1: Demographics
    age: 35,
    sex: '',
    ethnicity: '',
    maritalStatus: '',
    height: 170,
    weight: 70,
    residenceType: '',
    
    // Section 2: Medical History
    familyStroke: '',
    familyHeart: '',
    familyDiabetes: '',
    hasHighBP: '',
    bpMedication: '',
    hasHeartDisease: '',
    hasDiabetes: '',
    diabetesMedication: '',
    knowsBP: 'unknown',
    systolic: '',
    diastolic: '',
    knowsGlucose: 'unknown',
    glucose: '',
    
    // Section 3: Lifestyle
    smokingStatus: '',
    cigarettesPerDay: '',
    alcoholConsumption: '',
    diet: '',
    physicalActivity: '',
    sleepStress: ''
  });

  // ---------- Fix any corrupted age values on mount ----------
  useEffect(() => {
    if (formData.age < 20 || formData.age > 100 || isNaN(formData.age)) {
      setFormData(prev => ({ ...prev, age: 35 }));
    }
  }, []);

  // ---------- UI State for Conditional Fields ----------
  const [showBpMedication, setShowBpMedication] = useState(false);
  const [showDiabetesMedication, setShowDiabetesMedication] = useState(false);
  const [showCigarettes, setShowCigarettes] = useState(false);
  const [showBpInputs, setShowBpInputs] = useState(false);
  const [showGlucoseInput, setShowGlucoseInput] = useState(false);

  // ---------- Question Configuration ----------
  const sections = [
    {
      id: 1,
      title: 'Personal Profile',
      subtitle: 'Tell us about yourself',
      icon: <FaUser />,
      color: '#E63E4E',
      questions: [
        {
          id: 'age',
          type: 'slider',
          label: 'What is your age?',
          icon: <FaUser />,
          min: 20,
          max: 100,
          unit: 'years'
        },
        {
          id: 'sex',
          type: 'options',
          label: 'What is your gender?',
          icon: <FaUser />,
          options: ['Male', 'Female', 'Prefer not to say']
        },
        {
          id: 'ethnicity',
          type: 'options',
          label: 'What is your ethnicity?',
          icon: <FaUsers />,
          options: ['Khmer', 'Vietnamese', 'Chinese', 'Other']
        },
        {
          id: 'maritalStatus',
          type: 'options',
          label: 'What is your marital status?',
          icon: <FaHeart />,
          options: ['Single', 'Married', 'Divorced', 'Widowed']
        },
        {
          id: 'heightWeight',
          type: 'dual-slider',
          label: 'What is your height and weight?',
          icon: <FaRuler />,
          heightMin: 140,
          heightMax: 220,
          weightMin: 40,
          weightMax: 150
        },
        {
          id: 'residenceType',
          type: 'options',
          label: 'Where do you live?',
          icon: <FaMapMarkerAlt />,
          options: ['Urban', 'Suburban', 'Rural']
        }
      ]
    },
    {
      id: 2,
      title: 'Medical History',
      subtitle: 'Your health background',
      icon: <FaHeartbeat />,
      color: '#10B981',
      questions: [
        {
          id: 'familyStroke',
          type: 'yes-no',
          label: 'Has anyone in your immediate family ever had a stroke?',
          icon: <FaBrain />
        },
        {
          id: 'familyHeart',
          type: 'yes-no',
          label: 'Has anyone in your immediate family ever had heart disease?',
          icon: <FaHeartbeat />
        },
        {
          id: 'familyDiabetes',
          type: 'yes-no',
          label: 'Has anyone in your immediate family ever been diagnosed with diabetes?',
          icon: <FaTint />
        },
        {
          id: 'hasHighBP',
          type: 'yes-no',
          label: 'Have you ever been diagnosed with high blood pressure?',
          icon: <FaHeartbeat />,
          conditional: true,
          conditionField: 'bpMedication',
          conditionLabel: 'Do you take medication for it regularly?'
        },
        {
          id: 'hasHeartDisease',
          type: 'yes-no',
          label: 'Have you ever been diagnosed with any heart condition?',
          icon: <FaHeart />
        },
        {
          id: 'hasDiabetes',
          type: 'yes-no',
          label: 'Have you ever been diagnosed with diabetes or high blood sugar?',
          icon: <FaTint />,
          conditional: true,
          conditionField: 'diabetesMedication',
          conditionLabel: 'Do you take medication for it (pills or insulin)?'
        },
        {
          id: 'knowsBP',
          type: 'bp-input',
          label: 'Recent Blood Pressure',
          icon: <FaHeartbeat />
        },
        {
          id: 'knowsGlucose',
          type: 'glucose-input',
          label: 'Recent Blood Glucose Level',
          icon: <FaTint />
        }
      ]
    },
    {
      id: 3,
      title: 'Lifestyle & Habits',
      subtitle: 'Your daily routines',
      icon: <FaLungs />,
      color: '#F59E0B',
      questions: [
        {
          id: 'smokingStatus',
          type: 'smoking',
          label: 'Smoking Habit',
          icon: <FaSmoking />,
          options: ['Never smoked', 'Former smoker', 'Current smoker']
        },
        {
          id: 'alcoholConsumption',
          type: 'options',
          label: 'Alcohol Consumption',
          icon: <FaWineBottle />,
          options: ['Never', 'Occasionally (social events)', 'Regularly (1–2 times/week)', 'Frequently (3+ times/week)']
        },
        {
          id: 'diet',
          type: 'options',
          label: 'Which best describes your usual diet?',
          icon: <FaApple />,
          options: [
            'Balanced (fruits, vegetables, lean protein)',
            'High in salty foods (prahok, processed foods)',
            'High in fatty foods (fried foods, fatty meats)',
            'High in sugary foods & drinks'
          ]
        },
        {
          id: 'physicalActivity',
          type: 'options',
          label: 'How often do you do moderate exercise?',
          icon: <FaHeartbeat />,
          options: [
            'Sedentary (little to no exercise)',
            'Light (1–2 times/week)',
            'Moderate (3–4 times/week)',
            'Active (5+ times/week)'
          ]
        },
        {
          id: 'sleepStress',
          type: 'options',
          label: 'How often do you feel well-rested and manage stress effectively?',
          icon: <FaBed />,
          options: ['Rarely', 'Sometimes', 'Often', 'Almost always']
        }
      ]
    }
  ];

  // ---------- Calculate BMI ----------
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInM = formData.height / 100;
      const bmi = (formData.weight / (heightInM * heightInM)).toFixed(1);
      return bmi;
    }
    return '—';
  };

  // ---------- Handle Input Changes ----------
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Handle conditional fields
    if (field === 'hasHighBP') {
      setShowBpMedication(value === 'Yes');
      if (value !== 'Yes') setFormData(prev => ({ ...prev, bpMedication: '' }));
    }
    
    if (field === 'hasDiabetes') {
      setShowDiabetesMedication(value === 'Yes');
      if (value !== 'Yes') setFormData(prev => ({ ...prev, diabetesMedication: '' }));
    }
    
    if (field === 'smokingStatus') {
      setShowCigarettes(value === 'Current smoker');
      if (value !== 'Current smoker') setFormData(prev => ({ ...prev, cigarettesPerDay: '' }));
    }
    
    if (field === 'knowsBP') {
      setShowBpInputs(value === 'I know it');
      if (value !== 'I know it') setFormData(prev => ({ ...prev, systolic: '', diastolic: '' }));
    }
    
    if (field === 'knowsGlucose') {
      setShowGlucoseInput(value === 'I know it');
      if (value !== 'I know it') setFormData(prev => ({ ...prev, glucose: '' }));
    }

    // Calculate progress
    calculateProgress();
  };

  // ---------- Calculate Form Progress ----------
  const calculateProgress = () => {
    let completed = 0;
    let total = 0;
    
    // Count total fields and completed fields
    sections.forEach(section => {
      section.questions.forEach(q => {
        if (q.type === 'dual-slider') {
          total += 2;
          if (formData.height) completed++;
          if (formData.weight) completed++;
        } else if (q.type === 'bp-input') {
          total += 1;
          if (formData.knowsBP) completed++;
          if (formData.knowsBP === 'I know it' && formData.systolic && formData.diastolic) completed += 2;
        } else if (q.type === 'glucose-input') {
          total += 1;
          if (formData.knowsGlucose) completed++;
          if (formData.knowsGlucose === 'I know it' && formData.glucose) completed++;
        } else if (q.type === 'smoking') {
          total += 1;
          if (formData.smokingStatus) completed++;
          if (formData.smokingStatus === 'Current smoker' && formData.cigarettesPerDay) completed++;
        } else {
          total += 1;
          if (formData[q.id]) completed++;
        }
      });
    });
    
    setProgress(Math.min(Math.round((completed / total) * 100), 100));
  };

  // ---------- Navigation ----------
  const goToNext = () => {
    if (currentStep < sections[currentSection - 1].questions.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentSection < sections.length) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  const goToPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      setCurrentStep(sections[currentSection - 2].questions.length);
    }
  };

  // ---------- Submit Form ----------
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResults(true);
    }, 3000);
  };

  // ---------- Reset Form ----------
  const handleReset = () => {
    setCurrentSection(1);
    setCurrentStep(1);
    setShowResults(false);
    setProgress(0);
    // Reset form data would go here
  };

  // ---------- Get Current Question ----------
  const currentSectionData = sections[currentSection - 1];
  const currentQuestionData = currentSectionData?.questions[currentStep - 1];

  // ---------- Render Question by Type ----------
  const renderQuestion = (question) => {
    switch (question.type) {
      case 'slider':
        // SAFE VALUE EXTRACTION - prevents 20100 from showing
        let sliderValue = formData[question.id];
        
        // Check if value is valid (between min and max)
        if (sliderValue === undefined || 
            sliderValue === null || 
            isNaN(sliderValue) || 
            sliderValue < question.min || 
            sliderValue > question.max) {
          // Reset to default value (35 for age, or min for others)
          sliderValue = question.id === 'age' ? 35 : question.min;
          // Update form data to fix it permanently
          setTimeout(() => {
            handleInputChange(question.id, sliderValue);
          }, 0);
        }
        
        // FORCE min and max to be numbers
        const minValue = Number(question.min);
        const maxValue = Number(question.max);
        
        return (
          <div className="slider-container">
            <div className="slider-value">
              <span className="slider-number">{sliderValue}</span>
              <span className="slider-unit">{question.unit}</span>
            </div>
            <input
              type="range"
              min={minValue}
              max={maxValue}
              value={sliderValue}
              onChange={(e) => handleInputChange(question.id, parseInt(e.target.value))}
              className="slider"
            />
            <div className="slider-labels">
              <span>{minValue}</span>
              <span>{maxValue}</span>
            </div>
          </div>
        );

      case 'dual-slider':
        return (
          <div className="dual-slider-container">
            <div className="bmi-indicator">
              <span className="bmi-label">Your BMI</span>
              <span className="bmi-value">{calculateBMI()}</span>
            </div>
            
            <div className="slider-group">
              <label>Height (cm)</label>
              <div className="slider-value-mini">
                <span>{formData.height || 170} cm</span>
              </div>
              <input
                type="range"
                min={question.heightMin}
                max={question.heightMax}
                value={formData.height || 170}
                onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                className="slider"
              />
            </div>
            
            <div className="slider-group">
              <label>Weight (kg)</label>
              <div className="slider-value-mini">
                <span>{formData.weight || 70} kg</span>
              </div>
              <input
                type="range"
                min={question.weightMin}
                max={question.weightMax}
                value={formData.weight || 70}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                className="slider"
              />
            </div>
          </div>
        );

      case 'options':
      case 'yes-no':
        return (
          <div className="options-grid">
            {question.options ? (
              question.options.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${formData[question.id] === option ? 'selected' : ''}`}
                  onClick={() => handleInputChange(question.id, option)}
                >
                  {option}
                  {formData[question.id] === option && <FaCheck className="check-icon" />}
                </button>
              ))
            ) : (
              <>
                <button
                  className={`option-btn ${formData[question.id] === 'Yes' ? 'selected' : ''}`}
                  onClick={() => handleInputChange(question.id, 'Yes')}
                >
                  Yes
                  {formData[question.id] === 'Yes' && <FaCheck className="check-icon" />}
                </button>
                <button
                  className={`option-btn ${formData[question.id] === 'No' ? 'selected' : ''}`}
                  onClick={() => handleInputChange(question.id, 'No')}
                >
                  No
                  {formData[question.id] === 'No' && <FaCheck className="check-icon" />}
                </button>
              </>
            )}
          </div>
        );

      case 'smoking':
        return (
          <>
            <div className="options-grid">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`option-btn ${formData.smokingStatus === option ? 'selected' : ''}`}
                  onClick={() => handleInputChange('smokingStatus', option)}
                >
                  {option}
                  {formData.smokingStatus === option && <FaCheck className="check-icon" />}
                </button>
              ))}
            </div>
            
            {showCigarettes && (
              <div className="conditional-field">
                <label className="conditional-label">How many cigarettes per day?</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.cigarettesPerDay}
                  onChange={(e) => handleInputChange('cigarettesPerDay', e.target.value)}
                  placeholder="e.g., 10"
                  className="number-input"
                />
              </div>
            )}
          </>
        );

      case 'bp-input':
        return (
          <>
            <div className="options-grid">
              <button
                className={`option-btn ${formData.knowsBP === 'I don’t know' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsBP', 'I don’t know')}
              >
                I don’t know
                {formData.knowsBP === 'I don’t know' && <FaCheck className="check-icon" />}
              </button>
              <button
                className={`option-btn ${formData.knowsBP === 'I know it' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsBP', 'I know it')}
              >
                I know it
                {formData.knowsBP === 'I know it' && <FaCheck className="check-icon" />}
              </button>
            </div>
            
            {showBpInputs && (
              <div className="bp-inputs">
                <div className="bp-field">
                  <label>Systolic</label>
                  <input
                    type="number"
                    placeholder="120"
                    value={formData.systolic}
                    onChange={(e) => handleInputChange('systolic', e.target.value)}
                    className="number-input"
                  />
                  <span className="bp-unit">mmHg</span>
                </div>
                <div className="bp-field">
                  <label>Diastolic</label>
                  <input
                    type="number"
                    placeholder="80"
                    value={formData.diastolic}
                    onChange={(e) => handleInputChange('diastolic', e.target.value)}
                    className="number-input"
                  />
                  <span className="bp-unit">mmHg</span>
                </div>
              </div>
            )}
          </>
        );

      case 'glucose-input':
        return (
          <>
            <div className="options-grid">
              <button
                className={`option-btn ${formData.knowsGlucose === 'I don’t know' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsGlucose', 'I don’t know')}
              >
                I don’t know
                {formData.knowsGlucose === 'I don’t know' && <FaCheck className="check-icon" />}
              </button>
              <button
                className={`option-btn ${formData.knowsGlucose === 'I know it' ? 'selected' : ''}`}
                onClick={() => handleInputChange('knowsGlucose', 'I know it')}
              >
                I know it
                {formData.knowsGlucose === 'I know it' && <FaCheck className="check-icon" />}
              </button>
            </div>
            
            {showGlucoseInput && (
              <div className="glucose-input">
                <input
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.glucose}
                  onChange={(e) => handleInputChange('glucose', e.target.value)}
                  className="number-input"
                />
                <span className="glucose-unit">mg/dL</span>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  // ---------- Conditional Field Render ----------
  const renderConditionalField = () => {
    if (!currentQuestionData?.conditional) return null;
    
    const conditionField = currentQuestionData.conditionField;
    const conditionLabel = currentQuestionData.conditionLabel;
    
    if ((currentQuestionData.id === 'hasHighBP' && !showBpMedication) ||
        (currentQuestionData.id === 'hasDiabetes' && !showDiabetesMedication)) {
      return null;
    }
    
    return (
      <div className="conditional-section">
        <label className="conditional-label">{conditionLabel}</label>
        <div className="options-grid">
          <button
            className={`option-btn ${formData[conditionField] === 'Yes' ? 'selected' : ''}`}
            onClick={() => handleInputChange(conditionField, 'Yes')}
          >
            Yes
            {formData[conditionField] === 'Yes' && <FaCheck className="check-icon" />}
          </button>
          <button
            className={`option-btn ${formData[conditionField] === 'No' ? 'selected' : ''}`}
            onClick={() => handleInputChange(conditionField, 'No')}
          >
            No
            {formData[conditionField] === 'No' && <FaCheck className="check-icon" />}
          </button>
        </div>
      </div>
    );
  };

  // ---------- Results View ----------
  if (showResults) {
    return (
      <div className="symptom-detector">
        <div className="results-container">
          <div className="results-card">
            <div className="results-icon">
              <FaHeartbeat />
            </div>
            <h1 className="results-title">Analysis Complete</h1>
            <p className="results-subtitle">
              Your symptom analysis has been processed by our AI
            </p>
            
            <div className="risk-meter">
              <div className="risk-label">
                <span>Stroke Risk Level</span>
                <span className="risk-value">Low</span>
              </div>
              <div className="risk-bar">
                <div className="risk-progress" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div className="results-details">
              <div className="detail-item">
                <span className="detail-label">BMI</span>
                <span className="detail-value">{calculateBMI()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Blood Pressure</span>
                <span className="detail-value">
                  {formData.systolic && formData.diastolic 
                    ? `${formData.systolic}/${formData.diastolic}`
                    : 'Not provided'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Risk Factors</span>
                <span className="detail-value">2 identified</span>
              </div>
            </div>
            
            <div className="results-actions">
              <button className="btn-primary" onClick={handleReset}>
                Start New Assessment
              </button>
              <button className="btn-secondary">
                View Full Report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Main Form View ----------
  return (
    <div className="symptom-detector">
      {/* COMPACT HEADER - FIXED VERSION */}
      <div className="detector-header">
        <div className="header-content">
          <div className="section-info-compact">
            <span className="section-pill">Section {currentSection}/3</span>
            <span className="section-title-compact">{currentSectionData?.title || 'Loading...'}</span>
          </div>
          
          <div className="progress-compact">
            <div className="progress-text">
              <span className="progress-number">{progress}%</span>
            </div>
            <div className="progress-bar-compact">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="question-container">
        <div className="question-card">
          <div 
            className="section-badge"
            style={{ backgroundColor: `${currentSectionData?.color}15`, color: currentSectionData?.color }}
          >
            {currentSectionData?.icon}
            <span>{currentSectionData?.title}</span>
          </div>
          
          <div className="question-content">
            <div className="question-icon-wrapper">
              <div 
                className="question-icon"
                style={{ backgroundColor: `${currentSectionData?.color}15`, color: currentSectionData?.color }}
              >
                {currentQuestionData?.icon}
              </div>
            </div>
            
            <h2 className="question-text">
              {currentQuestionData?.label}
            </h2>
            
            <div className="question-input">
              {renderQuestion(currentQuestionData)}
              {renderConditionalField()}
            </div>
          </div>
          
          {/* Navigation */}
          <div className="navigation-footer">
            <button 
              className={`nav-btn back ${currentSection === 1 && currentStep === 1 ? 'disabled' : ''}`}
              onClick={goToPrevious}
              disabled={currentSection === 1 && currentStep === 1}
            >
              <FaArrowLeft /> Back
            </button>
            
            <div className="step-indicator">
              {currentSectionData?.questions.map((_, index) => (
                <div 
                  key={index}
                  className={`step-dot ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}
                />
              ))}
            </div>
            
            <button 
              className="nav-btn next"
              onClick={goToNext}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : currentSection === 3 && currentStep === currentSectionData?.questions.length ? 'Submit' : 'Next'}
              {!isSubmitting && <FaArrowRight />}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="loading-overlay">
          <div className="loading-card">
            <div className="spinner-large"></div>
            <h3 className="loading-title">Analyzing Your Health Profile</h3>
            <p className="loading-subtitle">
              Our AI is processing your responses...
            </p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SymptomDetector;